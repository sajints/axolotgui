import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { BarChart, barElementClasses } from "@mui/x-charts/BarChart";

const CustomGraph = ({ apiData, sqlDbData }) => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState("12");
  const [chartData, setChartData] = useState({ api: [], sqlDb: [] });

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value);
  };

  const roundToNearestFive = (minutes) => {
    return Math.round(minutes / 5) * 5;
  };

  const processData = (data, hours) => {
    const now = new Date();
    const endTime = new Date(now);
    const startTime = new Date(now);
    startTime.setHours(now.getHours() - hours); // Adjust to show the last 'hours' from the current hour

    // Ensure the start time is rounded down to the start of the hour
    startTime.setMinutes(0, 0, 0);

    const filteredData = data.filter(
      (item) =>
        new Date(item.creationDate) >= startTime &&
        new Date(item.creationDate) < endTime
    );

    const hourBuckets = {};

    filteredData.forEach((item, index, arr) => {
      const currentTime = new Date(item.creationDate);
      const hour = currentTime.getHours();

      if (!hourBuckets[hour]) {
        hourBuckets[hour] = { intervals: [] };
      }

      const startOfHour = new Date(currentTime);
      startOfHour.setMinutes(0, 0, 0, 0);

      if (
        index === 0 ||
        currentTime.getHours() !==
          new Date(arr[index - 1].creationDate).getHours()
      ) {
        const intervalMinutes = (currentTime - startOfHour) / (60 * 1000);
        const roundedInterval = roundToNearestFive(intervalMinutes);
        hourBuckets[hour].intervals.push({
          interval: roundedInterval,
          result: item.result,
        });
      } else {
        const previousTime = new Date(arr[index - 1].creationDate);
        const intervalMinutes = (currentTime - previousTime) / (60 * 1000);
        const roundedInterval = roundToNearestFive(intervalMinutes);
        hourBuckets[hour].intervals.push({
          interval: roundedInterval,
          result: item.result,
        });
      }

      if (
        index === arr.length - 1 ||
        new Date(arr[index + 1].creationDate).getHours() !== hour
      ) {
        const endOfHour = new Date(currentTime);
        endOfHour.setMinutes(60, 0, 0, 0);

        const remainingMinutes =
          arr.length - 1 === index
            ? currentTime.getMinutes()
            : (endOfHour - currentTime) / (60 * 1000);
        const roundedRemaining = roundToNearestFive(remainingMinutes);
        hourBuckets[hour].intervals.push({
          interval: roundedRemaining,
          result: 1, // Assuming successful result for remaining time
        });
      }
    });

    return Object.keys(hourBuckets).map((hour) => {
      const hourData = hourBuckets[hour];
      const totalIntervalSum = hourData.intervals.reduce(
        (acc, val) => acc + val.interval,
        0
      );

      if (totalIntervalSum < 60 && !(hour == now.getHours())) {
        hourData.intervals.push({
          interval: 60 - totalIntervalSum,
          result: 1, // Fill remaining time with success
        });
      }
      // console.log("hour data:", hourData);

      return {
        hour: hour,
        ...hourData.intervals.slice(1),
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
    const colors = data.map((hourEntry) => {
      return Object.keys(hourEntry).reduce((acc, key) => {
        if (key !== "hour") {
          const result = hourEntry[key].result;
          acc.push(result === 0 ? "#f47560" : "#70d8bd"); // Red for result 0, green for result 1
        }
        return acc;
      }, []);
    });

    // Build the series dynamically based on the intervals in the data
    const series = Array.from({ length: 12 }, (_, index) => {
      return {
        dataKey: `interval-${index}`,
        stack: "total",
      };
    });

    // Prepare dataset with formatted intervals and results
    const formattedData = data.map((hourEntry) => {
      const hourData = {
        hour: hourEntry.hour, // Keep hour as X-axis
      };

      // For each interval, add both interval and result to the row
      Object.keys(hourEntry).forEach((key) => {
        if (key !== "hour") {
          const intervalKey = `interval-${key}`;
          const resultKey = `result-${key}`;
          hourData[intervalKey] = hourEntry[key].interval;
          hourData[resultKey] = hourEntry[key].result;
        }
      });

      return hourData;
    });

    return (
      <Box height="400px" width="100%" mb={4}>
        <Typography variant="h6">{title}</Typography>
        <BarChart
          sx={(theme) => ({
            [`.${barElementClasses.root}`]: {
              fill: theme.palette.background.paper,
              strokeWidth: 1,
              fill: "",
              stroke: "#ffffff",
            },
          })}
          dataset={formattedData} // Use the formatted dataset
          xAxis={[{ scaleType: "band", dataKey: "hour" }]} // Hours on X-axis
          series={series} // Define series with dynamic colors
          height={350}
          colors={colors.flat()}
          yAxis={[
            {
              label: "Minutes",
              min: 0,
              max: 60,
              tickNumber: 10,
            },
          ]}
          slotProps={{ legend: { hidden: true } }}
        />
        <Box display="flex" justifyContent="center" mt={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: 2,
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: "#70d8bd",
                border: "1px solid white",
                marginRight: 1,
              }}
            />
            <Typography variant="body2">Service Up</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundColor: "#f47560",
                border: "1px solid white",
                marginRight: 1,
              }}
            />
            <Typography variant="body2">Service Down</Typography>
          </Box>
        </Box>
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
