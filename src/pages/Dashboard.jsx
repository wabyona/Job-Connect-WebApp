// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Skeleton,
  Stack,
} from "@mui/material";
import Sidebar from "./Sidebar";

const fakeFetch = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          jobMatches: [
            "Frontend Developer",
            "UI/UX Designer",
            "React Engineer",
          ],
          recentActivity: [
            "Applied to Frontend Developer",
            "Updated profile",
            "Viewed job: Backend Dev",
          ],
        }),
      1800
    )
  );

const MatchCard = ({ title }) => (
  <Paper
    elevation={1}
    sx={{
      p: 2,
      borderRadius: 3,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <Box>
      <Typography fontWeight={600}>{title}</Typography>
      <Typography variant="caption" color="text.secondary">
        Match: 87%
      </Typography>
    </Box>
    <Button size="small" variant="contained">
      View
    </Button>
  </Paper>
);

const ActivityCard = ({ text }) => (
  <Paper
    elevation={1}
    sx={{
      p: 2,
      borderRadius: 3,
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <Typography>{text}</Typography>
    <Typography variant="caption" color="text.secondary">
      a few mins ago
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fakeFetch().then(setData);
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: { xs: 2, md: 6 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Overview of your activity
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  textTransform="uppercase"
                  fontWeight={600}
                >
                  Matches
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  3
                </Typography>
              </Box>
            </Paper>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  textTransform="uppercase"
                  fontWeight={600}
                >
                  Applications
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  5
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              mb={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Job Matches</Typography>
              <Button size="small">See all</Button>
            </Box>

            {data ? (
              <Stack spacing={2}>
                {data.jobMatches.map((j) => (
                  <MatchCard key={j} title={j} />
                ))}
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Skeleton variant="rounded" height={80} />
                <Skeleton variant="rounded" height={80} />
              </Stack>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              mb={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Recent Activity</Typography>
              <Button size="small">Manage</Button>
            </Box>

            {data ? (
              <Stack spacing={2}>
                {data.recentActivity.map((a, i) => (
                  <ActivityCard key={i} text={a} />
                ))}
              </Stack>
            ) : (
              <Skeleton variant="rounded" height={150} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
