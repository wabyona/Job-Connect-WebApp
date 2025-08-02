import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
} from "@mui/material";
import axios from "axios";
import { validateEmail, validatePassword } from "../utils/Validators";

const Signup = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters and include a number.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });

      // Assume response success message or user data
      setLoading(false);
      onSignupSuccess && onSignupSuccess();

    } catch (err) {
      setLoading(false);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        bgcolor: "background.default",
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 420, borderRadius: 3, boxShadow: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="600" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Sign up to get started with Job Connect
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Email address"
              type="email"
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={
                validatePassword(password)
                  ? "Strong password"
                  : "Password must be ≥8 chars and include a number."
              }
            />

            <TextField
              fullWidth
              label="Confirm password"
              type="password"
              required
              margin="normal"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ py: 1.5, mt: 1, mb: 2 }}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="caption" display="block" align="center">
            Already have an account?{" "}
            <Typography
              component="span"
              sx={{ color: "primary.main", cursor: "pointer" }}
              onClick={() => onSignupSuccess && onSignupSuccess("switchToLogin")}
            >
              Log in
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
