// components/LearningPlanTable.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { ContentLevel } from "../../../../entities/content-level.entity";
import { HeaderCell, TimeCell, WeekCell } from "../StyledTableCells";
import SongRow from "./rows/SongRow";
import PhonicsRow from "./rows/PhonicsRow";
import ReadingRow from "./rows/ReadingRow";
import ConversationRow from "./rows/ReadingRow";
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
        <TableBody>
          <TableRow>
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
          <WritingRow />
          <VocabularyRow vocabulary={data.vocabulary} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LearningPlanTable;
