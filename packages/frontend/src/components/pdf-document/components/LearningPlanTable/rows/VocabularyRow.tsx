// components/rows/VocabularyRow.tsx
import React from "react";
import { Typography } from "@mui/material";
import { TopicCell, ContentCell } from "../../StyledTableCells";

interface VocabularyRowProps {
  vocabulary: string[];
}

const VocabularyRow: React.FC<VocabularyRowProps> = ({ vocabulary }) => {
  return (
    <tr>
      <TopicCell sx={{ border: "3px solid white", height: "90px" }}>
        单词
        <br />
        Vocabulary
      </TopicCell>
      <ContentCell sx={{ border: "3px solid white", textAlign: 'center' }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {vocabulary.join(" | ")}
        </Typography>
      </ContentCell>
    </tr>
  );
};

export default VocabularyRow;
