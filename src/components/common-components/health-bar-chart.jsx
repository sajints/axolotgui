import React, { useState } from "react";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const HealthBarChart = ({ data }) => {
  const [filter, setFilter] = useState("24h");

  const filterData = (data, hours) => {
    const now = new Date();
    const cutoffTime = new Date(now - hours * 60 * 60 * 1000);
    return data.filter((item) => new Date(item.creationDate) >= cutoffTime);
  };

  const filteredData = filterData(data, filter === "12h" ? 12 : 24);

  const prepareChartData = (filteredData, application) => {
    return filteredData
      .filter((item) => item.application === application)
      .sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
      .map((item) => {
        const date = new Date(item.creationDate);
        const hour = date.getHours();
        const formattedDate = `${hour}:00`;
        const creationTimeInMinutes = date.getHours() * 60 + date.getMinutes();
        return {
          id: item.id,
          date: formattedDate,
          result: item.result,
          timeForResponse: item.timeForResponse,
          createdTime: date.toTimeString().split(" ")[0],
          color: item.result === 1 ? "green" : "red",
          height: creationTimeInMinutes,
        };
      });
  };

  const apiChartData = prepareChartData(filteredData, "Axolot API");
  const sqlDbChartData = prepareChartData(filteredData, "Axolot SQLDB");

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { id, result, timeForResponse, createdTime } = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid gray",
            borderRadius: "4px",
            color: "black",
          }}
        >
          <Typography>ID: {id}</Typography>
          <Typography>Result: {result}</Typography>
          <Typography>Time for Response: {timeForResponse}</Typography>
          <Typography>Created Time: {createdTime}</Typography>
        </Box>
      );
    }

    return null;
  };

  const renderBarChart = (chartData, title) => {
    const startTime = new Date(
      new Date().getTime() - (filter === "12h" ? 12 : 24) * 60 * 60 * 1000
    );
    const endTime = new Date();
    return (
      <Box sx={{ width: "100%", maxWidth: 1200, margin: "20px auto" }}>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <XAxis
              dataKey="date"
              label={{
                value: `Start: ${startTime.toLocaleString()} | End: ${endTime.toLocaleString()}`,
                position: "insideBottom",
                offset: -5,
              }}
              tickFormatter={(tick) => `${tick}`}
            />
            <YAxis
              tickFormatter={(tick) => `${tick}`}
              label={{
                value: "Creation Time (minutes)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="height" barSize={4}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  margin={{ right: 2 }}
                />
              ))}
              {/* <LabelList dataKey="result" position="top" /> */}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    );
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Health Monitor
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="filter-select-label">Time Range</InputLabel>
        <Select
          labelId="filter-select-label"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Time Range"
        >
          <MenuItem value="12h">Last 12 Hours</MenuItem>
          <MenuItem value="24h">Last 24 Hours</MenuItem>
        </Select>
      </FormControl>

      {renderBarChart(apiChartData, "Axolot API Health")}
      {renderBarChart(sqlDbChartData, "Axolot SQLDB Health")}
    </Box>
  );
};

export default HealthBarChart;
