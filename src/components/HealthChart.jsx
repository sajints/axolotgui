import {
  Box,
  Container,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL, GET_HEALTHMONITOR_URL } from "../urlconstants";
import CustomBarChart from "./CustomBarChart";
import { tokens } from "../theme";

const HealthChart = () => {
  const [chartData, setChartData] = useState({});
  const [filter, setFilter] = useState("24"); // Default to last 24 hours
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Function to process the raw data
  const processData = (data) => {
    const result = {
      "Axolot API": {},
      "Axolot SQLDB": {},
    };

    data.forEach((item) => {
      const itemDate = new Date(item.creationDate);
      const hour = itemDate.getHours();
      const app = item.application;

      if (!result[app]) {
        result[app] = {};
      }
      if (!result[app][hour]) {
        result[app][hour] = 0;
      }

      result[app][hour] += 1;
    });

    return result;
  };

  const formatChartData = (appData) => {
    if (!appData) return [];
    return Object.keys(appData).map((hour) => ({
      hour: `${hour}:00`,
      count: appData[hour],
    }));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}${GET_HEALTHMONITOR_URL}`
      );
      const filteredData = filterData(response.data);
      setChartData(processData(filteredData));
    } catch (error) {
      console.log(error, "error");
    }
  };

  const filterData = (data) => {
    const now = new Date();
    const cutoff = new Date(now);

    if (filter === "12") {
      cutoff.setHours(now.getHours() - 12);
    } else if (filter === "24") {
      cutoff.setHours(now.getHours() - 24);
    }

    return data.filter((item) => new Date(item.creationDate) >= cutoff);
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const apiData = formatChartData(chartData["Axolot API"]);
  const sqldbData = formatChartData(chartData["Axolot SQLDB"]);

  return (
    <Box
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      p="30px"
    >
      <Container>
        <FormControl fullWidth>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            value={filter}
            label="Filter"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="12">Last 12 Hours</MenuItem>
            <MenuItem value="24">Last 24 Hours</MenuItem>
          </Select>
        </FormControl>
        <CustomBarChart data={apiData} title="Axolot API Requests per Hour" />
        <CustomBarChart
          data={sqldbData}
          title="Axolot SQLDB Requests per Hour"
        />
      </Container>
    </Box>
  );
};

export default HealthChart;
