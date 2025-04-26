import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ContentLevel } from "../../entities/content-level.entity";

// Custom styled components
const HeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#3b5998", // Blue header color similar to the image
  color: "white",
  fontWeight: "bold",
  textAlign: "center",
  padding: theme.spacing(2),
  fontSize: "16px",
}));

const TimeCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#66a366", // Green cell color similar to the image
  padding: theme.spacing(2),
  rowSpan: 6,
  width: "20%",
  verticalAlign: "middle",
  textAlign: "center",
  fontSize: "16px",
}));

const TopicCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#8ab27e", // Lighter green for topic cells
  padding: theme.spacing(2),
  width: "15%",
  fontSize: "16px",
  verticalAlign: "middle",
  textAlign: "center",
}));

const ContentCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#f0f0f0", // Light gray for content cells
  padding: theme.spacing(2),
}));

const EnglishLearningPlan: React.FC<{ data: ContentLevel }> = ({ data }) => {
  // Format date range for the current week (similar to "4月14日-4月18日" in the image)
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() - today.getDay() + 5); // Friday

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  };

  const dateRange = `${formatDate(startOfWeek)}-${formatDate(endOfWeek)}`;
  const year = today.getFullYear();

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 900, margin: "auto", overflow: "hidden" }}
    >
      {/* Header section with logo and title */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: 100, mr: 2 }}>
          {/* Logo similar to the "m" logo in the image */}
          <svg width="80" height="80" viewBox="0 0 200 200">
            <rect x="30" y="60" width="40" height="110" fill="#d9534f" />
            <rect x="30" y="130" width="40" height="40" fill="#333" />
            <rect x="80" y="60" width="40" height="110" fill="#333" />
            <rect x="80" y="130" width="40" height="40" fill="#337ab7" />
            <rect x="130" y="130" width="40" height="40" fill="#f0ad4e" />
            <path
              d="M75,50 Q100,20 125,50"
              stroke="#d9534f"
              strokeWidth="15"
              fill="none"
            />
          </svg>
        </Box>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            color="#d9534f"
            fontWeight="bold"
          >
            English learning plan for this week
          </Typography>
          <Typography variant="h5" component="h2">
            本周英文学习计划
          </Typography>
        </Box>
      </Box>

      {/* Table for the learning plan */}
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
              <TableCell
                rowSpan={6}
                align="center"
                sx={{ backgroundColor: "#8ab27e", fontSize: "16px" }}
              >
                第二周
                <br />
                Week {data.lessonNumber}
              </TableCell>
              <TopicCell>Song</TopicCell>
              <ContentCell>
                <Typography>Phonic</Typography>
                <Typography>
                  1.{data.songs[0]} | {data.songs[1]}
                </Typography>
              </ContentCell>
            </TableRow>
            <TableRow>
              <TopicCell>
                语音
                <br />
                Phonics
              </TopicCell>
              <ContentCell>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>Unit {data.phonics.unit}</Typography>
                    <Typography>
                      {data.phonics.letter} {data.phonics.letter.toLowerCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent="flex-end">
                    {data.phonics.pictures.map((pic, index) => (
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
            </TableRow>
            <TableRow>
              <TopicCell>
                读<br />
                Reading
              </TopicCell>
              <ContentCell>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>
                      RAZ AA level | {data.reading.titles[0].substring(0, 2)}
                    </Typography>
                    <Typography>{data.reading.titles[0]}</Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent="flex-end">
                    <Box
                      sx={{
                        width: 80,
                        height: 100,
                        bgcolor: "rgba(0,0,0,0.1)",
                        border: "1px solid #ccc",
                      }}
                    >
                      <Typography variant="caption">
                        {data.reading.images[0]}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </ContentCell>
            </TableRow>
            <TableRow>
              <TopicCell>
                日常对话
                <br />
                Conversation
              </TopicCell>
              <ContentCell>
                <Typography>-{data.conversations[0]}</Typography>
                <Typography>-{data.conversations[1]}</Typography>
              </ContentCell>
            </TableRow>
            <TableRow>
              <TopicCell>
                写<br />
                Writing
              </TopicCell>
              <ContentCell>
                <Box
                  sx={{
                    width: "100%",
                    height: 100,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: "rgba(0,0,0,0.1)",
                      border: "1px solid #ccc",
                    }}
                  >
                    <Typography variant="caption">Writing worksheet</Typography>
                  </Box>
                </Box>
              </ContentCell>
            </TableRow>
            <TableRow>
              <TopicCell>
                单词
                <br />
                Vocabulary
              </TopicCell>
              <ContentCell>
                <Typography>{data.vocabulary.join(" | ")}</Typography>
              </ContentCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EnglishLearningPlan;
