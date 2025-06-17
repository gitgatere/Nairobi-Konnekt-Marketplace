// types/product.ts

export interface Vendor {
  id: number;
  name: string;
  // Add other vendor fields as needed
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[]; // JSON array of image URLs
  rating?: number | null;
  reviewCount?: number;
  vendorId: string; // Note: string in response but number in model - keep as string to match API
  vendor?: {
    id: number;
    name: string;
  };
  category: string;
  subCategory?: string;
  tags?: string[]; // JSON array
  stock: number;
  features?: string[]; // JSON object
  created_at: string; // ISO date string
  specifications?: Record<string, string>; // JSON key-value pairs
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
}

export interface ProductsResponse {
  items: Product[];
  next_cursor: number | null;
  category?: string;
  filter?: string;
  total?: number; // Optional for pagination
}

export interface CategoriesResponse {
  categories: string[];
  sub_categories?: string[]; // Optional if you need them
}

// For vendor-related responses
export interface VendorResponse {
  vendor: Vendor;
  products: Product[];
}

// For product creation/update
export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  original_price?: number;
  images: string[];
  category: string;
  sub_category?: string;
  stock: number;
  // ... other fields as needed
}