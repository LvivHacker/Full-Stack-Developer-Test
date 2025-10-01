import { Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import { Product } from "../api/products";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Card sx={{ maxWidth: 300, display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="160"
        image={product.image || "https://via.placeholder.com/300x160"}
        alt={product.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.description || "No description available"}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={() => addToCart(product)}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}