
export interface SlideData {
  id: number;
  type: 'hero' | 'grid' | 'split' | 'tiers' | 'case' | 'steps' | 'partners' | 'contact';
  title: string;
  subtitle?: string;
  content?: any;
  image?: string;
  bgColor?: string;
}
