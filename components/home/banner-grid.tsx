import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const banners = [
  {
    id: 1,
    title: 'Tech Deals',
    description: 'Save up to 30% on the latest gadgets',
    buttonText: 'Shop Now',
    buttonLink: '/deals/tech',
    image: 'https://images.pexels.com/photos/1927593/pexels-photo-1927593.jpeg',
    size: 'large',
  },
  {
    id: 2,
    title: 'Fashion Sale',
    description: 'New season styles',
    buttonText: 'Explore',
    buttonLink: '/category/fashion/sale',
    image: 'https://images.pexels.com/photos/5872361/pexels-photo-5872361.jpeg',
    size: 'small',
  },
  {
    id: 3,
    title: 'Home Essentials',
    description: 'Quality products for your home',
    buttonText: 'View Collection',
    buttonLink: '/category/home-kitchen',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    size: 'small',
  },
];

export default function BannerGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {banners.map((banner) => (
        <div 
          key={banner.id}
          className={`rounded-xl overflow-hidden relative shadow-md ${
            banner.size === 'large' ? 'md:col-span-2' : ''
          }`}
        >
          <div className={`relative ${banner.size === 'large' ? 'aspect-[21/9]' : 'aspect-square'}`}>
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-6 md:p-10">
              <h3 className="text-white text-xl md:text-3xl font-bold mb-2">{banner.title}</h3>
              <p className="text-white/90 mb-4">{banner.description}</p>
              <Link href={banner.buttonLink}>
                <Button variant="secondary" className="w-fit">
                  {banner.buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}