import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ProductCard from "../components/ProductCard";
import SearchFilterBar from "../components/SearchFilterBar";
import { fetchProducts } from "../api/productsApi";
import { useCart } from "../state/cartContext";

export default function ProductListing() {
  const { addItem } = useCart();

  const isNarrow = useMediaQuery("(max-width:600px)");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchProducts();
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setError("Failed to load products. Please retry.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    const preferredOrder = ["Shoes", "Clothing", "Accessories"];
    unique.sort((a, b) => {
      const ai = preferredOrder.indexOf(a);
      const bi = preferredOrder.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });

    return [
      { value: "All", label: "All" },
      ...unique.map((c) => ({ value: c, label: c })),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return products.filter((p) => {
      const matchesCategory = category === "All" ? true : p.category === category;
      const matchesQuery =
        q.length === 0 ? true : p.title.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, searchText, category]);

  return (
    <Box sx={{ py: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        <Stack spacing={2.2}>
          <SearchFilterBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
            category={category}
            onCategoryChange={setCategory}
            categories={categories}
            resultCount={filteredProducts.length}
          />

          {error ? (
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                p: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                {error}
              </Typography>
            </Box>
          ) : null}

          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Products
          </Typography>

          {loading ? (
            <Grid container spacing={2}>
              {Array.from({ length: 8 }).map((_, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                  <Skeleton
                    variant="rectangular"
                    height={isNarrow ? 380 : 390}
                    sx={{ borderRadius: 3 }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : filteredProducts.length === 0 ? (
            <Box sx={{ py: 6 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                No matches found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try changing your search or category filter.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={2}>
              {filteredProducts.map((p) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={p.id}
                  sx={{ display: "flex" }}
                >
                  <ProductCard
                    title={p.title}
                    price={p.price}
                    imageUrl={p.imageUrl}
                    rating={p.rating}
                    size={isNarrow ? "small" : "medium"}
                    onAddToCart={() => addItem(p)}
                    currency={p.currency}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

