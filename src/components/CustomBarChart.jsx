import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography } from "@mui/material";

const CustomBarChart = ({ data = [], title }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Paper style={{ padding: 16, margin: 16, height: 400 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>No data available</Typography>
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: 16, margin: 16, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CustomBarChart;
