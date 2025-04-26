// components/rows/SongRow.tsx
import React from "react";
import { Typography } from "@mui/material";
import { TopicCell, ContentCell } from "../../StyledTableCells";

interface SongRowProps {
  songs: string[];
}

const SongRow: React.FC<SongRowProps> = ({ songs }) => {
  return (
    <>
      <TopicCell>Song</TopicCell>
      <ContentCell>
        <Typography>Phonic</Typography>
        <Typography>
          1.{songs[0]} | {songs[1]}
        </Typography>
      </ContentCell>
    </>
  );
};

export default SongRow;
