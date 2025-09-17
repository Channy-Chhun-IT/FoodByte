import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const quickLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Shipping Info', href: '#shipping' },
    { label: 'Returns', href: '#returns' },
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
  ];

  const categories = [
    { label: 'Fresh Produce', href: '#produce' },
    { label: 'Bakery', href: '#bakery' },
    { label: 'Meat & Seafood', href: '#meat' },
    { label: 'Dairy', href: '#dairy' },
    { label: 'Pantry Essentials', href: '#pantry' },
    { label: 'Beverages', href: '#beverages' },
  ];

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold">FreshMarket</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Your trusted source for fresh, gourmet foods and artisan ingredients. From farm to table, quality and freshness guaranteed since 2020.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-background/80">
                <Mail className="w-4 h-4" />
                <span>hello@freshmarket.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-background/80">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-FOOD</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-background/80">
                <MapPin className="w-4 h-4" />
                <span>456 Fresh Avenue, Food District</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.label}>
                  <a
                    href={category.href}
                    className="text-background/80 hover:text-background transition-colors text-sm"
                  >
                    {category.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-background/80 text-sm mb-4">
              Subscribe to our newsletter for fresh arrivals and exclusive culinary deals.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-background/10 border border-background/20 rounded-lg text-background placeholder:text-background/60 focus:outline-none focus:border-background/40"
                />
                <Button className="btn-hero">
                  Subscribe
                </Button>
              </div>
              
              {/* Social Links */}
              <div className="flex gap-2 pt-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Button
                      key={social.label}
                      variant="ghost"
                      size="icon"
                      className="text-background/80 hover:text-background hover:bg-background/10"
                      asChild
                    >
                      <a href={social.href} aria-label={social.label}>
                        <Icon className="w-4 h-4" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/60 text-sm">
              © {currentYear} FreshMarket. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-background/60">
              <span>Made with ❤️ for food enthusiasts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;