'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, ShoppingCart, Share2, Star, Truck, Shield, RotateCcw, Check, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { featuredProducts, newArrivals, bestSellers } from '@/data/products';
import { useToast } from '@/components/ui/use-toast';
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import ProductCarousel from '@/components/products/product-carousel';

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Find product from all available products
  const allProducts = [...featuredProducts, ...newArrivals, ...bestSellers];
  const product = allProducts.find((p) => p.id === id);
  
  const { toast } = useToast();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');
  
  // Handle quantity change
  const increaseQuantity = () => {
    if (quantity < (product?.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Add to cart
  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      vendorId: product.vendorId,
      vendorName: product.vendorName,
    });
  };
  
  // Handle add to wishlist
  const handleAddToWishlist = () => {
    toast({
      title: 'Added to wishlist',
      description: `${product?.name} has been added to your wishlist`,
    });
  };
  
  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }
  
  const discountPercentage = product.originalPrice ? calculateDiscountPercentage(product.originalPrice, product.price) : 0;
  
  // Find related products (same category)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden border">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
            />
            
            {discountPercentage > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
                -{discountPercentage}% OFF
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square w-20 rounded border overflow-hidden ${
                  image === selectedImage ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${product.name} - view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
            
            <Link href={`/vendor/${product.vendorId}`} className="text-primary hover:underline mb-4 inline-block">
              {product.vendorName}
            </Link>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : i < product.rating
                        ? 'fill-amber-400 text-amber-400 half'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
            </div>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            
            {discountPercentage > 0 && (
              <Badge variant="outline" className="text-red-500 border-red-200 ml-2">
                Save {formatPrice(product.originalPrice! - product.price)}
              </Badge>
            )}
          </div>
          
          <div className="border-t pt-6">
            <p className="text-muted-foreground mb-4">{product.description}</p>
            
            {product.features && (
              <ul className="space-y-2 mb-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="border-t pt-6">
            <div className="mb-4 flex items-center">
              <div className="mr-6">
                <p className="text-sm text-muted-foreground mb-1">Quantity</p>
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Stock Status</p>
                <div className="flex items-center gap-1">
                  <Badge variant={product.stock > 10 ? 'success' : product.stock > 0 ? 'warning' : 'destructive'}>
                    {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </Badge>
                  {product.stock > 0 && <span className="text-sm">({product.stock} available)</span>}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleAddToWishlist}
              >
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-6">
            <div className="flex items-center gap-3">
              <Truck className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-muted-foreground">For orders over KES 5,000</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">Secure Payment</p>
                <p className="text-sm text-muted-foreground">Encrypted transactions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <RotateCcw className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">Easy Returns</p>
                <p className="text-sm text-muted-foreground">Within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product details tabs */}
      <div className="mb-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="px-1">
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4">{product.description}</p>
              
              {product.features && (
                <>
                  <h3 className="text-xl font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              
              <p>
                Experience the quality and uniqueness of products from {product.vendorName}, 
                one of our trusted vendors specializing in {product.category.toLowerCase()} products on Nairobi-Konnekt Marketplace.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications">
            {product.specifications ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                        <td className="py-3 px-4 font-medium">{key}</td>
                        <td className="py-3 px-4">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">No detailed specifications available for this product.</p>
            )}
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{product.rating} out of 5</p>
                  <p className="text-muted-foreground">Based on {product.reviewCount} reviews</p>
                </div>
                <Button>Write a Review</Button>
              </div>
              
              <p className="text-muted-foreground text-center py-12">
                Reviews will be displayed here when they are available.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="shipping">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
                <p className="text-muted-foreground">
                  We offer various shipping options to ensure your order reaches you in the fastest and most convenient way:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Standard Delivery: 3-5 business days (Free for orders over KES 5,000)</li>
                  <li>Express Delivery: 1-2 business days (Additional fee applies)</li>
                  <li>Same-day Delivery: Available for select areas in Nairobi (Order before 10 AM)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Returns & Refunds Policy</h3>
                <p className="text-muted-foreground">
                  We want you to be completely satisfied with your purchase. If you're not happy with your order:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Return within 30 days for a full refund</li>
                  <li>Product must be unused and in original packaging</li>
                  <li>Contact our customer service to initiate the return process</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <ProductCarousel products={relatedProducts} />
      </div>
    </div>
  );
}