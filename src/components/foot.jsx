// Footer.jsx
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Box
      sx={{
        p: 3,
        mt: "auto",
        backgroundColor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mr: 2 }}
      >
        © {new Date().getFullYear()} Wentao
      </Typography>
      <IconButton
        color="primary"
        component="a"
        href="https://github.com/Hwent/shoppingCart"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </IconButton>
    </Box>
  );
}
