import { Typography } from "@mui/material";
import React from "react";
import { APP_NAME } from "../config";

const Footer = () => {
  return (
    <footer className="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        {APP_NAME} {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
};

export default Footer;
