'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, User, Heart, Bell, ChevronDown } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useApp } from '@/providers/AppContext';

const categories = [
  { name: 'Electronics', href: '/category/electronics' },
  { name: 'Fashion', href: '/category/fashion' },
  { name: 'Home & Kitchen', href: '/category/home-kitchen' },
  { name: 'Beauty & Personal Care', href: '/category/beauty' },
  { name: 'Books', href: '/category/books' },
  { name: 'Toys & Games', href: '/category/toys' },
  { name: 'Sports & Outdoors', href: '/category/sports' },
  { name: 'Automotive', href: '/category/automotive' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { items } = useCart();
  const { searchTerm, handleSearchChange, handleSearchClick, handleKeyDown } = useApp();
  
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      isScrolled 
        ? "bg-white shadow-md dark:bg-gray-900" 
        : "bg-background"
    )}>
      {/* Top bar */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Mobile menu and logo */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-xl font-bold mb-4">
                    Nairobi-Konnekt
                  </Link>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link 
                        key={category.name} 
                        href={category.href}
                        className="block py-2 hover:text-primary"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4">
                    <Link href="/account/login" className="flex items-center gap-2 py-2">
                      <User className="h-4 w-4" />
                      Sign In / Register
                    </Link>
                    <Link href="/account/orders" className="flex items-center gap-2 py-2">
                      <Bell className="h-4 w-4" />
                      My Orders
                    </Link>
                    <Link href="/vendor/login" className="flex items-center gap-2 py-2">
                      <ShoppingCart className="h-4 w-4" />
                      Sell on Nairobi-Konnekt
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center">
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
                Nairobi-Konnekt
              </span>
            </Link>
          </div>
          
          {/* Search bar */}
          <div className="hidden md:flex flex-1 mx-6">
            <div className="relative w-full max-w-lg">
              <Input
              value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown} 
                type="search" 
                placeholder="Search products, brands, and categories..." 
                className="w-full pl-4 pr-10 py-2 rounded-lg"
              />
              <Button
              onClick={handleSearchClick} 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {items.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <Link href="/account/login">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/register">Register</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/dashboard">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/vendor/login">Sell on Nairobi-Konnekt</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Search bar for mobile */}
      <div className="border-t md:hidden px-4 py-2">
        <div className="relative w-full">
          <Input
          value={searchTerm}
          onChange={handleSearchChange} 
          onKeyDown={handleKeyDown}
            type="search" 
            placeholder="Search..." 
            className="w-full pl-4 pr-10 py-2 rounded-lg"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {/* Categories bar */}
      <div className="border-t hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide py-1">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={category.href}
                className="inline-flex whitespace-nowrap py-2 text-sm hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" size="sm" className="text-sm">
                  More <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/category/grocery">Grocery</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/health">Health & Household</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/category/industrial">Industrial & Scientific</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}