import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PortfolioItem {
  id: string;
  image: string;
  category: 'living' | 'bedroom' | 'kitchen' | 'carpentry';
  title: string;
  location: string;
  details: string;
  materials: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class PortfolioComponent {
  // Master portfolio database using our custom-generated high-res assets
  portfolioItems: PortfolioItem[] = [
    {
      id: 'item-1',
      image: '/assets/images/portfolio_master_bedroom.png',
      category: 'bedroom',
      title: 'Warm Editorial Master Suite',
      location: 'Godrej Boulevard, Kharadi',
      details: 'A clean-line, high-ceiling master suite featuring an exquisite floor-to-ceiling fluted wood accent wall, custom upholstered linen headboard, and hidden warm-white LED closet bays.',
      materials: ['Oak Veneer paneling', 'Waterproof BWP ply', 'Sensored LED hanging rods', 'Premium Linen fabrics']
    },
    {
      id: 'item-2',
      image: '/assets/images/portfolio_modular_kitchen.png',
      category: 'kitchen',
      title: 'Minimalist Walnut Culinary Bay',
      location: 'Shubh Nirvana, Viman Nagar',
      details: 'A stunning handles-free modular kitchen with flat-panel light gray cabinetry, premium walnut open shelving, built-in dual ovens, and custom under-cabinet profiling spotlights.',
      materials: ['Anti-scratch acrylic profiles', 'Rich Walnut laminate', 'Granite countertops', 'Soft-close Hettich sliders']
    },
    {
      id: 'item-3',
      image: '/assets/images/portfolio_bespoke_basin.png',
      category: 'carpentry',
      title: 'Floating Fluted Basin Vanity',
      location: 'Majestique Towers, Kharadi',
      details: 'A custom spatial vanity wash solution optimizing the corridor shell. Comprises a floating solid stone counter, matte black minimal plumbing, and a custom round mirror back-lit unit.',
      materials: ['Waterproof marine ply core', 'Custom fluted PU columns', 'Backlit circular smart mirror', 'Solid-core composite stone']
    },
    {
      id: 'item-4',
      image: '/assets/images/hero_background.png',
      category: 'living',
      title: 'Sunlit Minimal Luxury Salon',
      location: 'Godrej Boulevard, Kharadi',
      details: 'A high-rise main hall designed for maximum light and spatial efficiency. Features a sleek wall-panel TV console, custom beige fabric couches, and elegant marble floor detailing.',
      materials: ['Veneered custom TV console', 'Dimmable warm LEDs', 'Italian marble flooring', 'Curated custom lounge furniture']
    }
  ];

  // Filters
  categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'living', label: 'Living Rooms' },
    { value: 'bedroom', label: 'Bedrooms' },
    { value: 'kitchen', label: 'Kitchens' },
    { value: 'carpentry', label: 'Bespoke Joinery' }
  ];

  activeFilter = signal<string>('all');
  
  // Lightbox state
  selectedItem = signal<PortfolioItem | null>(null);

  // Filter computation
  filteredItems = computed(() => {
    const currentFilter = this.activeFilter();
    if (currentFilter === 'all') {
      return this.portfolioItems;
    }
    return this.portfolioItems.filter(item => item.category === currentFilter);
  });

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  openLightbox(item: PortfolioItem) {
    this.selectedItem.set(item);
    document.body.style.overflow = 'hidden'; // Stop page scroll
  }

  closeLightbox() {
    this.selectedItem.set(null);
    document.body.style.overflow = ''; // Re-enable page scroll
  }

  scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
