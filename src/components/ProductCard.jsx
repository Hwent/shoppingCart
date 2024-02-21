import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddCartbtn from "./AddCartbtn";

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <Link to={`/product/${product.id}`}>
        <CardMedia
          component="img"
          sx={{ aspectRatio: "auto" }}
          image={product.image}
          alt={product.name}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
        <AddCartbtn product={product} />
      </CardContent>
    </Card>
  );
}
