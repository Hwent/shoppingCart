import CartItem from "../components/CartItem";
import { useState, useEffect, useMemo } from "react";
import localforage from "localforage";
import { List, Button, Typography, CircularProgress } from "@mui/material";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    localforage
      .getItem("cart")
      .then((cart) => {
        setCart(cart || []);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleClear = async () => {
    setLoading(true);
    try {
      await localforage.removeItem("cart");
      setCart([]);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    );
  }, [cart]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <Typography variant="h4">Your cart is empty</Typography>
      ) : (
        <List>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </List>
      )}
      <Typography variant="h6">
        Total Price: ${totalPrice.toFixed(2)}
      </Typography>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClear}
        disabled={loading}
      >
        Clear
      </Button>
    </div>
  );
}
