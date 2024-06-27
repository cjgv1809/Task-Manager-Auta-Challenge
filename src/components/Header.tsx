import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useResponsiveLayout } from "@/hooks/useResponsiveLayout";
import Search from "./Search";

const Header = () => {
  const theme = useTheme();
  const isMobile = useResponsiveLayout();

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: (theme) => theme.spacing(0, 2),
          maxWidth: theme.breakpoints.values.xl,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src="/logo-auta.webp"
            alt="Auta Logo"
            width="85"
            style={{ objectFit: "contain" }}
          />
        </Box>
        <Search />
        {!isMobile && (
          <IconButton>
            <Avatar alt="User" src="/avatar.png" />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
