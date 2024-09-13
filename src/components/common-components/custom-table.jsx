import React from "react";
import { Box, useTheme, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { tokens } from "../../theme";

const CustomTable = ({ data, columns, dateFilter, onDateChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {onDateChange && (
        <Box display="flex" alignItems="center" mb="20px">
          <TextField
            type="date"
            label="Select Date"
            value={dateFilter}
            onChange={onDateChange}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 220, mr: 2 }}
          />
        </Box>
      )}
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            width: "100%",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
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
        <DataGrid rows={data} columns={columns} sx={{ width: "100%" }} />
      </Box>
    </Box>
  );
};

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  dateFilter: PropTypes.string,
  onDateChange: PropTypes.func, // onDateChange is now optional
};

export default CustomTable;
