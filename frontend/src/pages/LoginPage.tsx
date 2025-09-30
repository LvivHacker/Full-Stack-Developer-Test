import { Container, Typography, Box } from "@mui/material";
import { LoginForm } from "../components";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      await login(data.username, data.password);
      alert("Login successful!");
    } catch {
      alert("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <LoginForm onSubmit={handleLogin} />
      </Box>
    </Container>
  );
}