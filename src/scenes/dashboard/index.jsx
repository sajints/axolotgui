import { Box, Button, IconButton, Typography, useTheme, Drawer } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import useDashboard from "../../services/dashboard";
import { useState } from "react";
import useDevices from "../../services/devices";
import { DeviceTable } from "./DeviceTable";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: dashboardData } = useDashboard()
  const {data: devices} =useDevices()
  const [drawerOpen,setDrawerOpen] =useState(false);
  const [tableDrawerOpen, setTableDrawerOpen] = useState(false)
  const [tableType,setTableType] = useState('active-devices')
  const toggleDrawer= () =>{
    setDrawerOpen(!drawerOpen)
  }
  const getDataForLineChart=()=>{
    let responseData = dashboardData?.therapyTransmitted || []
    let allHospital = [];
    responseData.forEach(country=>{
      country?.hospitals?.forEach(hospital=>{
        allHospital.push({...hospital,country:country.country.name})
      })
    })
    console.log(allHospital)
   const transformedData = responseData.map(countryData=>{
      return {
        id: countryData?.country?.name,
        color: tokens("dark").greenAccent[500],
        data: allHospital.map(hospital=>{
          return {
            x:hospital.name ?? "dummy",
            y:countryData.country.name== hospital.country? hospital.therapyCount:0
          }
          })
      }
    })
    return transformedData
  }
  const toggleTableDrawer = () =>{
    setTableDrawerOpen(!tableDrawerOpen)
  }
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Drawer
     
      anchor={'right'}
      open={drawerOpen}
      onClose={toggleDrawer}
    >
     <Box sx={{width:288}}>
      Drawer
      </Box>
    </Drawer>
    <Drawer anchor="right" open={tableDrawerOpen} onClose={toggleTableDrawer}>
      <Box sx={{width:900}}>
       <DeviceTable data={tableType === 'active-devices'?devices["activeDevices"]: devices["inactiveDevices"]}/>
      </Box>
    </Drawer>
        <Header title="DASHBOARD" subtitle="Detailed dashboard view" />

        <Box>
        <Button
        onClick={toggleDrawer}
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
        }} variant="outlined">Filters</Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData.dailyTherapyCount}
            
            subtitle="Number of therapies today"
            progress="0.75"
            increase={`${dashboardData?.dailyTherapyPercentageDiff >= 0 ? `+ ${dashboardData?.dailyTherapyPercentageDiff}` : `- ${dashboardData?.dailyTherapyPercentageDiff}`}%`}
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{cursor:'pointer'}}
          onClick={()=>{
            setTableType('active-devices')
            toggleTableDrawer()
          }}
        >
          <StatBox
            title={dashboardData.activeDevices}
            subtitle="Active Devices"
            progress="0.50"
            increase={`${dashboardData?.activeDevicesPercentageDiff >= 0 ? `+ ${dashboardData?.activeDevicesPercentageDiff}` : `- ${dashboardData?.activeDevicesPercentageDiff}`}%`}
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{cursor:'pointer'}}
          onClick={()=>{
            setTableType('inactive-devices')
            toggleTableDrawer()
          }}
        >
          <StatBox
            title={dashboardData.inactiveDevices}
            subtitle="Inactive Devices"
            progress="0.30"
            increase={`${dashboardData?.inactiveDevicesPercentageDiff >= 0 ? `+ ${dashboardData?.inactiveDevicesPercentageDiff}` : `- ${dashboardData?.inactiveDevicesPercentageDiff}`}%`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={dashboardData.monthlyTherapyCount}
            subtitle="Number of Therapies this month"
            progress="0.80"
            increase={`${dashboardData?.monthlyTherapyPercentageDiff >= 0 ? `+ ${dashboardData?.monthlyTherapyPercentageDiff}` : `- ${dashboardData?.monthlyTherapyPercentageDiff}`}%`}
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Number of Therapies transmitted
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                43
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data={getDataForLineChart()} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Sync
            </Typography>
          </Box>
          {dashboardData?.recentSync?.map((transaction, i) => (
            <Box
              key={`${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.hospitalName}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.agentName}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.dateOfSync}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.count}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Health Monitor
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              {dashboardData?.monthlySyncCount} Sync done this month
            </Typography>
            <Typography>Includes all geographies, full & half sync</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Firmware Updates last 7 months
          </Typography>
         <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box> 
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
