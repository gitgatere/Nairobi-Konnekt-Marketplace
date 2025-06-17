'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart, ShoppingCart, Share2, Star, Truck, Shield, RotateCcw, Check, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { featuredProducts, newArrivals, bestSellers } from '@/data/products';
import { useToast } from '@/hooks/use-toast';  // ✅ Correct path
import { formatPrice, calculateDiscountPercentage } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import ProductCarousel from '@/components/products/product-carousel';
import { Product } from "@/types/product";

export interface ProductResponse {
  product: Product;
  related_products: Product[]; // Optional if you need them
}


export default function ProductPage({ params }: { params: { id: string } }) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  //const id = 1
  const { id } = params;
  const [data, setData] = useState<ProductResponse | null>(null);

   // Safely destructure with defaults when data is loaded
  const {                          // Required (but default for safety)
  name = "",                       // Required
  description = "",                // Required
  price = 0,                       // Required
  originalPrice = price,           // Optional: falls back to price
  images = [],                     // Required (but default empty array)
  // rating = null,                   // Optional (number | null)
  reviewCount = 0,                 // Optional
  vendorId = "",                   // Required (string)
  vendor = {                       // Nested object with defaults
    id: 0,
    name: "Unknown Vendor"
  },
  category = "Uncategorized",      // Required
  stock = 0,                       // Required
  features = [],                   // Optional (Record<string, unknown>)
  specifications = {},             // Optional
} = data?.product || {};

  const { toast } = useToast();
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

   const vendorName = vendor?.name ?? 'Unknown Vendor'; // Get name from vendor object
   const rating = data?.product.rating ?? 0;
  //  const features = data?.product.features ?? {};
   //const specifications = data?.product.specifications ?? {};

  // Fetch product
const getProduct = async (productId: string) => {
  try {
    const response = await fetch(`${API_BASE}/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    const data = await response.json();
    const productData = {
        product: data.product || {},
        related_products: data.related_products || []
      };
      
      setData(productData);
      
      // Set the initial selected image after data loads
      if (productData.product?.images?.[0]) {
        setSelectedImage(productData.product?.images[0]);
      }
  } catch (err) {
    console.error("Product fetch error:", err);
  }
};

useEffect(() => {
  getProduct(id);
}, [id, API_BASE]);
  
  
  // Handle quantity change
  const increaseQuantity = () => {
    if (!data) return;
    if (quantity < (data.product?.stock || 10)) {
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
    if (!data) return;
    if (!data.product) return;
    
    addItem({
      id: id.toString(),
      name: name,
      price: price,
      quantity,
      image: images[0],
      vendorId: vendorId,
      vendorName: vendorName,
    });
  };
  
  // Handle add to wishlist
  const handleAddToWishlist = () => {
    toast({
      title: 'Added to wishlist',
      description: `${name} has been added to your wishlist`,
    });
  };
  
  // If product not found
  if (!data?.product) {
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
  
  const discountPercentage = originalPrice ? calculateDiscountPercentage(originalPrice, price) : 0;
  
  // Find related products (same category)
  const relatedProducts = data?.related_products
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary">
          {category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden border">
            <Image
              src={selectedImage}
              alt={name}
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
            {images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square w-20 rounded border overflow-hidden ${
                  image === selectedImage ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${name} - view ${index + 1}`}
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
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{name}</h1>
            
            <Link href={`/vendor/${vendorId}`} className="text-primary hover:underline mb-4 inline-block">
              {vendorName}
            </Link>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(rating)
                        ? 'fill-amber-400 text-amber-400'
                        : i < rating
                        ? 'fill-amber-400 text-amber-400 half'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">({reviewCount} reviews)</span>
            </div>
          </div>
          
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold">{formatPrice(price)}</span>
            
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
            
            {discountPercentage > 0 && (
              <Badge variant="outline" className="text-red-500 border-red-200 ml-2">
                Save {formatPrice(originalPrice! - price)}
              </Badge>
            )}
          </div>
          
          <div className="border-t pt-6">
            <p className="text-muted-foreground mb-4">{description}</p>
            
            {features && (
              <ul className="space-y-2 mb-4">
                {features.map((feature, index) => (
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
                    disabled={quantity >= stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Stock Status</p>
                <div className="flex items-center gap-1">
                  <Badge variant={stock > 10 ? 'success' : stock > 0 ? 'warning' : 'destructive'}>
                    {stock > 10 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'}
                  </Badge>
                  {stock > 0 && <span className="text-sm">({stock} available)</span>}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={stock === 0}
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
            <TabsTrigger value="reviews">Reviews ({reviewCount})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="px-1">
            <div className="prose dark:prose-invert max-w-none">
              <p className="mb-4">{description}</p>
              
              {features && (
                <>
                  <h3 className="text-xl font-semibold mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
              
              <p>
                Experience the quality and uniqueness of products from {vendorName}, 
                one of our trusted vendors specializing in {category.toLowerCase()} products on Nairobi-Konnekt Marketplace.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications">
            {specifications ? (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(specifications).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                        <td className="py-3 px-4 font-medium">{key}</td>
                        <td className="py-3 px-4">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted-foreground">No detailed specifications available for this </p>
            )}
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{rating} out of 5</p>
                  <p className="text-muted-foreground">Based on {reviewCount} reviews</p>
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