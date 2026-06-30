export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "bbq" | "shawarma" | "sides" | "drinks";
  heatLevel: 1 | 2 | 3 | 4 | 5;
  smokeLevel: 1 | 2 | 3 | 4 | 5;
  calories: number;
  ingredients: string[];
  cookingMethod: string;
  cookingTime: string;
  pairing: string;
  recommendedCombo: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  handle: string;
  flame: 1 | 2 | 3 | 4 | 5;
}

export interface CateringPackage {
  id: string;
  name: string;
  tagline: string;
  guests: string;
  price: string;
  duration: string;
  features: string[];
  highlight?: boolean;
}

export interface LoyaltyTier {
  id: string;
  name: string;
  range: string;
  min: number;
  max: number;
  perks: string[];
}

export interface AdminOrder {
  id: string;
  customer: string;
  items: string;
  status: "preparing" | "ready" | "completed" | "cancelled";
  time: string;
  total: number;
}

export interface AdminCustomer {
  id: string;
  name: string;
  visits: number;
  tier: string;
  lastOrder: string;
}
