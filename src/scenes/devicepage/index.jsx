import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

import { API_BASE_URL, GET_DEVICES_URL } from "../../urlconstants";

export default function Device() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState({
    activeDevices: [],
    inactiveDevices: [],
  });

  const getDevicesData = async (value) => {
    setLoading(true);
    const params = value ? `?${value}` : "";
    try {
      const response = await axios.get(
        `${API_BASE_URL}${GET_DEVICES_URL}${params}`
      );
      console.log("API Response:", response.data); // Log API response

      // Check if response is an array and contains data
      const data = Array.isArray(response.data)
        ? response.data[0]
        : response.data;
      setDeviceData({
        activeDevices: data.activeDevices || [],
        inactiveDevices: data.inactiveDevices || [],
      });
    } catch (error) {
      console.error("Error fetching data:", error); // Log error details
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDevicesData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "countryId", headerName: "Country Id", width: 150 },
    { field: "hospitalId", headerName: "Hospital Id", width: 150 },
    { field: "name", headerName: "DeviceId", width: 150 },
    { field: "lastSync", headerName: "Last Synced Date", width: 180 },
    { field: "lastTherapy", headerName: "Last Therapy", width: 180 },
    { field: "lastError", headerName: "Last Error", width: 180 },
    { field: "firmwareVersion", headerName: "F/w Version", width: 150 },
  ];

  return (
    <div>
      <div>
        <Box m="0px 0px 0 15px">
          <h2>Active Devices</h2>
        </Box>
        <div>
          <Box
            m="40px 15px 0 15px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={deviceData.activeDevices}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </div>
      </div>

      <div>
        <Box m="10px 0px 0 15px">
          <h2>Inactive Devices</h2>
        </Box>
        <div>
          <Box
            m="20px 15px 0 15px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={deviceData.inactiveDevices}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </div>
      </div>
    </div>
  );
}
