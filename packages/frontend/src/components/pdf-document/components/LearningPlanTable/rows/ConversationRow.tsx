// components/rows/ConversationRow.tsx
import React from "react";
import { Typography } from "@mui/material";
import { TopicCell, ContentCell } from "../../StyledTableCells";

interface ConversationRowProps {
  conversations: string[];
}

const ConversationRow: React.FC<ConversationRowProps> = ({ conversations }) => {
  return (
    <tr>
      <TopicCell sx={{ border: "3px solid white" }}>
        日常对话
        <br />
        Conversation
      </TopicCell>
      <ContentCell
        sx={{ border: "3px solid white", padding: 0, textAlign: "center" }}
      >
        {conversations.map((conversation, index) => (
          <Typography
            key={index}
            variant="h6"
            sx={{ fontSize: "16px", paddingLeft: "8px", fontWeight: "bold" }}
          >
            - {conversation}
          </Typography>
        ))}
      </ContentCell>
    </tr>
  );
};

export default ConversationRow;
