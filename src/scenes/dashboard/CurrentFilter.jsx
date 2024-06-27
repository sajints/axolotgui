import { Box, Chip, Grid, IconButton } from "@mui/material"
import { FilterContext } from "../../context/FilterContext";
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
export const CurrentFilter = ({getDashboardData , getDevicesData}) => {
    const { filterData, finalFilterData, setFinalFilterData } = React.useContext(FilterContext);
    const [isOpen, setIsOpen] = React.useState(true);
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleRemove = (key) => {
        const updatedFilterData = { ...finalFilterData };
        delete updatedFilterData[key];
        setFinalFilterData(updatedFilterData);
        let value = "";
        Object.keys(updatedFilterData).forEach((key,index)=>{
            value +=`${key}=${updatedFilterData[key].map(item => item.id).join(',')}`;
            if(index !== Object.keys(updatedFilterData).length-1){
                value += "&";
            }
        });

        getDashboardData(value)
        getDevicesData(value)
    }
    if (!isOpen) return null
    return (
        <Box sx={{ position: 'relative' }}>

            <Grid container spacing={2}  >
                {Object.keys(finalFilterData).map((key) => {
                    const labels = finalFilterData[key].map(item => item.label).join(',');
                    return (
                        <Grid item key={key}   >
                            <Chip label={<Box display="flex" alignItems="center" >{`${key}:   ${labels}`} <IconButton onClick={() => handleRemove(key)} size="small" sx={{ marginLeft: 1, color: "white" }} ><CloseIcon /></IconButton ></Box>} variant="outlined" sx={{ margin: "4px", padding: "0 8px" }} />
                        </Grid>

                    )
                })}
            </Grid>
        </Box>
    )
}


