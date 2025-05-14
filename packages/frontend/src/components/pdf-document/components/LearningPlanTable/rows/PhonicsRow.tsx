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
      <TopicCell
        sx={{ borderRight: "3px solid white" }}
        data-chinese
        lang="zh-CN"
        className="chinese-text"
        style={{
          fontFamily: "Noto Sans CJK SC, PingFang SC, sans-serif",
          userSelect: "text",
          WebkitUserSelect: "text",
        }}
      >
        语音
        <br />
        Phonics
      </TopicCell>
      <ContentCell sx={{ height: "25%", padding: 0 }}>
        {phonics && phonics.title && (
          <Typography
            variant="h6"
            sx={{
              fontSize: "16px",
              paddingLeft: "8px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {`${phonics.title} - Unit: ${phonics.unit}`}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "160px",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              display: "flex",
              margin: 0,
              flexDirection: "row",
              justifyContent: "space-evenly",
              padding: 0,
              width: "92%",
            }}
          >
            <Box
              sx={{
                width: "30%",
                height: "130px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {phonics && phonics.pictures && phonics.pictures[0] && (
                <img
                  src={`/images/${phonics.pictures[0]}`}
                  alt={phonics.pictures[0]}
                  style={{ height: "100%" }}
                />
              )}
            </Box>

            <Box sx={{ width: "39%", height: "130px", textAlign: "center" }}>
              {phonics && phonics.unit && (
                <Typography
                  sx={{
                    fontWeight: "bold",
                  }}
                >{`Unit: ${phonics.unit}`}</Typography>
              )}
              {phonics && phonics.letter && (
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {`${phonics.letter.toUpperCase()} ${phonics.letter.toLowerCase()}`}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                width: "30%",
                height: "130px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {phonics && phonics.pictures && phonics.pictures[1] && (
                <img
                  src={`/images/${phonics.pictures[1]}`}
                  alt={phonics.pictures[1]}
                  style={{ height: "100%", paddingLeft: "12px" }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </ContentCell>
    </tr>
  );
};

export default PhonicsRow;
