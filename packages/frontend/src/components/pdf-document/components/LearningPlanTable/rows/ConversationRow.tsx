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
      <TopicCell>
        日常对话
        <br />
        Conversation
      </TopicCell>
      <ContentCell>
        <Typography>-{conversations[0]}</Typography>
        <Typography>-{conversations[1]}</Typography>
      </ContentCell>
    </tr>
  );
};

export default ConversationRow;
