import { useState } from "react";
import localforage from "localforage";
import { Button } from "@mui/material";

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
    window.dispatchEvent(new Event("cartUpdated"));
    setLoading(false);
  };

  return (
    <Button variant="contained" onClick={handleClick} disabled={loading}>
      Add to Cart
    </Button>
  );
}
