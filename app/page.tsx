import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import ProductCarousel from '@/components/products/product-carousel';
import CategoryGrid from '@/components/home/category-grid';
import { featuredProducts, newArrivals, bestSellers } from '@/data/products';
import Hero from '@/components/home/hero';
import BannerGrid from '@/components/home/banner-grid';

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-10">
      {/* Hero section */}
      <Hero />
      
      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link href="/categories">
            <Button variant="link" className="flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <CategoryGrid />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products">
            <Button variant="link" className="flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <ProductCarousel products={featuredProducts} />
      </section>

      {/* Mid-page banner */}
      <section className="container mx-auto px-4">
        <div className="rounded-xl overflow-hidden relative">
          <div className="aspect-[21/9] md:aspect-[3/1] relative">
            <Image
              src="https://images.pexels.com/photos/7681731/pexels-photo-7681731.jpeg"
              alt="Shop local Kenyan businesses"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-center px-8 md:px-16">
              <h2 className="text-white text-2xl md:text-4xl font-bold mb-4">Support Local Artisans</h2>
              <p className="text-white max-w-md mb-6 hidden md:block">
                Discover handcrafted products from talented Kenyan artisans and support local businesses.
              </p>
              <Link href="/category/handmade">
                <Button size="lg" className="w-fit">Shop Kenyan Handcrafts</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Grid */}
      <section className="container mx-auto px-4">
        <BannerGrid />
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <Link href="/products/new-arrivals">
            <Button variant="link" className="flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <ProductCarousel products={newArrivals} />
      </section>

      {/* Best Sellers */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
          <Link href="/products/best-sellers">
            <Button variant="link" className="flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <ProductCarousel products={bestSellers} />
      </section>

      {/* Sell on marketplace section */}
      <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900 rounded-xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Start Selling on Nairobi-Konnekt</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of Kenyan entrepreneurs and artisans who are growing their businesses on our marketplace.
              Reach millions of customers locally and globally with our e-commerce platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/vendor/register">
                <Button size="lg">Become a Seller</Button>
              </Link>
              <Link href="/vendor/learn-more">
                <Button size="lg" variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
          <div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.pexels.com/photos/6169659/pexels-photo-6169659.jpeg"
              alt="Become a seller"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}