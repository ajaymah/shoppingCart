import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Header({ mode, onToggleMode, cartCount, onOpenCart }) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ gap: 2, justifyContent: "space-between" }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            R
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Retail Web
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1.25} alignItems="center">
          <IconButton
            onClick={onToggleMode}
            size="large"
            aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <IconButton
            onClick={onOpenCart}
            size="large"
            aria-label="Open cart"
          >
            <Badge badgeContent={cartCount} color="primary" overlap="circular">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

