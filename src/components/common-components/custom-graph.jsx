import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const CustomGraph = ({ apiData, sqlDbData }) => {
  const [timeRange, setTimeRange] = useState("12");
  const [chartData, setChartData] = useState({ api: [], sqlDb: [] });

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  // Round minutes to nearest 5
  const roundToNearestFive = (minutes) => {
    return Math.round(minutes / 5) * 5;
  };

  const processData = (data, hours) => {
    const now = new Date();
    const startTime = new Date(now.getTime() - hours * 60 * 60 * 1000);

    // Filter and sort data
    const filteredData = data
      .filter((item) => new Date(item.creationDate) >= startTime)
      .sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));

    // Container for hour intervals
    const hourBuckets = {};

    filteredData.forEach((item, index, arr) => {
      const currentTime = new Date(item.creationDate);
      const hour = currentTime.getHours();

      if (!hourBuckets[hour]) {
        hourBuckets[hour] = { intervals: [] };
      }

      const startOfHour = new Date(currentTime);
      startOfHour.setMinutes(0, 0, 0);

      // Calculate interval from the start of the hour to the first trigger
      if (
        index === 0 ||
        currentTime.getHours() !==
          new Date(arr[index - 1].creationDate).getHours()
      ) {
        const intervalMinutes = (currentTime - startOfHour) / (60 * 1000);
        const roundedInterval = roundToNearestFive(intervalMinutes);

        console.log(
          `First interval calculation: Start of hour: ${startOfHour}, Current Time: ${currentTime}, Interval Minutes: ${intervalMinutes}, Rounded Interval: ${roundedInterval}`
        );

        hourBuckets[hour].intervals.push(roundedInterval);
      } else {
        // Calculate the interval between consecutive triggers
        const previousTime = new Date(arr[index - 1].creationDate);
        const intervalMinutes = (currentTime - previousTime) / (60 * 1000);
        const roundedInterval = roundToNearestFive(intervalMinutes);

        console.log(
          `Interval calculation between triggers: Previous Time: ${previousTime}, Current Time: ${currentTime}, Interval Minutes: ${intervalMinutes}, Rounded Interval: ${roundedInterval}`
        );

        hourBuckets[hour].intervals.push(roundedInterval);
      }

      // Handle the last part of the hour
      if (
        index === arr.length - 1 ||
        new Date(arr[index + 1].creationDate).getHours() !== hour
      ) {
        const endOfHour = new Date(currentTime);
        endOfHour.setMinutes(60, 0, 0);
        const remainingMinutes = (endOfHour - currentTime) / (60 * 1000);
        const roundedRemaining = roundToNearestFive(remainingMinutes);

        console.log(
          `Last interval calculation: End of hour: ${endOfHour}, Current Time: ${currentTime}, Remaining Minutes: ${remainingMinutes}, Rounded Remaining: ${roundedRemaining}`
        );

        hourBuckets[hour].intervals.push(roundedRemaining);
      }
    });

    // Ensure total time is exactly 60 minutes
    return Object.keys(hourBuckets).map((hour) => {
      const hourData = hourBuckets[hour];
      const totalIntervalSum = hourData.intervals.reduce(
        (acc, val) => acc + val,
        0
      );

      // Ensure the total time for the hour is exactly 60 minutes
      if (totalIntervalSum < 60) {
        hourData.intervals.push(60 - totalIntervalSum);
      }

      return {
        hour: hour,
        ...hourData.intervals.reduce((acc, interval, index) => {
          acc[`interval-${index}`] = interval;
          return acc;
        }, {}),
      };
    });
  };

  useEffect(() => {
    setChartData({
      api: processData(apiData, parseInt(timeRange)),
      sqlDb: processData(sqlDbData, parseInt(timeRange)),
    });
  }, [apiData, sqlDbData, timeRange]);

  const renderChart = (data, title) => {
    const series = Array(12)
      .fill()
      .map((_, index) => ({
        dataKey: `interval-${index}`,
        label: `Interval ${index + 1}`,
        stack: "total",
      }));

    return (
      <Box height="400px" width="100%" mb={4}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "hour" }]}
          series={series}
          height={350}
          yAxis={[{ label: "Minutes", min: 0, max: 60 }]}
        />
      </Box>
    );
  };

  return (
    <Box>
      <FormControl sx={{ mb: 2, minWidth: 120 }}>
        <InputLabel id="time-range-label">Time Range</InputLabel>
        <Select
          labelId="time-range-label"
          id="time-range-select"
          value={timeRange}
          label="Time Range"
          onChange={handleTimeRangeChange}
        >
          <MenuItem value={12}>Last 12 Hours</MenuItem>
          <MenuItem value={24}>Last 24 Hours</MenuItem>
        </Select>
      </FormControl>
      {renderChart(chartData.api, "Axolot API Data")}
      {renderChart(chartData.sqlDb, "Axolot SQLDB Data")}
    </Box>
  );
};

export default CustomGraph;
