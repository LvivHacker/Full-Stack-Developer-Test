// src/api/auth.ts

export async function login(username: string, password: string) {

  const response = await fetch("http://localhost:5108/api/auth/login", {
    method: "POST",
    headers: { 'Content-Type': "application/json"},
    body: JSON.stringify({ username, password}),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Login failed");
  }
  return response.json();
}

export async function register(username: string, email: string, password: string) {

  const response = await fetch("http://localhost:5108/api/auth/register", {
    method: "POST",
    headers: { 'Content-Type': "application/json"},
    body: JSON.stringify({ username, email, password}),
  });
  if (!response.ok) {
    const message = await response.text();
    console.log(message)
    throw new Error(message || "Registration failed");
  }
  return response.json();
}