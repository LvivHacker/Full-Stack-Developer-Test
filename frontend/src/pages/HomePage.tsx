import { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { products, Product } from "../api/products";
import { ProductCard } from "../components";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };
  
  const { addToCart } = useCart()

  return (
     <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {products.map((product) => (
          <Box key={product.id} sx={{ flex: "1 1 300px", maxWidth: "300px" }}>
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}