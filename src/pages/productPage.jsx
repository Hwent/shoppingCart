import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import localforage from "localforage";
import AddCartbtn from "../components/AddCartbtn";
import ProductQuantityController from "../components/ProductQuantityController";
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

  //Qunatity of product to cart
  const [amount, setAmount] = useState(1);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <ProductQuantityController amount={amount} setAmount={setAmount} />
      <AddCartbtn product={product} amount={amount} />
    </div>
  );
}
