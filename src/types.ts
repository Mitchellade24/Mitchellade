export interface Project {
  id: string;
  title: string;
  category: 'editorial' | 'fashion' | 'portrait';
  imageUrl: string;
  year: string;
  client?: string;
  description: string;
  specs?: {
    camera?: string;
    lens?: string;
    aperture?: string;
    shutter?: string;
    iso?: string;
  };
}

export interface ServicePackage {
  id: string;
  num: string;
  title: string;
  description: string;
  features: string[];
  price: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CloudinaryConfig {
  cloudName: string;
  tag: string;
  enabled: boolean;
}
