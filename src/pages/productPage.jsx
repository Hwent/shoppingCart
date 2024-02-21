import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import localforage from "localforage";
import AddCartbtn from "../components/AddCartbtn";
import ProductQuantityController from "../components/ProductQuantityController";
import { Box, Typography, Chip, Rating } from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";

const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localforage.getItem("products").then((products) => {
      if (products) {
        const selectedProduct = products.find(
          (product) => product.id === parseInt(productId)
        );
        setProduct(selectedProduct);
        setLoading(false);
      } else {
        fetch(`https://fakestoreapi.com/products/${productId}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error: " + response.status);
            }
          })
          .then((data) => {
            setProduct(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      }
    });
  }, [productId]);
  return { product, loading };
};

export default function ProductPage() {
  const { productId } = useParams();
  const { product, loading } = useProduct(productId);

  // Quantity of product to cart
  const [amount, setAmount] = useState(1);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h4" component="div" gutterBottom>
        {product.title}
      </Typography>
      <Box
        component="img"
        src={product.image}
        alt={product.title}
        sx={{ maxWidth: 500, maxHeight: 500 }}
      />
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        sx={{ my: 3 }}
      >
        <Chip label={product.category} color="primary" />
        <Rating name="read-only" value={product.rating.rate} readOnly />
      </Box>
      <Typography variant="body1" gutterBottom>
        {product.description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        ${product.price}
      </Typography>
      <ProductQuantityController amount={amount} setAmount={setAmount} />
      <Box sx={{ mt: 2 }}>
        <AddCartbtn product={product} amount={amount} />
      </Box>
    </Box>
  );
}
