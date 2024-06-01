import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { logout } from "../helpers";
import { isUserAuthenticated } from "../guards/auth-guard";
import { APP_NAME } from "../config";

const Header = () => {
  const navigate = useNavigate();

  const isAuth = isUserAuthenticated();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {APP_NAME}
          </Typography>

          {isAuth ? (
            <>
              <Button color="inherit" onClick={() => logout(navigate)}>
                Signout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/signup")}>
                SignUp
              </Button>
              <Button color="inherit" onClick={() => navigate("/signin")}>
                SignIn
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
