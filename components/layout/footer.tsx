import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube as YouTube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
                Nairobi-Konnekt
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              Connecting Kenyan sellers with global buyers through our innovative multi-vendor
              marketplace platform. Discover authentic products from across Kenya.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <YouTube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/electronics" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/fashion" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/category/home-kitchen" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Home & Kitchen
                </Link>
              </li>
              <li>
                <Link href="/category/beauty" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Beauty & Personal Care
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Today's Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/account/register" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/account/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Track Orders
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/vendor/register" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white mb-4">
              Support
            </h3>
            <ul className="space-y-4">
              <li className="flex">
                <Mail className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">support@nairobi-konnekt.com</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">+254 700 000 000</span>
              </li>
              <li className="flex">
                <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                <span className="text-gray-600 dark:text-gray-300">Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Nairobi-Konnekt Marketplace. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm">
                Terms of Service
              </Link>
              <Link href="/help-center" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}