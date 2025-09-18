import React from "react";
import { Product } from "@/types/Product";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import RecommendedProducts from "@/components/RecommendedProducts";

interface Profile {
  username: string | null;
}

interface CartProps {
  cart: Product[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  session: Session | null;
  profile: Profile | null;
}

const Cart: React.FC<CartProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onAddToCart,
  session,
  profile,
}) => {
  const getAggregatedCart = () => {
    const aggregated: {
      [key: string]: { product: Product; quantity: number };
    } = {};
    cart.forEach((product) => {
      if (aggregated[product.id]) {
        aggregated[product.id].quantity += 1;
      } else {
        aggregated[product.id] = { product, quantity: 1 };
      }
    });
    return Object.values(aggregated);
  };

  const aggregatedCart = getAggregatedCart();
  const subtotal = aggregatedCart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Header cartItemCount={cart.length} session={session} profile={profile} />
      <main className="flex-grow">
        <div className="container mx-auto py-16">
          <h1 className="text-5xl font-heading text-center mb-12 text-foreground">
            Your Cart
          </h1>

          {aggregatedCart.length === 0 ? (
            <div className="text-center">
              <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button asChild>
                <Link to="/menu">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {aggregatedCart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center bg-white p-4 rounded-lg shadow-md border-2 border-foreground"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-md mr-4"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          onUpdateQuantity(product.id, quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-bold w-8 text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          onUpdateQuantity(product.id, quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => onRemoveFromCart(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {/* Recommended Products Section */}
                <RecommendedProducts
                  onAddToCart={onAddToCart}
                  currentCartIds={aggregatedCart.map((item) => item.product.id)}
                />
              </div>

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-foreground h-fit">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full mt-6">Proceed to Checkout</Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
