import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import axios from "axios";
import { API_BASE_URL, GET_HEALTHMONITOR_URL } from "../urlconstants";
import { ReportGmailerrorred } from "@mui/icons-material";
const HealthChart = () => {
    const [chartData,setChartData] = useState([])  

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await axiosl.get(`${API_BASE_URL}${GET_HEALTHMONITOR_URL}${params}`);
                setChartData(response.data)
            }catch (error){
                console.log(error,"error");
                
            }
        }
        fetchData = ()
    },[])
        return(
        <Box m="20px">
            HealthChart
        </Box>
    )
};

export default HealthChart