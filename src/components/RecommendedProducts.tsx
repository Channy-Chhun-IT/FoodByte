import { useQuery } from "@tanstack/react-query";
import { getRecommendedProducts } from "@/integrations/supabase/client";
import { Product } from "@/types/Product";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface RecommendedProductsProps {
  onAddToCart: (product: Product) => void;
  currentCartIds: string[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({
  onAddToCart,
  currentCartIds,
}) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["recommended-products"],
    queryFn: () => getRecommendedProducts(4), // Fetch 4 random products
  });

  const recommendedProducts = Array.isArray(products)
    ? products.filter((p) => !currentCartIds.includes(p.id)).slice(0, 3)
    : [];

  if (isLoading) {
    return <div>Loading recommendations...</div>;
  }

  if (!recommendedProducts || recommendedProducts.length === 0) {
    return null;
  }

  return (
    <div className="lg:col-span-2 mt-8">
      <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md border-2 border-foreground text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="font-bold text-md">{product.name}</h3>
            <p className="text-muted-foreground text-sm mb-2">
              ${product.price.toFixed(2)}
            </p>
            <Button onClick={() => onAddToCart(product)} size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
