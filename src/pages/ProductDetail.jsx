import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';


export default function ProductDetail() {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  
  const handleDecrease = () => {
    if (quantityInCart === 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, -1);
    }
  };
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantityInCart, setQuantityInCart] = useState(0);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  useEffect(() => {
    const item = cart.find(p => p.id === product?.id);
    setQuantityInCart(item?.quantity || 0);
  }, [cart, product]);

  const increaseQty = () => updateQuantity(product.id, 1);
  const decreaseQty = () => updateQuantity(product.id, -1);

  if (!product) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[400px] object-contain border p-4 rounded"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-green-600 font-semibold">${product.price}</p>
          <p className="text-yellow-500">⭐ {product.rating?.rate} ({product.rating?.count} reviews)</p>
          <p className="text-gray-700">{product.description}</p>

          {/* Add to Cart or Quantity Controls */}
          {quantityInCart === 0 ? (
  <button
    onClick={() => addToCart(product)}
    className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    Add to Cart
  </button>
) : (
  <div className="mt-4">
    <p className="text-green-700 text-sm mb-2">✔ Added to cart</p>
    <div className="flex items-center gap-2">
      <button
        onClick={handleDecrease}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        −
      </button>
      <span className="font-semibold">{quantityInCart}</span>
      <button
        onClick={() => updateQuantity(product.id, 1)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        +
      </button>
      <Link
        to="/cart"
        className="ml-4 text-blue-600 underline text-sm"
      >
        Go to Cart
      </Link>
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}
