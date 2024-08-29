import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { API_BASE_URL, GET_DEVICES_URL } from "../../urlconstants";

export default function Device() {
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
        <h2>Active Devices</h2>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={deviceData.activeDevices}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>

      <div>
        <h2>Inactive Devices</h2>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={deviceData.inactiveDevices}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </div>
    </div>
  );
}
