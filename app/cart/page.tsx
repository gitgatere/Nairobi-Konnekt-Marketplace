'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Calculate shipping (free for orders over KES 5,000)
  const shippingCost = subtotal > 5000 ? 0 : 350;
  
  // Calculate total
  const total = subtotal + shippingCost;
  
  // Group items by seller
  const itemsByVendor = items.reduce((acc, item) => {
    if (!acc[item.vendorId]) {
      acc[item.vendorId] = {
        vendorName: item.vendorName,
        items: []
      };
    }
    acc[item.vendorId].items.push(item);
    return acc;
  }, {} as Record<string, { vendorName: string; items: typeof items }>);
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-muted/30 rounded-full p-6 mb-6">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          It looks like you haven't added any items to your cart yet. 
          Browse our products and discover amazing deals!
        </p>
        <Link href="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
            <Button variant="ghost" size="sm" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
          
          {Object.entries(itemsByVendor).map(([vendorId, { vendorName, items: vendorItems }]) => (
            <div key={vendorId} className="space-y-4">
              <div className="flex items-center">
                <h3 className="font-semibold">Sold by: {vendorName}</h3>
              </div>
              
              <Card>
                {vendorItems.map((item, index) => (
                  <div key={item.id}>
                    <CardContent className={`p-4 ${index !== 0 ? 'pt-4' : 'pt-6'}`}>
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0 border">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.id}`} className="font-medium hover:text-primary line-clamp-2">
                            {item.name}
                          </Link>
                          
                          <div className="flex flex-wrap justify-between items-end mt-2 gap-2">
                            <div>
                              <div className="font-semibold">{formatPrice(item.price)}</div>
                            </div>
                            
                            <div className="flex items-center">
                              <div className="flex items-center border rounded-md mr-4">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8" 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    {index < vendorItems.length - 1 && <Separator />}
                  </div>
                ))}
                
                <CardFooter className="px-6 py-4 bg-muted/20">
                  <p className="text-sm text-muted-foreground">
                    Ships from: {vendorName}
                  </p>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Order summary */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span>{formatPrice(shippingCost)}</span>
                  )}
                </div>
                
                {subtotal < 5000 && (
                  <div className="text-sm bg-muted p-3 rounded-lg">
                    Add <span className="font-semibold">{formatPrice(5000 - subtotal)}</span> more to qualify for free shipping
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-6 pb-6 pt-0 flex flex-col gap-4">
              <Link href="/checkout" className="w-full">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="/products">
                <Button variant="ghost" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}