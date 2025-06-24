import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p>${item.price.toFixed(2)} x {item.quantity}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-gray-200">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-gray-200">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-4">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
}
