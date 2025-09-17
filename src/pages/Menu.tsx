import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/Product";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/supabase-js";

interface Profile {
  username: string | null;
}

interface MenuProps {
  cart: Product[];
  onAddToCart: (product: Product) => void;
  session: Session | null;
  profile: Profile | null;
}

const Menu: React.FC<MenuProps> = ({ cart, onAddToCart, session, profile }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCartWithToast = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        cartItemCount={cart.length}
        onSearchChange={setSearchQuery}
        session={session}
        profile={profile}
      />
      <main className="flex-grow bg-cream">
        <div className="container mx-auto py-16">
          <h1 className="text-5xl font-heading text-center mb-4 text-foreground">
            Our Menu
          </h1>
          <p className="text-center text-lg text-muted-foreground mb-12">
            Browse our delicious selection of fast-food classics.
          </p>

          {/* Category Filters */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-bold rounded-full transition-all duration-300 border-2 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-white text-foreground border-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border-4 border-foreground rounded-2xl p-6 text-center bg-white shadow-md transition-transform hover:scale-105 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-4 border-2 border-foreground"
                />
                <div className="flex-grow">
                  <h2 className="text-2xl font-heading">{product.name}</h2>
                  <p className="text-muted-foreground mb-4 text-sm h-16">
                    {product.description}
                  </p>
                </div>
                <p className="text-2xl font-bold text-primary mt-auto">
                  ${product.price}
                </p>
                <Button
                  onClick={() => handleAddToCartWithToast(product)}
                  className="mt-4"
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-xl col-span-full">
              No items match your search.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
