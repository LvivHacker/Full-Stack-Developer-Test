// src/pages/CartPage.tsx
import { Container, Typography, List, ListItem, IconButton, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item) => (
              <ListItem key={item.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ flex: 1 }}>
                  {item.name} — ${item.price} ×
                </Typography>
                <TextField
                  type="number"
                  size="small"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  sx={{ width: 60, mr: 2 }}
                />
                <Typography sx={{ mr: 2 }}>${item.price * item.quantity}</Typography>
                <IconButton onClick={() => removeFromCart(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ${total}
          </Typography>
          <Button variant="outlined" color="error" onClick={clearCart} sx={{ mt: 2 }}>
            Clear Cart
          </Button>
        </>
      )}
    </Container>
  );
}