// components/rows/WritingRow.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { TopicCell, ContentCell } from "../../StyledTableCells";

const WritingRow: React.FC = () => {
  return (
    <tr>
      <TopicCell>
        写<br />
        Writing
      </TopicCell>
      <ContentCell>
        <Box
          sx={{
            width: "100%",
            height: 100,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              bgcolor: "rgba(0,0,0,0.1)",
              border: "1px solid #ccc",
            }}
          >
            <Typography variant="caption">Writing worksheet</Typography>
          </Box>
        </Box>
      </ContentCell>
    </tr>
  );
};

export default WritingRow;
