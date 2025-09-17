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
      className="product-card p-6 cursor-pointer group animate-fade-in"
      onClick={() => onProductClick(product)}
    >
      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="product-image w-full h-48 object-cover transition-transform duration-300"
        />
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Sale Badge */}
        {product.original_price && (
          <div className="absolute top-3 left-3 bg-sale text-sale-foreground px-2 py-1 rounded-md text-xs font-semibold">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Category */}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="price">${product.price}</span>
          {product.original_price && (
            <span className="price-original">${product.original_price}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button 
          onClick={handleAddToCart}
          className="btn-cart w-full group"
        >
          <ShoppingCart className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;