import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HealthBarChart = ({ data }) => {
  const [filter, setFilter] = useState("24h"); // Default to 24 hours

  // Function to filter data based on the selected time range
  const filterData = (data, hours) => {
    const now = new Date();
    const cutoffTime = new Date(now - hours * 60 * 60 * 1000); // Calculate cutoff time
    return data.filter((item) => new Date(item.creationDate) >= cutoffTime);
  };

  // Get filtered data
  const filteredData = filterData(data, filter === "12h" ? 12 : 24);

  // Sort data by creationDate
  const sortedData = filteredData.sort(
    (a, b) => new Date(a.creationDate) - new Date(b.creationDate)
  );

  // Format data for the LineChart
  const chartData = sortedData.map((item) => {
    const date = new Date(item.creationDate);
    const hour = date.getHours() + date.getMinutes() / 60;
    return {
      hour,
      minutes: date.getMinutes(),
      result: item.result,
    };
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="filter-select-label">Filter</InputLabel>
        <Select
          labelId="filter-select-label"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Filter"
        >
          <MenuItem value="12h">Last 12 Hours</MenuItem>
          <MenuItem value="24h">Last 24 Hours</MenuItem>
        </Select>
      </FormControl>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="hour"
            label={{
              value: "Hours",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default HealthBarChart;
