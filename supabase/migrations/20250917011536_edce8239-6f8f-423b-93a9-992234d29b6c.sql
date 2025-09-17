-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  reviews INTEGER NOT NULL DEFAULT 0,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  features TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view products)
CREATE POLICY "Products are publicly readable" 
ON public.products 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to insert products (you can manage this later)
CREATE POLICY "Authenticated users can insert products" 
ON public.products 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Create policy for authenticated users to update products
CREATE POLICY "Authenticated users can update products" 
ON public.products 
FOR UPDATE 
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing product data
INSERT INTO public.products (name, description, price, original_price, image, category, rating, reviews, in_stock, features) VALUES
(
  'Premium Wireless Headphones',
  'Experience superior sound quality with our flagship noise-canceling headphones featuring 40-hour battery life and premium comfort.',
  299,
  399,
  '/src/assets/product-headphones.jpg',
  'Audio',
  5,
  248,
  true,
  ARRAY['Active Noise Cancellation', '40-hour battery life', 'Premium leather ear cups', 'High-resolution audio support', 'Quick charge (15 min = 3 hours)', 'Multi-device connectivity']
),
(
  'Smart Fitness Watch',
  'Track your health and fitness goals with advanced sensors, GPS, and a stunning AMOLED display that lasts for days.',
  249,
  329,
  '/src/assets/product-smartwatch.jpg',
  'Wearables',
  4,
  186,
  true,
  ARRAY['AMOLED display', 'Built-in GPS', 'Heart rate monitoring', 'Sleep tracking', 'Water resistant (50m)', '7-day battery life']
),
(
  'Ultra-Portable Laptop',
  'Powerful performance meets exceptional portability in this sleek laptop designed for professionals and creators.',
  1299,
  NULL,
  '/src/assets/product-laptop.jpg',
  'Computing',
  5,
  92,
  true,
  ARRAY['Intel Core i7 processor', '16GB RAM, 512GB SSD', '14-inch 4K display', 'All-day battery life', 'Thunderbolt 4 ports', 'Lightweight design (2.5 lbs)']
),
(
  '5G Smartphone Pro',
  'Capture life''s moments with our triple-camera system and enjoy blazing-fast 5G connectivity in a premium design.',
  899,
  999,
  '/src/assets/product-smartphone.jpg',
  'Mobile',
  4,
  312,
  true,
  ARRAY['Triple camera system', '5G connectivity', '6.7-inch OLED display', 'All-day battery life', 'Wireless charging', 'Water resistant (IP68)']
),
(
  'Gaming Mouse Pro',
  'Precision gaming mouse with customizable RGB lighting, ultra-high DPI sensor, and ergonomic design for marathon sessions.',
  79,
  NULL,
  '/src/assets/product-mouse.jpg',
  'Gaming',
  5,
  156,
  true,
  ARRAY['25,000 DPI sensor', 'Customizable RGB lighting', '11 programmable buttons', 'Ultra-lightweight design', 'Wireless/wired modes', '100-hour battery life']
),
(
  'Mechanical Keyboard',
  'Premium mechanical keyboard with tactile switches, customizable backlighting, and wireless connectivity.',
  149,
  NULL,
  '/src/assets/product-keyboard.jpg',
  'Accessories',
  4,
  203,
  true,
  ARRAY['Mechanical switches', 'Wireless connectivity', 'RGB backlighting', 'Aluminum construction', 'Hot-swappable keys', '80-hour battery life']
),
(
  'Professional Tablet',
  'Creative powerhouse tablet with stylus support, stunning display, and desktop-class performance for professionals.',
  649,
  749,
  '/src/assets/product-tablet.jpg',
  'Computing',
  4,
  128,
  false,
  ARRAY['12.9-inch Liquid Retina display', 'Apple M2 chip', 'Apple Pencil support', 'All-day battery life', 'USB-C connectivity', 'Face ID security']
),
(
  'Bluetooth Speaker',
  'Premium portable speaker with 360-degree sound, waterproof design, and smart assistant integration.',
  199,
  NULL,
  '/src/assets/product-speaker.jpg',
  'Audio',
  4,
  174,
  true,
  ARRAY['360-degree sound', 'Waterproof design (IPX7)', '20-hour battery life', 'Smart assistant integration', 'Premium materials', 'Multi-room audio support']
);