// components/StyledTableCells.tsx
import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#3b5998", // Blue header color
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  padding: theme.spacing(2),
  fontSize: "16px",
}));

export const TimeCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#66a366", // Green cell color
  padding: theme.spacing(2),
  rowSpan: 6,
  width: "20%",
  verticalAlign: "middle",
  textAlign: "center",
  fontSize: "16px",
}));

export const TopicCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#8ab27e", // Lighter green for topic cells
  padding: theme.spacing(2),
  width: "15%",
  fontSize: "16px",
  verticalAlign: "middle",
  textAlign: "center",
}));

export const ContentCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#f0f0f0", // Light gray for content cells
  padding: theme.spacing(2),
}));

export const WeekCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#8ab27e",
  fontSize: "16px",
  textAlign: "center",
}));
