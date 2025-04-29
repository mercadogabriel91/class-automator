// components/rows/WritingRow.tsx
import React from "react";
import { TopicCell, ContentCell } from "../../StyledTableCells";

interface WritingRowProps {
  writing: string[];
}

const WritingRow: React.FC<WritingRowProps> = ({ writing }) => {
  return (
    <tr>
      <TopicCell sx={{ border: "3px solid white" }}>
        写<br />
        Writing
      </TopicCell>
      <ContentCell
        sx={{
          borderRight: "1.5px solid white",
          padding: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {writing.map((img, index) => (
          <img
            src={`/images/${img}`}
            alt={img}
            style={{ height: "100%", width: "103px", objectFit: "contain" }}
            key={index}
          />
        ))}
      </ContentCell>
    </tr>
  );
};

export default WritingRow;
