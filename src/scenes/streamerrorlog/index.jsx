import 'smart-webcomponents-react/source/styles/smart.default.css';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import useDevices from "../../services/devices";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL, GET_THERAPYLOG_URL, GET_ERRORLOG_URL } from "../../urlconstants";
import * as React from 'react';
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

export default function TherapyListStream() {
	const [loading, setLoading] = useState(false)
	const [TherapyLogData, setTherapyLogData] = useState({})

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
	const getTherapyLogData = async (value) => {
		setLoading(true)
		const params = value ? `?${value}` : ""
		try {
			console.log({API_BASE_URL} + {GET_THERAPYLOG_URL});
		  	const therapyLogs = await axios.get(`${API_BASE_URL}${GET_THERAPYLOG_URL}${params}`);
            setTherapyLogData(therapyLogs.data);
			console.log(therapyLogs.data);
		}
		catch (e) {
		  console.log(e)
		}
		finally {
		  setLoading(false)
		}
	
	  }

	  React.useEffect(() => {
		
		getTherapyLogData();
	  }, [])
	

	const columns = [{ field: "id", headerName: "ID" },
        { field: "date", headerName: "Date" },
        { field: "time", headerName: "Time" },
        { field: "therapy_profile_name", headerName: "Therapy Profile Name" },
        { field: "serial_name", headerName: "serial_name" },
        { field: "usage", headerName: "usage" },
        { field: "sw_version", headerName: "sw_version" },
        { field: "parameterset_version", headerName: "parameterset_version" },
        { field: "patient_id", headerName: "patient_id" },
        { field: "study_id", headerName: "study_id" },
        { field: "wire_harness_aid", headerName: "wire_harness_aid" },
        { field: "wire_harness_bid", headerName: "wire_harness_bid" },
        { field: "therapy_state", headerName: "therapy_state" },
        { field: "therapy_duration", headerName: "therapy_duration" },
        { field: "error_code", headerName: "error_code" },
        { field: "crc_code", headerName: "crc_code" },
        { field: "device_name", headerName: "device_name" },
        { field: "mobile_uuid", headerName: "mobile_uuid" },
    
	]

	return (
		<div>
		<div>
			<h2>Therapy Logs</h2>
			<Box
        m="40px 0 0 0"
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
          rows={TherapyLogData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
		
        </Box>
		</div>
		
		
	</div>
	);
}

