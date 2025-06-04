import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const {
    id,
    name,
    price,
    originalPrice,
    images,
    rating,
    reviewCount,
    vendorName,
    isNewArrival,
    isBestSeller,
  } = product;
  
  const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0;
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md">
      <Link href={`/product/${id}`} className="block">
        <div className="relative aspect-square">
          <Image
            src={images[0]}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              -{discountPercentage}%
            </Badge>
          )}
          
          {isNewArrival && (
            <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-600">
              New
            </Badge>
          )}
          
          {isBestSeller && (
            <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">
              Bestseller
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className={`p-4 ${variant === 'compact' ? 'pb-2' : 'pb-0'}`}>
        <div className="flex flex-col gap-1">
          <Link href={`/product/${id}`} className="block">
            <h3 className="font-medium leading-tight hover:text-primary transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
          
          {variant !== 'compact' && (
            <Link href={`/vendor/${vendorName}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {vendorName}
            </Link>
          )}
          
          <div className="flex items-center gap-1 mt-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviewCount})</span>
          </div>
          
          <div className="mt-2 flex items-end gap-2">
            <span className="font-semibold">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      {variant !== 'compact' && (
        <CardFooter className="p-4 pt-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="group-hover:bg-primary/10 transition-colors"
            >
              <Heart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Wishlist</span>
            </Button>
            <Button size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}