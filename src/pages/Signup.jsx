// src/pages/Signup.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/Api"; // Make sure this exists

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    user_type: "job_seeker",
    phone_number: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/signup", form);
      console.log("Signup success:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Phone Number"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <TextField
            select
            label="User Type"
            name="user_type"
            value={form.user_type}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          >
            <MenuItem value="job_seeker">Job Seeker</MenuItem>
            <MenuItem value="employer">Employer</MenuItem>
          </TextField>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box mt={3} textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
