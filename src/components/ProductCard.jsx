import {
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useMemo, useState } from "react";

function formatPrice(price, currency = "USD") {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
    }).format(price);
  } catch {
    return `${currency} ${price.toFixed(2)}`;
  }
}

export default function ProductCard({
  title,
  price,
  imageUrl,
  rating,
  onAddToCart,
  size = "medium",
  currency = "USD",
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const fallbackUrl = useMemo(
    () => "https://placehold.co/400x400?text=No+Image",
    []
  );

  const imageToUse = imgFailed ? fallbackUrl : imageUrl;
  const imgHeight = size === "small" ? 160 : 220;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ position: "relative" }}>
        {/* Using img element for reliable onError fallback */}
        <Box
          component="img"
          src={imageToUse}
          alt={title ? `${title} image` : "Product image"}
          onError={() => setImgFailed(true)}
          sx={{
            width: "100%",
            height: imgHeight,
            objectFit: "cover",
            display: "block",
            bgcolor: "action.hover",
          }}
        />
      </Box>

      <CardContent sx={{ p: size === "small" ? 1.5 : 2, flexGrow: 1 }}>
        <Stack spacing={1.25}>
          <Typography
            gutterBottom={false}
            sx={{
              fontSize: size === "small" ? 16 : 18,
              fontWeight: 800,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>

          <Stack direction="row" spacing={1.2} alignItems="center">
            <Rating value={rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {rating.toFixed(1)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              {formatPrice(price, currency)}
            </Typography>
          </Stack>

          <Button
            onClick={() => onAddToCart?.()}
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            sx={{
              mt: 0.5,
              borderRadius: 2.5,
              boxShadow: 0,
              textTransform: "none",
            }}
            fullWidth
          >
            Add to Cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

