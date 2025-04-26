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
    !!reading && (
      <tr>
        <TopicCell>
          读<br />
          Reading
        </TopicCell>
        <ContentCell>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography>
                RAZ AA level |{" "}
                {!!titles && titles[0] && titles[0].substring(0, 2)}
              </Typography>
            </Grid>

            <Grid size={6} container justifyContent="flex-end">
              <Box
                sx={{
                  width: 80,
                  height: 100,
                  bgcolor: "rgba(0,0,0,0.1)",
                  border: "1px solid #ccc",
                }}
              >
                <Typography variant="caption">
                  {!!images && images[0]}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </ContentCell>
      </tr>
    )
  );
};

export default ReadingRow;
