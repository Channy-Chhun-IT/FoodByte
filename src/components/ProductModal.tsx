import React from "react";
import { Button } from "@/components/ui/button";
import {
  X,
  ShoppingCart,
  Star,
  Check,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Product } from "@/types/Product";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    onClose();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop animate-fade-in" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-background rounded-2xl shadow-2xl z-50 overflow-hidden animate-scale-in">
        <div className="flex flex-col md:flex-row h-full">
          {/* Product Image */}
          <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 p-8 overflow-y-auto">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {product.category}
              </span>

              {/* Name */}
              <h2 className="text-3xl font-bold text-foreground">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} stars ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-success">
                  ${product.price}
                </span>
                {product.original_price && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.original_price}
                    </span>
                    <span className="bg-sale text-sale-foreground px-2 py-1 rounded-md text-sm font-semibold">
                      {Math.round(
                        (1 - product.price / product.original_price) * 100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>1 day Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <span>No Returns</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    product.in_stock ? "bg-success" : "bg-destructive"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    product.in_stock ? "text-success" : "text-destructive"
                  }`}
                >
                  {product.in_stock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className="btn-hero w-full"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.in_stock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
