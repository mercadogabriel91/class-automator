// components/HeaderSection.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import img from "../../../../assets/montessori.png";

const HeaderSection: React.FC = () => {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        widhth: "100vw",
      }}
    >
      <Box sx={{ marginleft: "100px", mr: "5%", ml: "15%" }}>
        <img src={img} alt="Logo" style={{ width: "130px" }} />
      </Box>
      <Box
        sx={{
          height: "130px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          color="#d9534f"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          English learning plan for this week
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontFamily: "Noto Sans CJK SC, PingFang SC, sans-serif" }}
          data-chinese
          lang="zh-CN"
          className="chinese-text"
          style={{
            fontFamily: "Noto Sans CJK SC, PingFang SC, sans-serif",
            userSelect: "text",
            WebkitUserSelect: "text",
          }}
        >
          本周英文学习计划
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderSection;
