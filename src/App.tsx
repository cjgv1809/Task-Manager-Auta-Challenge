import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  styled,
  alpha,
  InputBase,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Avatar,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import type { Severity } from "./types";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Notification from "./components/Notification";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: theme.breakpoints.down("sm") ? "50%" : "30%",
  maxWidth: 400,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const App: React.FC = () => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info" as Severity,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNotification = (message: string, severity: Severity) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Root>
      <CssBaseline />
      <AppBar position="static">
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
          {!isMobile && (
            <Tooltip title="Perfil" arrow placement="top-start">
              <IconButton>
                <Avatar alt="User" src="/user.png" />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Content>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            fontWeight={700}
            gutterBottom
            marginTop={4}
          >
            Gestor de Tareas
          </Typography>
          <TaskForm onNotification={handleNotification} />
          <TaskList
            onNotification={handleNotification}
            searchTerm={searchTerm}
          />
          <Notification
            open={notification.open}
            message={notification.message}
            severity={notification.severity}
            onClose={handleCloseNotification}
          />
        </Container>
      </Content>
    </Root>
  );
};

export default App;
