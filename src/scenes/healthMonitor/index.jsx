import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
// import HealthChart from "../../components/health-chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, GET_HEALTHMONITOR_URL } from "../../urlconstants";
import CustomTable from "../../components/common-components/custom-table";

const HelathMonitor = () => {
  const theme = useTheme();
  const [healthMonitorData, setHealthMonitorData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (date) {
      fetchData(`${date} 00:00:00`);
    }
  };

  const fetchData = async (dateFilter) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}${GET_HEALTHMONITOR_URL}${
          dateFilter?.length ? `?filterDate=${dateFilter}` : ""
        }`
      );
      setHealthMonitorData(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "creationDate", headerName: "Created Date" },
    { field: "result", headerName: "Result" },
  ];

  useEffect(() => {
    fetchData("");
  }, []);

  return (
    <Box m="20px">
      <Header title="Health Monitor" subtitle="Health Monitor Page" />
      <Typography>
        {/* <HealthChart healthMonitorData/> test*/}
        <CustomTable
          data={healthMonitorData}
          columns={columns}
          dateFilter={selectedDate}
          onDateChange={handleDateChange}
        />
      </Typography>
    </Box>
  );
};

export default HelathMonitor;
