import { AppBar, Toolbar, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" flexGrow={1}>
          <img className="logo" src="/src/assets/Shopping.svg" alt="logo" />
        </Box>
        <NavLink
          to="/"
          style={{
            color: "inherit",
            textDecoration: "inherit",
            marginRight: "15px",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          style={{
            color: "inherit",
            textDecoration: "inherit",
            marginRight: "15px",
          }}
        >
          Shop
        </NavLink>
        <NavLink
          to="/login"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          Login
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}
