// components/rows/SongRow.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { TopicCell, ContentCell } from "../../StyledTableCells";

interface SongRowProps {
  songs: string[];
}

const SongRow: React.FC<SongRowProps> = ({ songs }) => {
  return (
    <>
      <TopicCell
        sx={{
          border: "3px solid white",
          minHeight: "150px",
        }}
      >
        Song
      </TopicCell>
      <ContentCell
        sx={{
          border: "3px solid white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>Phonic</Typography>
          {songs.map((song, index) => (
            <Typography key={index}>
              {index + 1}.{song}
            </Typography>
          ))}
        </Box>
      </ContentCell>
    </>
  );
};

export default SongRow;
