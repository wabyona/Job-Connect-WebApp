import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import baseTheme from "./theme";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [view, setView] = useState("login"); // 'login', 'signup', 'dashboard'
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (data) => {
    if (data === "switchToSignup") {
      setView("signup");
    } else {
      setUser(data);
      setView("dashboard");
    }
  };

  const handleSignupSuccess = (action) => {
    if (action === "switchToLogin") {
      setView("login");
    } else {
      // After signup, redirect to login or directly dashboard depending on your flow
      setView("login");
    }
  };

  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      {view === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
      {view === "signup" && <Signup onSignupSuccess={handleSignupSuccess} />}
      {view === "dashboard" && <Dashboard user={user} />}
    </ThemeProvider>
  );
};

export default App;
