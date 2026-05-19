import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnquiryService, Enquiry } from '../../services/enquiry.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  // Form model fields
  name = signal('');
  email = signal('');
  phone = signal('');
  projectType = signal('3BHK');
  location = signal('Godrej Boulevard');
  message = signal('');

  // Submit button visual states
  isSubmitting = signal(false);
  submitSuccess = signal(false);
  errorMessage = signal<string | null>(null);

  // Access history from service (assigned in constructor)
  enquiries;
  showLogs = signal(false);

  // Editable configuration endpoint for live test demo
  sheetUrlInput = signal('https://script.google.com/macros/s/AKfycbz_MOCK_SHEET_ENDPOINT/exec');

  constructor(private enquiryService: EnquiryService) {
    this.enquiries = this.enquiryService.enquiries;
  }

  // Save the custom URL entered in our admin panel
  saveCustomUrl() {
    this.enquiryService.setScriptUrl(this.sheetUrlInput());
    alert('✅ Custom Google Apps Script URL updated successfully!');
  }

  toggleLogs() {
    this.showLogs.update(val => !val);
  }

  clearLogs() {
    if (confirm('Are you sure you want to clear your local submission history?')) {
      this.enquiryService.clearHistory();
    }
  }

  onSubmit(form: any) {
    if (form.invalid) {
      this.errorMessage.set('Please fill out all required fields correctly.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);
    this.submitSuccess.set(false);

    const data: Enquiry = {
      name: this.name(),
      email: this.email(),
      phone: this.phone(),
      projectType: this.projectType(),
      location: this.location(),
      message: this.message()
    };

    // Call service to post
    this.enquiryService.submitEnquiry(data).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);
        
        // Reset form signals
        this.name.set('');
        this.email.set('');
        this.phone.set('');
        this.message.set('');
        form.resetForm({
          projectType: '3BHK',
          location: 'Godrej Boulevard'
        });

        // Hide success alert after 6 seconds
        setTimeout(() => {
          this.submitSuccess.set(false);
        }, 6000);
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set('Could not submit inquiry. Using local fallback instead.');
      }
    });
  }
}
