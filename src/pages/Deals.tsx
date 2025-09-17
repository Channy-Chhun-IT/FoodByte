import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/Product";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/supabase-js";

interface Profile {
  username: string | null;
}

interface DealsProps {
  cart: Product[];
  onAddToCart: (product: Product) => void;
  session: Session | null;
  profile: Profile | null;
}

const Deals: React.FC<DealsProps> = ({
  cart,
  onAddToCart,
  session,
  profile,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSaleProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .not("original_price", "is", null);

      if (error) {
        console.error("Error fetching sale products:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchSaleProducts();
  }, []);

  const dealOfTheDay = products.length > 0 ? products[0] : null;
  const otherDeals = products.length > 1 ? products.slice(1) : [];

  const handleAddToCartWithToast = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header
          cartItemCount={cart.length}
          session={session}
          profile={profile}
        />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-16 font-heading text-2xl">
            Loading deals...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Header cartItemCount={cart.length} session={session} profile={profile} />
      <main className="flex-grow">
        <div className="container mx-auto py-16">
          <h1 className="text-5xl font-heading text-center mb-12 text-foreground">
            Special Deals
          </h1>

          {/* Deal of the Day Banner */}
          {dealOfTheDay && (
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-8 border-4 border-foreground shadow-lg">
              <img
                src={dealOfTheDay.image}
                alt={dealOfTheDay.name}
                className="w-full md:w-1/3 h-64 object-cover rounded-lg border-4 border-foreground"
              />
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold bg-secondary text-secondary-foreground inline-block px-4 py-1 rounded-md mb-4">
                  Deal of the Day!
                </h2>
                <h3 className="text-4xl md:text-5xl font-heading mb-4">
                  {dealOfTheDay.name}
                </h3>
                <p className="text-lg mb-4">{dealOfTheDay.description}</p>
                <div className="flex items-baseline justify-center md:justify-start gap-4 mb-6">
                  <p className="text-4xl font-bold font-heading text-secondary">
                    ${dealOfTheDay.price}
                  </p>
                  <p className="text-2xl font-bold line-through opacity-70">
                    ${dealOfTheDay.original_price}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCartWithToast(dealOfTheDay)}
                  className="bg-secondary text-secondary-foreground font-bold text-xl px-8 py-3 rounded-xl shadow-md transition-transform hover:scale-105"
                >
                  Grab this Deal
                </button>
              </div>
            </div>
          )}

          {/* Other Deals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherDeals.length > 0
              ? otherDeals.map((product) => (
                  <div
                    key={product.id}
                    className="border-4 border-foreground rounded-2xl p-6 text-center bg-white shadow-md transition-transform hover:scale-105"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4 border-2 border-foreground"
                    />
                    <h2 className="text-3xl font-heading">{product.name}</h2>
                    <p className="text-muted-foreground mb-4 h-12">
                      {product.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-2 mt-auto">
                      <p className="text-2xl font-bold text-primary">
                        ${product.price}
                      </p>
                      <p className="text-xl font-bold text-muted-foreground line-through">
                        ${product.original_price}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddToCartWithToast(product)}
                      className="bg-primary text-primary-foreground font-bold text-lg px-6 py-2 rounded-xl shadow-md transition-transform hover:scale-105 mt-4"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))
              : !dealOfTheDay && (
                  <p className="text-center col-span-3 text-xl">
                    No deals available at the moment. Check back soon!
                  </p>
                )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Deals;
