import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const footerLinks = [
    { label: "Menu", href: "menu" },
    { label: "Deals", href: "deals" },
    { label: "Store", href: "store" },
    { label: "About Us", href: "about" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground border-t-4 border-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          {/* Logo and Tagline */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <img
                src="/logo.jpg"
                alt="QuietLamb Logo"
                className="h-12 w-12 rounded-full border-2"
              />
              <span className="text-2xl font-bold font-heading">FoodByte</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Your favorite fast food, one click away!
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-bold hover:text-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} FoodByte Inc. All rights reserved.
          </p>
          <div className="flex gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <Icon className="w-5 h-5" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
