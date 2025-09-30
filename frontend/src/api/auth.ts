// src/api/auth.ts

interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

export async function login(username: string, password: string): Promise<User> {
  // Простая проверка — один тестовый юзер
  if (username === "test" && password === "1234") {
    return {
      id: 1,
      username: "test",
      email: "test@example.com",
      token: "fake-jwt-token"
    };
  }
  throw new Error("Invalid credentials");
}

export async function register(username: string, email: string, password: string): Promise<User> {
  // В реальности — POST на backend
  return {
    id: Date.now(),
    username,
    email,
    token: "fake-jwt-token"
  };
}