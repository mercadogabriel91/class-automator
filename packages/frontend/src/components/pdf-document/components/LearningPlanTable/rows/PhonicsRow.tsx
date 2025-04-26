// components/rows/PhonicsRow.tsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
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
    <tr>
      <TopicCell>
        语音
        <br />
        Phonics
      </TopicCell>
      <ContentCell>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography>Unit {phonics.unit}</Typography>
            <Typography>
              {phonics.letter} {phonics.letter.toLowerCase()}
            </Typography>
          </Grid>
          <Grid size={6} container justifyContent="flex-end">
            {phonics.pictures.map((pic, index) => (
              <Box
                key={index}
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "rgba(0,0,0,0.1)",
                  border: "1px solid #ccc",
                  mr: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="caption">{pic}</Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </ContentCell>
    </tr>
  );
};

export default PhonicsRow;
