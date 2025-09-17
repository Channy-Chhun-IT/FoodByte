import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useTypingAnimation } from "@/hooks/use-typing-animation";

interface Profile {
  username: string | null;
}

interface HeaderProps {
  cartItemCount: number;
  onSearchChange?: (query: string) => void;
  session: Session | null;
  profile: Profile | null;
}

const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onSearchChange,
  session,
  profile,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const animatedUsername = useTypingAnimation(profile?.username || "Welcome!");

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navLinks = [
    { label: "Menu", href: "/menu" },
    { label: "Deals", href: "/deals" },
    { label: "Store", href: "/store" },
  ];

  return (
    <header className="bg-[#FFF8E1] border-b-4 border-foreground sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="relative flex items-center justify-between">
          {/* Logo (Left) */}
          <div className="flex justify-start">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logo.jpg"
                alt="QuietLamb Logo"
                className="h-12 w-12 rounded-full border-2 border-foreground"
              />
              <span className="text-2xl font-bold font-heading text-foreground hidden sm:inline">
                FoodByte
              </span>
            </Link>
          </div>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center justify-center space-x-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="nav-link text-lg font-bold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search/Animation + Actions (Right) */}
          <div className="flex items-center justify-end space-x-2">
            {location.pathname === "/menu" ? (
              <div className="relative w-full max-w-xs hidden lg:block">
                <Input
                  type="search"
                  placeholder="Search menu..."
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (onSearchChange) {
                      onSearchChange(e.target.value);
                    }
                  }}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>
            ) : (
              <div className="text-xl font-semibold text-foreground hidden lg:block w-48 text-center">
                <span>{animatedUsername}</span>
                <span className="animate-pulse">|</span>
              </div>
            )}

            {/* Mobile Search - Only on Menu page */}
            {location.pathname === "/menu" && (
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Search className="w-5 h-5" />
              </Button>
            )}

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Button */}
            {session ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-link text-lg font-bold text-left p-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Search */}
            {location.pathname === "/menu" && (
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search fresh foods..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      onSearchChange?.(e.target.value);
                    }}
                    className="search-input pl-10"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
