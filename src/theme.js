import { createTheme } from "@mui/material/styles";

const fontFamily =
  "system-ui, 'Segoe UI', Roboto, sans-serif, 'Helvetica Neue', Arial";

export function getAppTheme(mode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#aa3bff",
      },
      background: {
        default: mode === "dark" ? "#16171d" : "#ffffff",
        paper: mode === "dark" ? "#1f2028" : "#ffffff",
      },
    },
    typography: {
      fontFamily,
      h6: {
        fontWeight: 700,
      },
    },
    shape: {
      borderRadius: 14,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 14,
          },
        },
      },
    },
  });
}

