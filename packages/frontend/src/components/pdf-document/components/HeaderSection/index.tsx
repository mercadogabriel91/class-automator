// components/HeaderSection.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import LogoSvg from "./Logo";

const HeaderSection: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: 100, mr: 2 }}>
        <LogoSvg />
      </Box>
      <Box>
        <Typography
          variant="h4"
          component="h1"
          color="#d9534f"
          fontWeight="bold"
        >
          English learning plan for this week
        </Typography>
        <Typography variant="h5" component="h2">
          本周英文学习计划
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderSection;
