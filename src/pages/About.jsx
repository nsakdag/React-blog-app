import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

const About = () => {
  return (
    <Box sx={{ padding: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
      Hello! We are the NSBLOG team. More information about our site
         To get it, you can follow us and use our social media accounts.
         you can reach.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <IconButton
          href="https://www.instagram.com/kullaniciadi/"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          href="https://www.facebook.com/kullaniciadi/"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          href="https://github.com/kullaniciadi"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default About;
