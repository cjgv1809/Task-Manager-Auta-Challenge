import { Search as SearchIcon } from "@mui/icons-material";
import { InputBase, alpha, styled } from "@mui/material";
import { useSearch } from "@/hooks/useSearch";

const MuiSearch = styled("div")(({ theme }) => ({
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

const Search = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <MuiSearch>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Buscar..."
        inputProps={{ "aria-label": "search" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </MuiSearch>
  );
};

export default Search;
