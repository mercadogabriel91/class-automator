// EnglishLearningPlan.tsx (Main Component)
import React from "react";
import { Paper } from "@mui/material";
import { ContentLevel } from "../../entities/content-level.entity";
import HeaderSection from "./components/HeaderSection";
import LearningPlanTable from "./components/LearningPlanTable";

const PdfDocument: React.FC<{ data: ContentLevel }> = ({ data }) => {
  // Format date range for the current week
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() - today.getDay() + 5); // Friday

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  };

  const dateRange = `${formatDate(startOfWeek)}-${formatDate(endOfWeek)}`;
  const year = today.getFullYear();

  return (
    <Paper
      elevation={3}
      sx={{
        width: "794px",
        height: "1123px",
        margin: "auto",
        overflow: "hidden",
      }}
    >
      <HeaderSection />
      <LearningPlanTable data={data} dateRange={dateRange} year={year} />
    </Paper>
  );
};

export default PdfDocument;
