'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ShoppingBag, Truck, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');
  
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  
  useEffect(() => {
    // Calculate estimated delivery date (3-5 business days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3)); // Random between 3-5 days
    
    // Format date to human-readable format
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setEstimatedDelivery(deliveryDate.toLocaleDateString('en-US', options));
    
    // Generate a random order total for demo purposes
    setOrderTotal(Math.floor(Math.random() * 10000) + 2000);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900/20 rounded-full p-6 mb-6">
          <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your order has been received and is being processed. You will receive a confirmation email shortly.
        </p>
      </div>
      
      <Card className="w-full max-w-2xl mb-8">
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Order Number</p>
                <p className="font-medium">{orderNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Order Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Total Amount</p>
                <p className="font-medium">{formatPrice(orderTotal)}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Payment Method</p>
                <p className="font-medium">M-Pesa</p>
              </div>
            </div>
            
            <div className="bg-muted/40 p-4 rounded-lg flex items-start space-x-4">
              <Truck className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Estimated Delivery</p>
                <p className="text-muted-foreground">{estimatedDelivery}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl mb-10">
        <div className="flex flex-col items-center text-center p-4 border rounded-lg">
          <ShoppingBag className="h-10 w-10 mb-2 text-muted-foreground" />
          <span className="font-medium">Track Your Order</span>
          <p className="text-sm text-muted-foreground mt-1">
            Follow your order status
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4 border rounded-lg">
          <Calendar className="h-10 w-10 mb-2 text-muted-foreground" />
          <span className="font-medium">Manage Orders</span>
          <p className="text-sm text-muted-foreground mt-1">
            View your order history
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4 border rounded-lg">
          <Clock className="h-10 w-10 mb-2 text-muted-foreground" />
          <span className="font-medium">Delivery Updates</span>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time notifications
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/account/orders">
          <Button variant="outline" size="lg">
            View Orders
          </Button>
        </Link>
        <Link href="/">
          <Button size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}