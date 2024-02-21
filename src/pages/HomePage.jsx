import React, { useState, useEffect } from "react";
import Masonry from "@mui/lab/Masonry";

const useImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.unsplash.com/collections/11387513/photos", {
      headers: {
        Authorization: "Client-ID a2FGUrM1KGYwmWw-nH83Fe0sOTiff5Vnbdy-FCd-6t4",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  return { images, loading };
};

export default function HomePage() {
  const { images, loading } = useImages();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Welcome to the Shopping Cart</h1>
      <p>
        This is a simple shopping cart application built with React and Material
        UI. You can view products, add them to your cart, and view your cart
        items.
      </p>
      <Masonry columns={3} spacing={2}>
        {images.map((image) => (
          <img
            src={image.urls.small}
            alt={image.alt_description}
            key={image.id}
          />
        ))}
      </Masonry>
    </>
  );
}
