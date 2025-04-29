// components/rows/ReadingRow.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { TopicCell, ContentCell } from "../../StyledTableCells";

interface ReadingRowProps {
  reading: {
    level: string;
    title: string;
    titles: string[];
    image: string;
    images: string[];
  };
}

const ReadingRow: React.FC<ReadingRowProps> = ({ reading }) => {
  if (!reading) {
    return null;
  }

  const { level, title, titles, image, images } = reading;

  return (
    <tr>
      <TopicCell sx={{ border: "3px solid white" }}>
        读<br />
        Reading
      </TopicCell>
      <ContentCell
        sx={{ border: "3px solid white", padding: 0, paddingLeft: 3 }}
      >
        <Box
          sx={{
            display: "flex",
            margin: 0,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 0,
          }}
        >
          <Box
            sx={{
              width: "30%",
              height: "130px",
            }}
          >
            {images && images[0] && (
              <img
                src={`/images/${images[0]}`}
                alt={images[0]}
                style={{ height: "100%" }}
              />
            )}
          </Box>
          <Box sx={{ width: "39.9%", height: "130px" }}>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >{`${title} - Level: ${level}`}</Typography>
            {titles.map((ttl, index) => (
              <Typography key={index}>{ttl}</Typography>
            ))}
          </Box>
          <Box sx={{ width: "30%", height: "130px" }}>
            {images && images[0] && (
              <img
                src={`/images/${images[0]}`}
                alt={images[0]}
                style={{ height: "100%" }}
              />
            )}
          </Box>
        </Box>
      </ContentCell>
    </tr>
  );
};

export default ReadingRow;
