import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import heroBanner from '@/assets/food-hero-banner.jpg';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="min-h-[600px] lg:min-h-[700px] flex items-center justify-center text-center"
      style={{
        background: 'linear-gradient(to bottom, #E53935 70%, #FFF8E1 30%)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-foreground mb-6 animate-slide-up">
            Classic Fast Food Combo
          </h1>

          <p className="text-lg md:text-xl text-foreground/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            Craving a delicious deal? Get our classic combo, packed with flavor and fun!
          </p>

          <div className="animate-scale-in">
            <Button 
              onClick={scrollToProducts}
              className="bg-secondary hover:bg-secondary-hover text-secondary-foreground px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform hover:scale-105 group"
            >
              Order Now
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;