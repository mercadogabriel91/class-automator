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
      <TopicCell>
        单词
        <br />
        Vocabulary
      </TopicCell>
      <ContentCell>
        <Typography>{vocabulary.join(" | ")}</Typography>
      </ContentCell>
    </tr>
  );
};

export default VocabularyRow;
