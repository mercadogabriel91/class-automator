// components/rows/PhonicsRow.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { TopicCell, ContentCell } from "../../StyledTableCells";

interface PhonicsRowProps {
  phonics: {
    unit: number;
    title: string;
    letter: string;
    pictures: string[];
  };
}

const PhonicsRow: React.FC<PhonicsRowProps> = ({ phonics }) => {
  return (
    <tr style={{ border: "3px solid white" }}>
      <TopicCell sx={{ borderRight: "3px solid white" }}>
        语音
        <br />
        Phonics
      </TopicCell>
      <ContentCell sx={{ height: "25%", padding: 0}}>
        <Typography
          variant="h6"
          sx={{ fontSize: "16px", paddingLeft: "8px", fontWeight: "bold", textAlign: "center" }}
        >
          {`${phonics.title} - Unit: ${phonics.unit}`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "160px",
            justifyContent: "space-evenly",
          }}
        >
          {phonics.pictures.map((img, index) => (
            <img
                src={`/images/${img}`}
                alt={img}
                style={{ height: "100%" }}
                key={index}
              />
          ))}
        </Box>
      </ContentCell>
    </tr>
  );
};

export default PhonicsRow;
