import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Product } from '@/types/Product';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  onProductClick,
  onAddToCart
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      slidesToScroll: 1,
      containScroll: 'trimSnaps'
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, products]);

  if (products.length === 0) return null;

  return (
    <section className="py-16 bg-[#FFF8E1]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-4">
            Fan Favorites
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Check out the combos that everyone is talking about!
          </p>
        </div>

        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {products.slice(0, 6).map((product) => (
              <div key={product.id} className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] p-4">
                <div 
                  className="bg-white border-4 border-foreground rounded-2xl p-6 h-full flex flex-col cursor-pointer group transition-transform hover:scale-105 shadow-lg"
                  onClick={() => onProductClick(product)}
                >
                  <div className="relative mb-4 overflow-hidden rounded-lg bg-white border-2 border-foreground">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {product.original_price && (
                      <div className="absolute top-3 left-3 bg-sale text-sale-foreground px-3 py-1 rounded-lg text-sm font-bold font-heading">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 text-center flex-grow flex flex-col">
                    <h3 className="font-heading text-2xl text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-muted-foreground/50'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-baseline justify-center gap-2 flex-grow">
                      <span className="text-3xl font-bold text-primary font-heading">${product.price}</span>
                      {product.original_price && (
                        <span className="text-lg text-muted-foreground line-through">${product.original_price}</span>
                      )}
                    </div>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="bg-primary hover:bg-primary-hover text-primary-foreground w-full font-bold text-lg py-3 rounded-xl transition-transform hover:scale-105 group shadow-lg mt-auto"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                      Add to Order
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;