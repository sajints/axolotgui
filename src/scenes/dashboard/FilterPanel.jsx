import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { countryFilterData, hospitalFilterData } from "../../data/mockData";
import { Box, Button, IconButton, Typography, Drawer, Divider } from "@mui/material";
import { FilterContext } from '../../context/FilterContext';
import useDashboard from '../../services/dashboard';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
export const FilterPanel = ({ toggleDrawer }) => {
    const theme = useTheme();
    const { filterData, setData, setFilterData } = React.useContext(FilterContext);
  const {getDashboardData } = useDashboard()

    const handleChangeCountry = (event) => {
        const {
            target: { value },
        } = event;
        setData(
            "country",
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    const handleChangeHospital = (event) => {
        const {
            target: { value },
        } = event;
        setData(
            "hospital",
            typeof value === 'string' ? value.split(',') : value,
        );
    }
    const reset = () => {
        setFilterData([])
    }

    const apply = () => {
        console.log(filterData);
        let value = "";
        Object.keys(filterData).forEach((key,index)=>{
            value +=`${key}=${filterData[key].join(',')}`;
            if(index !== Object.keys(filterData).length-1){
                value += "&";
            }
        });

        getDashboardData(value)
        toggleDrawer()
    }

    return (
        <div>
            <Box sx={{ width: "100%", padding: '8px', display: 'flex', alignItems: 'center' }}>
                <FilterListOutlinedIcon /> {" "}
                <Typography variant="h3" sx={{ fontSize: '20px' }}>Filters</Typography>
            </Box>
            <Divider />
            <Box m={2}><FormControl fullWidth>
                <InputLabel id="demo-multiple-name-label">Country</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={filterData["country"] || []}
                    onChange={handleChangeCountry}
                    input={<OutlinedInput label="Country" />}
                    MenuProps={MenuProps}
                >
                    {countryFilterData.options.map((op) => (
                        <MenuItem
                            key={op.id}
                            value={op.id}
                            style={getStyles(op.label, filterData["country"] || [], theme)}
                        >
                            {op.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl></Box>
            <Box>


                <Box m={2}><FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">hospital</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={filterData["hospital"] || []}
                        onChange={handleChangeHospital}
                        input={<OutlinedInput label="hospital" />}
                        MenuProps={MenuProps}
                    >
                        {hospitalFilterData.options.map((op) => (
                            <MenuItem
                                key={op.id}
                                value={op.id}
                                style={getStyles(op.label, filterData["hospital"] || [], theme)}
                            >
                                {op.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl></Box>

            </Box>

            <Box style={{ width: '100%', position: 'absolute', bottom: 10 }}>
                <Divider />

                <Box mt={1} p={1} style={{ gap: '10px', display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button variant='contained' style={{ width: "50%" }} onClick={reset}>Reset</Button>
                    <Button variant='contained' style={{ width: "50%" }} onClick={apply}>Apply</Button>
                </Box>
            </Box>

        </div>

    )
}
