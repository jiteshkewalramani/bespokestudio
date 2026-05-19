import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineStep {
  number: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent {
  // Dynamic process timeline data
  processSteps: TimelineStep[] = [
    {
      number: '01',
      title: 'Site Discovery & Spatial Blueprinting',
      description: 'We conduct a precise site walkthrough, measuring every inch to optimize space configurations, analyze lighting, and map out your spatial blueprints.'
    },
    {
      number: '02',
      title: '3D Renders & Material Board curation',
      description: 'We render photorealistic 3D visualizers so you can experience your home before a nail is struck. We curate tangible material boards comprising laminates, veneers, marbles, and fabrics.'
    },
    {
      number: '03',
      title: 'False Ceiling & Civil Execution',
      description: 'Our certified engineers manage false ceilings, bespoke light planning, electrical re-wiring, plumbing upgrades, and stone tiling work with strict on-site supervisor oversight.'
    },
    {
      number: '04',
      title: 'Bespoke Modular Carpentry',
      description: 'Crafted with waterproof ply and top-grade hardware, your modular closets, wardrobes, integrated basin counters, and floating media bays are fabricated to perfection.'
    },
    {
      number: '05',
      title: 'Styling & Turnkey Handover',
      description: 'We deep clean, assemble, hang premium drapes, style custom furniture, and hand over a flawless, turnkey dream space ready for you to move into immediately.'
    }
  ];

  // Active step in the visual timeline
  activeStep = signal(0);

  setActiveStep(index: number) {
    this.activeStep.set(index);
  }
}
