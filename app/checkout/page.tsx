'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, CreditCard, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/hooks/use-cart';
import { formatPrice, generateOrderNumber } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';  // ✅ Correct path

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  
  const [formState, setFormState] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    postalCode: '',
    paymentMethod: 'mpesa',
    shippingMethod: 'standard',
    saveInfo: true,
  });
  
  const [loading, setLoading] = useState(false);
  
  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Calculate shipping (free for orders over KES 5,000)
  const shippingCost = formState.shippingMethod === 'express' ? 500 : 
                       formState.shippingMethod === 'sameday' ? 800 :
                       subtotal > 5000 ? 0 : 350;
  
  // Calculate total
  const total = subtotal + shippingCost;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      const orderNumber = generateOrderNumber();
      
      toast({
        title: 'Order Placed Successfully!',
        description: `Your order #${orderNumber} has been confirmed. You will receive a confirmation email shortly.`,
      });
      
      // Clear cart and redirect to success page
      clearCart();
      window.location.href = `/order-success?order=${orderNumber}`;
      
      setLoading(false);
    }, 2000);
  };
  
  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add items to your cart before proceeding to checkout.</p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Cart
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Left column - Contact, Shipping, Payment */}
          <div className="lg:col-span-6 space-y-8">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your-email@example.com"
                      required
                      value={formState.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formState.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formState.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+254"
                    required
                    value={formState.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    required
                    value={formState.address}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City/Town</Label>
                    <Input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formState.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="county">County</Label>
                    <Select
                      value={formState.county}
                      onValueChange={(value) => handleSelectChange('county', value)}
                    >
                      <SelectTrigger id="county">
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="mombasa">Mombasa</SelectItem>
                        <SelectItem value="kisumu">Kisumu</SelectItem>
                        <SelectItem value="nakuru">Nakuru</SelectItem>
                        <SelectItem value="eldoret">Eldoret</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formState.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Shipping Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Shipping Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formState.shippingMethod}
                  onValueChange={(value) => handleSelectChange('shippingMethod', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="cursor-pointer flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Standard Delivery</div>
                          <div className="text-sm text-muted-foreground">3-5 business days</div>
                        </div>
                      </Label>
                    </div>
                    <div>
                      {subtotal > 5000 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>{formatPrice(350)}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="cursor-pointer flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Express Delivery</div>
                          <div className="text-sm text-muted-foreground">1-2 business days</div>
                        </div>
                      </Label>
                    </div>
                    <div>
                      <span>{formatPrice(500)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg cursor-pointer hover:bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sameday" id="sameday" />
                      <Label htmlFor="sameday" className="cursor-pointer flex items-center">
                        <Truck className="w-5 h-5 mr-2 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Same Day Delivery</div>
                          <div className="text-sm text-muted-foreground">Available in Nairobi only (order before 10 AM)</div>
                        </div>
                      </Label>
                    </div>
                    <div>
                      <span>{formatPrice(800)}</span>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="mpesa">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mpesa" className="space-y-4 mt-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-muted/30">
                      <div className="h-12 w-12 relative">
                        <Image
                          src="https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg"
                          alt="M-Pesa"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">Pay with M-Pesa</h3>
                        <p className="text-sm text-muted-foreground">
                          Enter your phone number and you will receive a prompt to pay
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
                      <Input
                        type="tel"
                        id="mpesaPhone"
                        name="mpesaPhone"
                        placeholder="+254"
                        value={formState.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-muted/30">
                      <CreditCard className="h-12 w-12 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">Pay with Credit/Debit Card</h3>
                        <p className="text-sm text-muted-foreground">
                          Secure payment via credit or debit card
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          type="text"
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          type="text"
                          id="cvc"
                          name="cvc"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="paypal" className="space-y-4 mt-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-muted/30">
                      <div className="h-12 w-12 relative">
                        <Image
                          src="https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg"
                          alt="PayPal"
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">Pay with PayPal</h3>
                        <p className="text-sm text-muted-foreground">
                          You will be redirected to PayPal to complete your payment
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order items */}
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0 border">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Qty: {item.quantity}</span>
                            <span>{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Price breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>{formatPrice(shippingCost)}</span>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <ShieldCheck className="h-8 w-8 mb-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <MapPin className="h-8 w-8 mb-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Delivery Tracking</span>
                </div>
              </div>
              
              {/* Place order button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                By placing your order, you agree to our <Link href="/terms-of-service" className="underline">Terms of Service</Link> and <Link href="/privacy-policy" className="underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}