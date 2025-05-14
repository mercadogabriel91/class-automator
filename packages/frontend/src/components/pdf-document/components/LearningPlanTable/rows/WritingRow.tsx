// components/rows/WritingRow.tsx
import React from "react";
import { TopicCell, ContentCell } from "../../StyledTableCells";

interface WritingRowProps {
  writing: string[];
}

const WritingRow: React.FC<WritingRowProps> = ({ writing }) => {
  return (
    <tr>
      <TopicCell
        sx={{ border: "3px solid white" }}
        data-chinese
        lang="zh-CN"
        className="chinese-text"
        style={{
          fontFamily: "Noto Sans CJK SC, PingFang SC, sans-serif",
          userSelect: "text",
          WebkitUserSelect: "text",
        }}
      >
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
        {writing &&
          writing.map((img, index) => {
            const foldeName: string = img.split("/")[0];
            const fileName: string = img.split("/")[1];
            const imgPath: string = `/images/${foldeName}/${fileName}`;
            return (
              <img
                src={imgPath}
                alt={img}
                style={{
                  height: "100%",
                  width: "103px",
                  objectFit: "contain",
                  margin: "8px",
                }}
                key={index}
              />
            );
          })}
      </ContentCell>
    </tr>
  );
};

export default WritingRow;
