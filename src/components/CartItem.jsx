import React, { memo } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import localforage from "localforage";

const CartItem = memo(({ product, cart, setCart }) => {
  const handleRemove = async () => {
    const newCart = cart.filter((p) => p.id !== product.id);
    await localforage.setItem("cart", newCart);
    setCart(newCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleIncrease = async () => {
    const newCart = cart.map((p) =>
      p.id === product.id ? { ...p, amount: p.amount + 1 } : p
    );
    await localforage.setItem("cart", newCart);
    setCart(newCart);
  };

  const handleDecrease = async () => {
    if (product.amount > 1) {
      const newCart = cart.map((p) =>
        p.id === product.id ? { ...p, amount: p.amount - 1 } : p
      );
      await localforage.setItem("cart", newCart);
      setCart(newCart);
    }
  };

  return (
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
        <IconButton size="small" onClick={handleDecrease}>
          <RemoveIcon />
        </IconButton>
        {product.amount}
        <IconButton size="small" onClick={handleIncrease}>
          <AddIcon />
        </IconButton>
        <NavLink
          to={`/product/${product.id}`}
          style={{ color: "inherit", textDecoration: "none" }}
        >
          View
        </NavLink>
        <Button variant="contained" color="secondary" onClick={handleRemove}>
          Remove
        </Button>
      </Box>
    </ListItem>
  );
});

export default CartItem;
