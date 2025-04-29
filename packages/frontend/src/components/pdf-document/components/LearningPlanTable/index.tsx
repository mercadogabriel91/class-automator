// components/LearningPlanTable.tsx
import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ContentLevel } from "../../../../entities/content-level.entity";
import { HeaderCell, TimeCell, WeekCell } from "../StyledTableCells";
import SongRow from "./rows/SongRow";
import PhonicsRow from "./rows/PhonicsRow";
import ReadingRow from "./rows/ReadingRow";
import ConversationRow from "./rows/ConversationRow";
import WritingRow from "./rows/WritingRow";
import VocabularyRow from "./rows/VocabularyRow";

interface LearningPlanTableProps {
  data: ContentLevel;
  dateRange: string;
  year: number;
}

const LearningPlanTable: React.FC<LearningPlanTableProps> = ({
  data,
  dateRange,
  year,
}) => {
  return (
    <Box
      sx={{
        minHeight: "100%",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderCell>
                时间
                <br />
                Time
              </HeaderCell>
              <HeaderCell>
                第 周<br />
                Week
              </HeaderCell>
              <HeaderCell>
                主题
                <br />
                Topic
                <br />
                歌曲
              </HeaderCell>
              <HeaderCell>
                内容
                <br />
                Contents
              </HeaderCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: "800px" }}>
            <TableRow
              sx={{
                height: "150px",
              }}
            >
              <TimeCell rowSpan={6}>
                {dateRange}
                <br />
                {year} 年
              </TimeCell>
              <WeekCell rowSpan={6}>
                第二周
                <br />
                Week {data.lessonNumber}
              </WeekCell>
              <SongRow songs={data.songs} />
            </TableRow>
            <PhonicsRow phonics={data.phonics} />
            <ReadingRow reading={data.reading} />
            <ConversationRow conversations={data.conversations} />
            <WritingRow writing={data.writing} />
            <VocabularyRow vocabulary={data.vocabulary} />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LearningPlanTable;
