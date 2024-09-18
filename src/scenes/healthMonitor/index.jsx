import { Box, Typography, useTheme, TextField } from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL, GET_HEALTHMONITOR_URL } from "../../urlconstants";
import CustomTable from "../../components/common-components/custom-table";
import FactCheckIcon from "@mui/icons-material/FactCheck";
// import CustomGraph from "../../components/common-components/custom-graph";
const HealthMonitor = () => {
  const theme = useTheme();
  const [healthMonitorData, setHealthMonitorData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

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

  useEffect(() => {
    fetchData(`${selectedDate} 00:00:00`);
  }, [selectedDate]);

  const apiData = healthMonitorData.filter(
    (item) => item.application === "Axolot API"
  );
  apiData.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
  const sqlDbData = healthMonitorData.filter(
    (item) => item.application === "Axolot SQLDB"
  );
  sqlDbData.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "creationDate",
      headerName: "Created Date",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => params.value.split("T")[0],
    },
    {
      field: "creationTime",
      headerName: "Created Time",
      width: 150,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) =>
        params.row.creationDate.split("T")[1].split(".")[0],
    },
    {
      field: "result",
      headerName: "Result",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: params.value === 1 ? "green" : "red",
          }}
        >
          <FactCheckIcon
            sx={{
              color: "white",
              fontSize: 16,
            }}
          />
        </Box>
      ),
    },
    {
      field: "timeForResponse",
      headerName: "Time for Response",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <Box m="20px">
      <Header title="Health Monitor" subtitle="Health Monitor Page" />

      <Box display="flex" alignItems="center" mb="20px">
        <TextField
          type="date"
          label="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{ shrink: true }}
          sx={{
            width: 220,
            mr: 2,
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            },
          }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mb="20px">
        <Box width="48%">
          <Typography variant="h5" color={"#70d8bd"} gutterBottom>
            Axolot API Data
          </Typography>
          <CustomTable data={apiData} columns={columns} />
        </Box>

        <Box width="48%">
          <Typography variant="h5" color={"#70d8bd"} gutterBottom>
            Axolot SQLDB Data
          </Typography>
          <CustomTable data={sqlDbData} columns={columns} />
        </Box>
      </Box>
      {/* <Box mt="40px">
        <Typography variant="h5" color={"#70d8bd"} gutterBottom>
          Health Monitor Charts
        </Typography>
        <CustomChart apiData={apiData} sqlDbData={sqlDbData} />
      </Box> */}
      <Box>{/* <CustomGraph apiData={apiData} sqlDbData={sqlDbData} /> */}</Box>
    </Box>
  );
};

export default HealthMonitor;
