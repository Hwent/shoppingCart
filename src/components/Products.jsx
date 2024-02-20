import { useState, useEffect } from "react";
import localForage from "localforage";
import ProductCard from "./ProductCard";
const useFakeProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    localForage.getItem("products").then((savedProducts) => {
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
            localForage.setItem("products", data);
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
    <div>
      <ul>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
