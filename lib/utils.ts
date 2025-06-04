import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(price);
}

export function truncate(str: string, length: number) {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

export function generateOrderNumber() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `NK-${timestamp}-${random}`;
}

export function calculateDiscountPercentage(originalPrice: number, salePrice: number) {
  if (!originalPrice || !salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

// Function to generate random rating
export function generateRating() {
  return (Math.random() * 2 + 3).toFixed(1); // Generate rating between 3.0 and 5.0
}