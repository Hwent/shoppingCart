import { useState, useEffect } from "react";
import localforage from "localforage";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

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
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.amount,
    0
  );

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <List>
          {cart.map((product) => (
            <ListItem key={product.id}>
              <ListItemAvatar>
                <Avatar alt={product.title} src={product.image} />
              </ListItemAvatar>
              <ListItemText
                primary={product.title}
                secondary={`Price: $${product.price}`}
              />
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                gap={1}
                flex={1}
              >
                <IconButton
                  size="small"
                  onClick={() => {
                    if (product.amount > 1) {
                      const newCart = cart.map((p) =>
                        p.id === product.id ? { ...p, amount: p.amount - 1 } : p
                      );
                      localforage.setItem("cart", newCart);
                      setCart(newCart);
                    }
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                {product.amount}
                <IconButton
                  size="small"
                  onClick={() => {
                    const newCart = cart.map((p) =>
                      p.id === product.id ? { ...p, amount: p.amount + 1 } : p
                    );
                    localforage.setItem("cart", newCart);
                    setCart(newCart);
                  }}
                >
                  <AddIcon />
                </IconButton>
                <NavLink
                  to={`/product/${product.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  View
                </NavLink>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={async () => {
                    const newCart = cart.filter((p) => p.id !== product.id);
                    await localforage.setItem("cart", newCart);
                    setCart(newCart);
                    window.dispatchEvent(new Event("cartUpdated"));
                  }}
                >
                  Remove
                </Button>
              </Box>
            </ListItem>
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
