import 'smart-webcomponents-react/source/styles/smart.default.css';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import useDevices from "../../services/devices";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL, GET_ERRORLOG_URL } from "../../urlconstants";
import * as React from 'react';
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Collapsible  from "../../components/common-components/divtoggle";

export default function ErrorLogStream() {
	const [loading, setLoading] = useState(false)
	const [ErrorLogData, setErrorLogData] = useState({})
 
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
	const getErrorLogData = async (value) => {
		setLoading(true)
		const params = value ? `?${value}` : ""
		try {
			console.log({API_BASE_URL} + {GET_ERRORLOG_URL});
		  	const ErrorLogs = await fetch(`${API_BASE_URL}${GET_ERRORLOG_URL}${params}`);
        // const jsonData = JSON.parse(ErrorLogs.data);
            setErrorLogData(await ErrorLogs.json());
            
			// console.log("jsonData=",typeof ErrorLogs);
		}
		catch (e) {
		  console.log(e)
		}
		finally {
		  setLoading(false)
		}
	
	  }

	  // React.useEffect(() => {
		
		// getErrorLogData();
	  // }, [])
    
    React.useEffect(() => {
      const id = setInterval(() => {
        getErrorLogData();
      }, 6000);
      return () => clearInterval(id);
   }, []);

	const columns = [{ field: "id", headerName: "ID" },
        { field: "date", headerName: "Date" },
        { field: "time", headerName: "Time" },
        { field: "Error_profile_name", headerName: "Error Profile Name" },
        { field: "serial_name", headerName: "serial_name" },
        { field: "usage", headerName: "usage" },
        { field: "sw_version", headerName: "sw_version" },
        { field: "parameterset_version", headerName: "parameterset_version" },
        { field: "patient_id", headerName: "patient_id" },
        { field: "study_id", headerName: "study_id" },
        { field: "wire_harness_aid", headerName: "wire_harness_aid" },
        { field: "wire_harness_bid", headerName: "wire_harness_bid" },
        { field: "Error_state", headerName: "Error_state" },
        { field: "Error_duration", headerName: "Error_duration" },
        { field: "error_code", headerName: "error_code" },
        { field: "crc_code", headerName: "crc_code" },
        { field: "device_name", headerName: "device_name" },
        { field: "mobile_uuid", headerName: "mobile_uuid" },
    
	]
  // const dataArray = Object.values(ErrorLogData);

  
	return (

		<div>
			<h2>Error Logs</h2>
      <div >

        {Array.isArray(ErrorLogData) && ErrorLogData.map((item,index) => (
          
          <Collapsible header="">
          
              {JSON.stringify(item, null, 2)} 
            </Collapsible>
   
        ))}
    </div>			
		</div>
		
		
	
	);
}

