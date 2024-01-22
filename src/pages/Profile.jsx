import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

const ProfilePage = () => {

  const { user } = useSelector((state) => state.auth)
  return (
    <Box mt={5}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
            <Avatar
              alt="User Avatar"
              src="/path/to/avatar.jpg" 
              sx={{ width: 100, height: 100, margin: "auto" }}
            />
            <Typography variant="h5" mt={2}>
             {user}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mt={1}>
             
            </Typography>
            {}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
