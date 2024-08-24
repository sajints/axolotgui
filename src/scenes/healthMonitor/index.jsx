import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import HealthChart from "../../components/HealthChart";

const HelathMonitor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Health Monitor" subtitle="Health Monitor Page" />
      <Typography>
      
      <HealthChart/>
      </Typography>
          </Box>
          
  );
};

export default HelathMonitor;
