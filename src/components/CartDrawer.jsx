import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMemo, useState } from "react";
import { useCart } from "../state/cartContext";

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

function QuantityStepper({ quantity, onChange }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton
        size="small"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        aria-label="Decrease quantity"
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography variant="body2" sx={{ minWidth: 18, textAlign: "center" }}>
        {quantity}
      </Typography>
      <IconButton
        size="small"
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}

export default function CartDrawer({ open, onClose }) {
  const { items, itemCount, subtotal, setQuantity, removeItem, clearCart } =
    useCart();
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const fallbackUrl = useMemo(
    () => "https://placehold.co/120x120?text=No+Image",
    []
  );

  const currency = "USD";

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 420 },
          maxWidth: "100%",
          borderLeft: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      <Box sx={{ p: 2.25, height: "100%", overflow: "auto" }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Cart {itemCount ? `(${itemCount})` : ""}
            </Typography>
            <Button onClick={onClose} size="small">
              Close
            </Button>
          </Stack>

          <Divider />

          {items.length === 0 ? (
            <Box sx={{ py: 5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Add some products to see them here.
              </Typography>
            </Box>
          ) : (
            <Stack spacing={1.5}>
              {items.map((item) => (
                <CartLineItem
                  key={item.product.id}
                  item={item}
                  fallbackUrl={fallbackUrl}
                  onSetQuantity={(nextQty) =>
                    setQuantity(item.product.id, nextQty)
                  }
                  onRemove={() => removeItem(item.product.id)}
                  currency={currency}
                />
              ))}
            </Stack>
          )}

          <Divider />

          <Stack spacing={1.25}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Total
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 1000 }}>
                {formatPrice(subtotal, currency)}
              </Typography>
            </Stack>

            {checkoutMessage ? (
              <Typography
                variant="body2"
                sx={{ color: "primary.main", fontWeight: 800 }}
              >
                {checkoutMessage}
              </Typography>
            ) : null}

            <Button
              variant="contained"
              size="large"
              disabled={items.length === 0}
              onClick={() => {
                // Placeholder UX for this challenge.
                setCheckoutMessage("Checkout is a demo in this sample UI.");
                clearCart();
              }}
              sx={{
                borderRadius: 2.5,
                textTransform: "none",
                boxShadow: 0,
              }}
            >
              Checkout
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
}

function CartLineItem({
  item,
  onSetQuantity,
  onRemove,
  fallbackUrl,
  currency,
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const imgSrc = imgFailed ? fallbackUrl : item.product.imageUrl;

  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="center"
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: 1.25,
        bgcolor: "background.paper",
      }}
    >
      <Box
        component="img"
        src={imgSrc}
        alt={item.product.title ? `${item.product.title} thumbnail` : "Item"}
        onError={() => setImgFailed(true)}
        sx={{
          width: 72,
          height: 72,
          borderRadius: 2,
          objectFit: "cover",
          bgcolor: "action.hover",
          flex: "0 0 auto",
        }}
      />

      <Stack sx={{ flexGrow: 1 }} spacing={0.6}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 900, lineHeight: 1.2 }}
        >
          {item.product.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {formatPrice(item.product.price, currency)} each
        </Typography>

        <QuantityStepper quantity={item.quantity} onChange={onSetQuantity} />
      </Stack>

      <Stack alignItems="flex-end" spacing={0.75}>
        <Typography variant="subtitle2" sx={{ fontWeight: 1000 }}>
          {formatPrice(item.product.price * item.quantity, currency)}
        </Typography>

        <IconButton onClick={onRemove} aria-label="Remove item" size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Stack>
  );
}

