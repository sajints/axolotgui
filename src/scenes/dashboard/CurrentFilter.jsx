import { Box, Chip, Grid, IconButton } from "@mui/material"
import { FilterContext } from "../../context/FilterContext";
import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
export const CurrentFilter = () => {
    const { filterData, finalFilterData } = React.useContext(FilterContext);
    const [isOpen , setIsOpen] = React.useState(true);
    const handleClose = () =>{
        setIsOpen(false);
    };
    if(!isOpen) return null
    return (
        <Box sx={{position:'relative'}}>
{/* <IconButton onClick={handleClose} color="white" style={{position:'absolute' ,top:8,right:8}}  >
    <CloseIcon/>
</IconButton> */}
            <Grid container spacing={2}  >
                {Object.keys(finalFilterData).map((key) => {
                    const labels = finalFilterData[key].map(item => item.label).join(',');
                    return (
                        <Grid item key={key}   >
                            <Chip label={`${key}:   ${labels}`} variant="outlined" sx={{margin:"4px" , padding:"0 8px"}} />
                        </Grid>

                    )
                })}
            </Grid>
        </Box>
    )
}


