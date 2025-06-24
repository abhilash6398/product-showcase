import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();

  const itemInCart = cart.find((p) => p.id === product.id);
  const quantityInCart = itemInCart?.quantity || 0;

  const handleDecrease = () => {
    if (quantityInCart === 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, -1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(product.id, 1);
  };

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition hover:ring-1 hover:ring-blue-300 flex flex-col justify-between">
      {/* Clickable image & info */}
      <Link to={`/product/${product.id}`} aria-label={`View ${product.title}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 object-contain mx-auto"
        />
        <h2 className="text-lg font-semibold mt-3 truncate">{product.title}</h2>
        <p className="text-green-600 font-medium mt-1">${product.price}</p>
        <p className="text-yellow-500 text-sm">
          ⭐ {product.rating?.rate} ({product.rating?.count})
        </p>
      </Link>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-2">
        <Link
          to={`/product/${product.id}`}
          className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          View Details
        </Link>

        {quantityInCart === 0 ? (
          <button
            onClick={() => addToCart(product)}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Add to Cart
          </button>
        ) : (
          <div className="w-full flex items-center justify-between gap-2 bg-green-50 border border-green-300 rounded px-2 py-1 text-sm">
            <button
              onClick={handleDecrease}
              className="px-2 py-1 bg-green-200 rounded hover:bg-green-300"
            >
              −
            </button>
            <span className="font-semibold">{quantityInCart}</span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 bg-green-200 rounded hover:bg-green-300"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
