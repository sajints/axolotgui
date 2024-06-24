import { Box, Chip, Grid } from "@mui/material"
import { FilterContext } from "../../context/FilterContext";
import * as React from 'react';
export const CurrentFilter = () => {
    const { filterData } = React.useContext(FilterContext);
    return(
    <Box>
    
    {/* <Grid container spacing={2}  >
        {Object.keys(filterData).map(key =>(
           filterData[key].map(item =>(
            <Grid item  key={`${key}-${item.id}`}  >
                <Chip label={item} variant="outlined" />
            </Grid>
           )) 
        ))}
    </Grid> */}
    </Box>
    )
}


