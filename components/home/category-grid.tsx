import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { 
    id: 'electronics', 
    name: 'Electronics', 
    image: 'https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg',
    href: '/category/electronics' 
  },
  { 
    id: 'fashion', 
    name: 'Fashion', 
    image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
    href: '/category/fashion' 
  },
  { 
    id: 'home-kitchen', 
    name: 'Home & Kitchen', 
    image: 'https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg',
    href: '/category/home-kitchen' 
  },
  { 
    id: 'beauty', 
    name: 'Beauty & Personal Care', 
    image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg',
    href: '/category/beauty' 
  },
  { 
    id: 'books', 
    name: 'Books & Media', 
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    href: '/category/books' 
  },
  { 
    id: 'toys', 
    name: 'Toys & Games', 
    image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg',
    href: '/category/toys' 
  },
  { 
    id: 'sports', 
    name: 'Sports & Outdoors', 
    image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg',
    href: '/category/sports' 
  },
  { 
    id: 'grocery', 
    name: 'Grocery & Gourmet', 
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg',
    href: '/category/grocery' 
  },
];

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          href={category.href}
          className="group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold text-lg">{category.name}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}