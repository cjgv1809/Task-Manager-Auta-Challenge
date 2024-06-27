import { useMediaQuery, useTheme } from "@mui/material";

export const useResponsiveLayout = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm"));
};
