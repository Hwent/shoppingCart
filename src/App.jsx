import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorPage from "./pages/ErrorPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const [mode, setMode] = useState(false);
  return (
    <ThemeProvider theme={mode ? lightTheme : darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar mode={mode} setMode={setMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
