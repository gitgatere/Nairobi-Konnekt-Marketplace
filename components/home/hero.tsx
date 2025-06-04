'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/6634170/pexels-photo-6634170.jpeg',
    title: 'Discover Authentic Kenyan Products',
    description: 'Shop from thousands of verified Kenyan sellers and artisans',
    buttonText: 'Shop Now',
    buttonLink: '/products',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/6347888/pexels-photo-6347888.jpeg',
    title: 'Electronics & Gadgets',
    description: 'Latest tech products at competitive prices',
    buttonText: 'Explore',
    buttonLink: '/category/electronics',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/5418899/pexels-photo-5418899.jpeg',
    title: 'Handcrafted Fashion',
    description: 'Unique African designs and contemporary fashion',
    buttonText: 'View Collection',
    buttonLink: '/category/fashion',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Slides container */}
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
              <div className="container mx-auto h-full flex flex-col justify-center px-4 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{slide.title}</h1>
                  <p className="text-white/90 text-lg mb-6">{slide.description}</p>
                  <Link href={slide.buttonLink}>
                    <Button size="lg">{slide.buttonText}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline" 
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}