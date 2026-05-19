import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent {
  // Service offerings data
  services: ServiceItem[] = [
    {
      icon: '✨',
      title: 'Full Turnkey Interiors',
      subtitle: 'End-to-End Handover',
      description: 'The ultimate signature service for high-rise apartment owners in Pune. We handle everything from the initial empty concrete shell to the final styled key handover, managing all on-site civil logistics.',
      features: [
        'Detailed 2D space planning & photorealistic 3D renders',
        'Certified supervisor tracking and material vetting',
        'Custom modular carpentry, false ceilings, and painting',
        'Full furniture integration, luxury lighting, and draping styling'
      ]
    },
    {
      icon: '📐',
      title: 'Bespoke Carpentry & Modulars',
      subtitle: 'Precision Woodwork',
      description: 'Exquisite, long-lasting storage and wooden elements engineered in marine ply with flawless high-gloss acrylic, PU, or veneer finishes. Tailored entirely to maximize storage in your specific apartment layout.',
      features: [
        'High-capacity modular wardrobes with LED sensors',
        'Custom TV consoles with stone backing & fluted paneling',
        'Bespoke washbasin units & vanity space extensions',
        'Water-resistant modular kitchens with advanced soft-close hardware'
      ]
    },
    {
      icon: '🔨',
      title: 'Civil & Spatial Upgrades',
      subtitle: 'Structural Customization',
      description: 'Precision physical alterations to adapt developer-provided shells. We redesign room connections, false ceiling designs, and floor tiling configurations to support a more open-concept, luxury layout.',
      features: [
        'Multi-tiered false ceilings with profile LED light slots',
        'High-end marble tile installations and bath plumbing refits',
        'Space-optimizing structural partition creations',
        'Premium electrical layout upgrades & designer switch mappings'
      ]
    }
  ];
}
