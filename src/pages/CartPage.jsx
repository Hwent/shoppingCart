import { useState, useEffect } from "react";
import localforage from "localforage";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localforage.getItem("cart").then((cart) => {
      setCart(cart || []);
    });
  }, []);

  const handleClear = async () => {
    setLoading(true);
    await localforage.removeItem("cart");
    setCart([]);
    setLoading(false);
  };

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.title} - Price: ${product.price} - Quantity:{" "}
              {product.amount}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleClear} disabled={loading}>
        Clear
      </button>
    </div>
  );
}
