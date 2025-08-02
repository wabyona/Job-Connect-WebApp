// src/components/Sidebar.jsx
import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import {
  Home as HomeIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

const navItems = [
  { label: "Dashboard", icon: <HomeIcon /> },
  { label: "Jobs", icon: <WorkIcon /> },
  { label: "Profile", icon: <PersonIcon /> },
  { label: "Notifications", icon: <NotificationsIcon /> },
];

const Sidebar = () => {
  const [open, setOpen] = React.useState(true);
  const isSmall = useMediaQuery("(max-width:900px)");

  React.useEffect(() => {
    if (isSmall) setOpen(false);
    else setOpen(true);
  }, [isSmall]);

  return (
    <>
      {isSmall && (
        <IconButton
          onClick={() => setOpen((o) => !o)}
          sx={{ position: "fixed", top: 16, left: 16, zIndex: 1300 }}
          aria-label="toggle menu"
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isSmall ? "temporary" : "permanent"}
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 260,
            boxSizing: "border-box",
            bgcolor: "background.paper",
            borderRight: 1,
            borderColor: "divider",
          },
        }}
      >
        <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Job Connect
          </Typography>
          <List sx={{ flex: 1 }}>
            {navItems.map((it) => (
              <ListItemButton key={it.label} sx={{ borderRadius: 2, mb: 0.5 }}>
                <ListItemIcon>{it.icon}</ListItemIcon>
                <ListItemText primary={it.label} />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ mt: "auto", fontSize: 12, color: "text.secondary" }}>
            Logged in as <strong>Chrispus</strong>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
