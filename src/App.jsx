import { useMemo, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import ProductListing from "./pages/ProductListing";
import { CartProvider, useCart } from "./state/cartContext";
import { getAppTheme } from "./theme";

function AppShell({ mode, setMode, cartOpen, setCartOpen }) {
  const { itemCount } = useCart();
  return (
    <Box
      sx={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header
        mode={mode}
        onToggleMode={() =>
          setMode((m) => (m === "dark" ? "light" : "dark"))
        }
        cartCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
      />
      <ProductListing />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  );
}

export default function App() {
  const [mode, setMode] = useState(() => {
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });
  const [cartOpen, setCartOpen] = useState(false);

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <AppShell
          mode={mode}
          setMode={setMode}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
        />
      </CartProvider>
    </ThemeProvider>
  );
}
