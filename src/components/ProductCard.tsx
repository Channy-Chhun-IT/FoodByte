import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Product } from '@/types/Product';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onProductClick, 
  onAddToCart 
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      className="bg-[#FFF8E1] border-4 border-foreground rounded-2xl p-6 cursor-pointer group animate-fade-in transition-transform hover:scale-105 shadow-lg"
      onClick={() => onProductClick(product)}
    >
      {/* Product Image */}
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

      {/* Product Info */}
      <div className="space-y-3 text-center">
        <h3 className="font-heading text-2xl text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-center gap-2">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>

        <div className="flex items-baseline justify-center gap-2">
          <span className="text-3xl font-bold text-primary font-heading">${product.price}</span>
          {product.original_price && (
            <span className="text-lg text-muted-foreground line-through">${product.original_price}</span>
          )}
        </div>

        <Button 
          onClick={handleAddToCart}
          className="bg-primary hover:bg-primary-hover text-primary-foreground w-full font-bold text-lg py-3 rounded-xl transition-transform hover:scale-105 group shadow-lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
          Add to Order
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;