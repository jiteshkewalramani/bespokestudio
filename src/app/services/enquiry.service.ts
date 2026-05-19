import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Enquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  message: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  // A standard URL template path that the user can replace with their actual Google Apps Script Web App URL.
  private appsScriptUrl = signal<string>('https://script.google.com/macros/s/AKfycbz_MOCK_SHEET_ENDPOINT/exec');
  
  // Local storage cache for mock submissions
  private localEnquiries = signal<Enquiry[]>(this.loadEnquiriesFromStorage());

  constructor(private http: HttpClient) {}

  // Load submissions from localStorage
  private loadEnquiriesFromStorage(): Enquiry[] {
    const data = localStorage.getItem('bespoke_spaces_enquiries');
    return data ? JSON.parse(data) : [];
  }

  // Get reactive signal of all submissions
  get enquiries() {
    return this.localEnquiries.asReadonly();
  }

  // Set the actual Google Apps Script Web App URL
  setScriptUrl(url: string) {
    if (url.startsWith('https://')) {
      this.appsScriptUrl.set(url);
    }
  }

  // Submit Enquiry
  submitEnquiry(enquiry: Enquiry): Observable<any> {
    const submission: Enquiry = {
      ...enquiry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };

    // Save to local storage cache first as a local backup/mock database
    const current = this.localEnquiries();
    const updated = [submission, ...current];
    this.localEnquiries.set(updated);
    localStorage.setItem('bespoke_spaces_enquiries', JSON.stringify(updated));

    // If using the mock/default URL, we do not perform a live network request but return successful mock emission
    if (this.appsScriptUrl().includes('MOCK_SHEET_ENDPOINT')) {
      console.log('📝 [Enquiry Service] Simulated Google Sheets submission:', submission);
      return of({ status: 'success', mock: true, data: submission });
    }

    // Live POST request to the Google Apps Script Web App
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain;charset=utf-8' // Apps Script requires text/plain or GET/POST redirect handling
    });

    return this.http.post(this.appsScriptUrl(), JSON.stringify(submission), { headers }).pipe(
      tap(response => console.log('✅ [Enquiry Service] Real Google Sheets submission success:', response)),
      catchError(error => {
        console.error('❌ [Enquiry Service] Error sending to Google Sheets, using local fallback:', error);
        // Fallback gracefully so the UI doesn't crash
        return of({ status: 'fallback_success', error: error.message, data: submission });
      })
    );
  }

  // Clear mock history
  clearHistory() {
    this.localEnquiries.set([]);
    localStorage.removeItem('bespoke_spaces_enquiries');
  }
}
