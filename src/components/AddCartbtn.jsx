import { useState } from "react";
import localforage from "localforage";

export default function AddCartbtn({ product, amount = 1 }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const cart = (await localforage.getItem("cart")) || [];
    const productInCart = cart.find((p) => p.id === product.id);

    if (productInCart) {
      productInCart.amount += amount;
    } else {
      cart.push({ ...product, amount });
    }

    await localforage.setItem("cart", cart);
    setLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      Add to Cart
    </button>
  );
}
