// src/components/AuthCard.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Switch,
  Alert,
  Divider,
} from "@mui/material";
import { validateEmail, validatePassword } from "../utils/Validators";
import { Toast } from "./Toast";

const AuthCard = ({ mode = "login", onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (toastMsg) setToastOpen(true);
  }, [toastMsg]);

  const handleSubmit = (e) => {
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
    if (mode === "signup" && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToastMsg(
        mode === "login"
          ? `Welcome back, ${email.split("@")[0]}!`
          : "Account created successfully!"
      );
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: darkMode ? "background.default" : "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
      }}
    >
      {toastMsg && (
        <Toast
          message={toastMsg}
          type="success"
          open={toastOpen}
          onClose={() => setToastOpen(false)}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography variant="caption">{darkMode ? "Dark" : "Light"}</Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode((d) => !d)}
          inputProps={{ "aria-label": "toggle theme mode" }}
        />
      </Box>

      <Card sx={{ width: "100%", maxWidth: 420, borderRadius: 3, boxShadow: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="600" gutterBottom>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {mode === "login"
              ? "Sign in to continue to Job Connect"
              : "Sign up to get started with Job Connect"}
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
                mode === "signup"
                  ? validatePassword(password)
                    ? "Strong password"
                    : "Password must be ≥8 chars and include a number."
                  : undefined
              }
            />

            {mode === "signup" && (
              <TextField
                fullWidth
                label="Confirm password"
                type="password"
                required
                margin="normal"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
                mb: 2,
              }}
            >
              {mode === "login" && (
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={<Typography variant="caption">Remember me</Typography>}
                />
              )}
              {mode === "login" && (
                <Typography
                  variant="caption"
                  sx={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  Forgot password?
                </Typography>
              )}
            </Box>

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading
                ? "Processing..."
                : mode === "login"
                ? "Log in"
                : "Sign up"}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="caption" display="block" align="center">
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <Typography
                  component="span"
                  sx={{ color: "primary.main", cursor: "pointer" }}
                  onClick={() => onSwitch && onSwitch("signup")}
                >
                  Sign up
                </Typography>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Typography
                  component="span"
                  sx={{ color: "primary.main", cursor: "pointer" }}
                  onClick={() => onSwitch && onSwitch("login")}
                >
                  Log in
                </Typography>
              </>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthCard;
