import { mockProducts } from "./mockProducts";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API call used during development.
// Uses Vite-served `/products.json` so we still demonstrate an HTTP fetch.
export async function fetchProducts() {
  await delay(350);
  try {
    const res = await fetch("/products.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data?.products) ? data.products : [];
  } catch {
    // Fallback to in-code mock to keep the UI functional.
    return mockProducts.products;
  }
}

