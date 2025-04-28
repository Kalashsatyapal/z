import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTrash,
  FaShoppingBag,
} from "react-icons/fa";
import ProductCard from "./productcard";

// 👇 Define your API URL here
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return savedCart || [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">
      {/* Topbar */}
      <header className="w-full flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md shadow-lg">
        <h1 className="text-3xl font-extrabold text-indigo-700">Zmart</h1>

        <div className="relative">
          <button
            className="flex items-center space-x-2 text-lg font-semibold"
            onClick={() => setCartOpen((prev) => !prev)}
          >
            <FaShoppingCart className="text-indigo-700" size={24} />
            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </button>

          {/* Cart Dropdown */}
          {cartOpen && (
            <div className="absolute right-0 mt-2 w-[24rem] bg-white shadow-lg rounded-lg p-4 z-10">
              <h3 className="font-semibold text-gray-700 mb-2">Your Cart</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center py-2"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-500">Price: ${item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="px-3 py-1 bg-indigo-500 text-indigo rounded-full"
                          >
                            <FaMinus size={16} />
                          </button>
                          {/* Quantity display with some styling */}
                          <span className="text-lg font-semibold text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 bg-indigo-500 text-indigo rounded-full"
                          >
                            <FaPlus size={16} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-600 hover:text-red-800"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Buy Now Button */}
                  <button
                    className="mt-4 w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-indigo font-semibold py-2 rounded-lg transition duration-300"
                    onClick={() => alert("Thank you for your purchase!")}
                  >
                    <FaShoppingBag />
                    <span>Buy Now</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <Link to="/admin">
          <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
            Admin Panel
          </button>
        </Link>
      </header>

      {/* Product Listing Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                imageUrl: `${BACKEND_URL}${product.imageUrl}`,
              }}
              onAddToCart={() => addToCart(product)}
            />
          ))
        ) : (
          <p className="text-white text-lg col-span-full text-center">
            Loading products...
          </p>
        )}
      </div>
    </div>
  );
}
