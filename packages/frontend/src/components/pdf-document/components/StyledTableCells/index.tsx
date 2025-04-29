// components/StyledTableCells.tsx
import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TableCellProps } from "@mui/material/TableCell";
import StyledComponent from "@mui/material/styles/styled";
import Theme from "@mui/material/styles/createTheme";

export const HeaderCell: any = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#3b5998", // Blue header color
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  padding: theme.spacing(2),
  fontSize: "16px",
  border: "3px solid white",
}));

export const TimeCell: any = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#66a366", // Green cell color
  padding: theme.spacing(2),
  rowSpan: 6,
  width: "20%",
  verticalAlign: "middle",
  textAlign: "center",
  fontSize: "16px",
  border: "3px solid white",
}));

export const TopicCell: any = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#8ab27e", // Lighter green for topic cells
  padding: theme.spacing(2),
  width: "15%",
  fontSize: "16px",
  verticalAlign: "middle",
  textAlign: "center",
}));

export const ContentCell: any = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#f0f0f0", // Light gray for content cells
  padding: theme.spacing(2),
}));

export const WeekCell: any = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#8ab27e",
  fontSize: "16px",
  textAlign: "center",
  border: "3px solid white",
}));
