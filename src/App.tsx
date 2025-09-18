import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Deals from "./pages/Deals";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Store from "./pages/Store";
import NotFound from "./pages/NotFound";
import { Product } from "@/types/Product";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  username: string | null;
  avatar_url: string | null;
  school: string | null;
}

const App = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username, avatar_url, school")
          .eq("id", session.user.id)
          .single();

        if (data) {
          setProfile(data);
        } else if (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setProfile(null);
      }
    };
    getProfile();
  }, [session]);

  useEffect(() => {
    const loadCart = async () => {
      if (session) {
        const { data, error } = await supabase
          .from("user_carts")
          .select("cart_data")
          .eq("user_id", session.user.id)
          .single();

        if (data && data.cart_data) {
          setCart(data.cart_data);
        } else if (error && error.code !== "PGRST116") {
          console.error("Error fetching cart:", error);
        }
      } else {
        setCart([]);
      }
    };
    loadCart();
  }, [session]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const saveCart = async () => {
      if (session) {
        const { error } = await supabase
          .from("user_carts")
          .upsert(
            { user_id: session.user.id, cart_data: cart },
            { onConflict: "user_id" }
          );

        if (error) {
          console.error("Error saving cart:", error);
        }
      }
    };

    const timerId = setTimeout(() => {
      saveCart();
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [cart, session]);

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }

    const updatedCart: Product[] = [];
    const productMap: { [key: string]: number } = {};

    cart.forEach((p) => {
      if (p.id === productId) {
        productMap[p.id] = (productMap[p.id] || 0) + 1;
      }
    });

    const currentQuantity = productMap[productId] || 0;
    const difference = newQuantity - currentQuantity;

    if (difference > 0) {
      const productToAdd = cart.find((p) => p.id === productId);
      if (productToAdd) {
        const itemsToAdd = Array(difference).fill(productToAdd);
        setCart((prevCart) => [...prevCart, ...itemsToAdd]);
      }
    } else if (difference < 0) {
      let itemsToRemove = -difference;
      const newCart = [...cart]
        .reverse()
        .filter((p) => {
          if (p.id === productId && itemsToRemove > 0) {
            itemsToRemove--;
            return false;
          }
          return true;
        })
        .reverse();
      setCart(newCart);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Index
                cart={cart}
                onAddToCart={handleAddToCart}
                session={session}
                profile={profile}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <Menu
                cart={cart}
                onAddToCart={handleAddToCart}
                session={session}
                profile={profile}
              />
            }
          />
          <Route
            path="/deals"
            element={
              <Deals
                cart={cart}
                onAddToCart={handleAddToCart}
                session={session}
                profile={profile}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveFromCart}
                onAddToCart={handleAddToCart}
                session={session}
                profile={profile}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile session={session} />} />
          <Route
            path="/store"
            element={<Store session={session} profile={profile} />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
