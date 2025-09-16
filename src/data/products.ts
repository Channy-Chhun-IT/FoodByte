import { Product } from '@/types/Product';

// Import product images
import productHeadphones from '@/assets/product-headphones.jpg';
import productSmartwatch from '@/assets/product-smartwatch.jpg';
import productLaptop from '@/assets/product-laptop.jpg';
import productSmartphone from '@/assets/product-smartphone.jpg';
import productMouse from '@/assets/product-mouse.jpg';
import productKeyboard from '@/assets/product-keyboard.jpg';
import productTablet from '@/assets/product-tablet.jpg';
import productSpeaker from '@/assets/product-speaker.jpg';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Experience superior sound quality with our flagship noise-canceling headphones featuring 40-hour battery life and premium comfort.",
    price: 299,
    originalPrice: 399,
    image: productHeadphones,
    category: "Audio",
    rating: 5,
    reviews: 248,
    inStock: true,
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "Premium leather ear cups",
      "High-resolution audio support",
      "Quick charge (15 min = 3 hours)",
      "Multi-device connectivity"
    ]
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your health and fitness goals with advanced sensors, GPS, and a stunning AMOLED display that lasts for days.",
    price: 249,
    originalPrice: 329,
    image: productSmartwatch,
    category: "Wearables",
    rating: 4,
    reviews: 186,
    inStock: true,
    features: [
      "AMOLED display",
      "Built-in GPS",
      "Heart rate monitoring",
      "Sleep tracking",
      "Water resistant (50m)",
      "7-day battery life"
    ]
  },
  {
    id: 3,
    name: "Ultra-Portable Laptop",
    description: "Powerful performance meets exceptional portability in this sleek laptop designed for professionals and creators.",
    price: 1299,
    image: productLaptop,
    category: "Computing",
    rating: 5,
    reviews: 92,
    inStock: true,
    features: [
      "Intel Core i7 processor",
      "16GB RAM, 512GB SSD",
      "14-inch 4K display",
      "All-day battery life",
      "Thunderbolt 4 ports",
      "Lightweight design (2.5 lbs)"
    ]
  },
  {
    id: 4,
    name: "5G Smartphone Pro",
    description: "Capture life's moments with our triple-camera system and enjoy blazing-fast 5G connectivity in a premium design.",
    price: 899,
    originalPrice: 999,
    image: productSmartphone,
    category: "Mobile",
    rating: 4,
    reviews: 312,
    inStock: true,
    features: [
      "Triple camera system",
      "5G connectivity",
      "6.7-inch OLED display",
      "All-day battery life",
      "Wireless charging",
      "Water resistant (IP68)"
    ]
  },
  {
    id: 5,
    name: "Gaming Mouse Pro",
    description: "Precision gaming mouse with customizable RGB lighting, ultra-high DPI sensor, and ergonomic design for marathon sessions.",
    price: 79,
    image: productMouse,
    category: "Gaming",
    rating: 5,
    reviews: 156,
    inStock: true,
    features: [
      "25,000 DPI sensor",
      "Customizable RGB lighting",
      "11 programmable buttons",
      "Ultra-lightweight design",
      "Wireless/wired modes",
      "100-hour battery life"
    ]
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    description: "Premium mechanical keyboard with tactile switches, customizable backlighting, and wireless connectivity.",
    price: 149,
    image: productKeyboard,
    category: "Accessories",
    rating: 4,
    reviews: 203,
    inStock: true,
    features: [
      "Mechanical switches",
      "Wireless connectivity",
      "RGB backlighting",
      "Aluminum construction",
      "Hot-swappable keys",
      "80-hour battery life"
    ]
  },
  {
    id: 7,
    name: "Professional Tablet",
    description: "Creative powerhouse tablet with stylus support, stunning display, and desktop-class performance for professionals.",
    price: 649,
    originalPrice: 749,
    image: productTablet,
    category: "Computing",
    rating: 4,
    reviews: 128,
    inStock: false,
    features: [
      "12.9-inch Liquid Retina display",
      "Apple M2 chip",
      "Apple Pencil support",
      "All-day battery life",
      "USB-C connectivity",
      "Face ID security"
    ]
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    description: "Premium portable speaker with 360-degree sound, waterproof design, and smart assistant integration.",
    price: 199,
    image: productSpeaker,
    category: "Audio",
    rating: 4,
    reviews: 174,
    inStock: true,
    features: [
      "360-degree sound",
      "Waterproof design (IPX7)",
      "20-hour battery life",
      "Smart assistant integration",
      "Premium materials",
      "Multi-room audio support"
    ]
  }
];