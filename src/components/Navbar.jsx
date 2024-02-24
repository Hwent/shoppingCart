import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  InputBase,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "../assets/search.svg";
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
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    localforage.getItem("products").then((products) => {
      setProducts(products || []);
    });
  }, []);
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <img className="logo" src={logo} alt="logo" />
          <img className="logo" src={SearchIcon} alt="logo" />
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Box component="section">
              {filteredProducts.slice(0, 5).map((product) => (
                <NavLink
                  key={product.id}
                  to={`/product/${product.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <p>{product.title}</p>
                </NavLink>
              ))}
            </Box>
          )}
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
