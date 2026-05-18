import { VisualStyle } from "../types";

export const VISUAL_STYLES: VisualStyle[] = [
  {
    id: 'modern_clean',
    name: 'Modern and Clean',
    description: 'Professional, clear, organized, and trustworthy. Best for services, health, and education.',
    colors: ['#FFFFFF', '#1E3A8A', '#38BDF8', '#10B981'],
    fonts: 'Inter'
  },
  {
    id: 'bold_disruptive',
    name: 'Bold and Disruptive',
    description: 'Energetic, high-impact, and memorable. Best for startups and creative brands.',
    colors: ['#0A0A0A', '#FACC15', '#7C3AED', '#06B6D4'],
    fonts: 'Space Grotesk'
  },
  {
    id: 'premium_luxury',
    name: 'Premium and Luxury',
    description: 'Elegant, exclusive, and sophisticated. Best for high-ticket services and real estate.',
    colors: ['#0F0F0F', '#D4AF37', '#F5F0E6', '#C7C7C7'],
    fonts: 'Playfair Display'
  },
  {
    id: 'minimalistic',
    name: 'Minimalistic',
    description: 'Simple, direct, and focused. Best for portfolios and clear messaging.',
    colors: ['#FAFAFA', '#111111', '#E5E5E5', '#2563EB'],
    fonts: 'Helvetica'
  }
];
