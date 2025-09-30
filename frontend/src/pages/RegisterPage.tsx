import { Container, Typography, Box } from "@mui/material";
import { RegisterForm } from "../components";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();

  const handleRegister = async (data: { username: string; email: string; password: string }) => {
    try {
      await register(data.username, data.email, data.password);
      alert("Registration successful!");
    } catch {
      alert("Error during registration");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <RegisterForm onSubmit={handleRegister} />
      </Box>
    </Container>
  );
}