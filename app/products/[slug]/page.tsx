'use client';
import { useEffect } from "react";

import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/product-card';
import { featuredProducts, newArrivals, bestSellers } from '@/data/products';
import { useApp } from '@/providers/AppContext';

interface SectionPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: SectionPageProps) {
  const { slug } = params;
  console.log(slug);
  const { handleViewAll } = useApp();

  // Set the category when page loads
  useEffect(() => {
    handleViewAll(slug);
  }, [slug]);
  
  const { products,nextCursor, fetchMoreProducts, isLoading } = useApp();
  
  // Convert slug to readable format
  const categoryName = slug.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
  
  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">No Products Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find any products in the {categoryName} category.
        </p>
        <Link href="/products">
          <Button>Browse All Products</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{categoryName}</span>
      </div>
      
      {/* Category header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        <p className="text-muted-foreground">
          Browse our selection of {categoryName.toLowerCase()} products
        </p>
      </div>
      
      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      {nextCursor && (
        <button className="load-more bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => fetchMoreProducts()}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}