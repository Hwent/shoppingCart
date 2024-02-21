import { AppBar, Toolbar, Box, IconButton, Badge } from "@mui/material";
import { NavLink } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import localforage from "localforage";
import { useState, useEffect } from "react";
import logo from "../assets/shopping.svg";

const useCartItems = () => {
  const [cartItems, setCartItems] = useState(0);
  const updateCartItems = () => {
    localforage.getItem("cart").then((cart) => {
      setCartItems(cart ? cart.length : 0);
    });
  };
  useEffect(() => {
    updateCartItems();
    window.addEventListener("cartUpdated", updateCartItems);
    return () => {
      window.removeEventListener("cartUpdated", updateCartItems);
    };
  }, []);
  return cartItems;
};

export default function Navbar({ mode, setMode }) {
  const cartItems = useCartItems();
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <img className="logo" src={logo} alt="logo" />
        </Box>

        <NavLink
          to="/"
          style={{
            color: "inherit",
            textDecoration: "inherit",
            marginRight: "15px",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          style={{
            color: "inherit",
            textDecoration: "inherit",
            marginRight: "15px",
          }}
        >
          Shop
        </NavLink>
        <IconButton color="inherit" component={NavLink} to="/Cart">
          <Badge badgeContent={cartItems} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={() => setMode(!mode)}>
          {mode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
