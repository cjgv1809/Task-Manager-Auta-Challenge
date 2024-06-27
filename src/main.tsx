import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SearchProvider } from "./context/SearchContext.tsx";
import { NotificationProvider } from "./context/NotificationContext.tsx";
import App from "./App.tsx";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    background: {
      default: "transparent",
      paper: "rgba(255, 255, 255, 0.1)",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "linear-gradient(to top, hsla(252, 89%, 70%, 1) 0%, hsla(260, 95%, 64%, 1) 100%);",
          minHeight: "100vh",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: "#000000",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: "#000000",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          "& .MuiButton-text": {
            color: "#000000",
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
      <SearchProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </SearchProvider>
    </React.StrictMode>
  </ThemeProvider>
);
