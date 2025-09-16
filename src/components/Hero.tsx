import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBanner})` }}
      ></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-2" />
            <span className="text-sm font-medium">Premium Tech Collection</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            Discover the Future of
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Technology
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            Explore our curated collection of premium tech products designed to enhance your digital lifestyle. Quality, innovation, and style combined.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button 
              onClick={scrollToProducts}
              className="btn-hero group"
            >
              Shop Collection
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
    </section>
  );
};

export default Hero;