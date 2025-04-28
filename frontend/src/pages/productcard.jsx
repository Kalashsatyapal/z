import { FaPlus } from "react-icons/fa"; // Import the shopping cart icon

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-64">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-indigo-700">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="mt-2 text-indigo-500 font-semibold">
          ${product.price.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-12 h-12 bg-purple-600 text-indigo font-semibold rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center"
        >
          <FaPlus className="text-indigo" /> {/* Icon with gold color */}
        </button>
      </div>
    </div>
  );
}
