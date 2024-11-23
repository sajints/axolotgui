import 'smart-webcomponents-react/source/styles/smart.default.css';
import { Smart, Grid } from 'smart-webcomponents-react/grid';
import useDevices from "../../services/devices";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL, GET_TELEMETRYLOG_URL, GET_ERRORLOG_URL } from "../../urlconstants";
import * as React from 'react';
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Collapsible  from "../../components/common-components/divtoggle";


export default function TherapyListPage() {
	const [loading, setLoading] = useState(false)
	const [TherapyLogData, setTherapyLogData] = useState({})

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
	const getTherapyLogData = async (value) => {
		setLoading(true)
		const params = value ? `?${value}` : ""
		try {
			console.log({API_BASE_URL} + {GET_TELEMETRYLOG_URL});
		  	const therapyLogs = await axios.get(`${API_BASE_URL}${GET_TELEMETRYLOG_URL}${params}`);
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
	

	

	return (
		<div>
			<h2>Error Logs</h2>
      <div >

        {Array.isArray(TherapyLogData) && TherapyLogData.map((item,index) => (
          
          <Collapsible header="">
          
              {JSON.stringify(item, null, 2)} 
            </Collapsible>
   
        ))}
    </div>			
		</div>
	);
}

