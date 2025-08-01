// src/pages/Dashboard.jsx
import React from "react";
import { Typography, Container } from "@mui/material";

export default function Dashboard() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4">Welcome to the Dashboard!</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is where you will manage job postings, applications, and profiles.
      </Typography>
    </Container>
  );
}
