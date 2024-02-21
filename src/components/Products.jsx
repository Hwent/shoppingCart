import { useState, useEffect } from "react";
import localforage from "localforage";
import ProductCard from "./ProductCard";
import Masonry from "@mui/lab/Masonry";

const useFakeProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localforage.getItem("products").then((savedProducts) => {
      if (savedProducts) {
        setProducts(savedProducts);
        setLoading(false);
      } else {
        fetch("https://fakestoreapi.com/products?limit=16")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error: " + response.status);
            }
          })
          .then((data) => {
            setProducts(data);
            localforage.setItem("products", data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      }
    });
  }, []);

  return { products, loading, error };
};

export default function Products() {
  const { products, loading, error } = useFakeProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Masonry columns={4} spacing={2}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Masonry>
  );
}
