import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
export const DeviceTable = ({data}) =>{
    const headers = Object.keys(data[0])
    return  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
            {
                headers.map(h=>{
                  return  <TableCell align="right">{h}</TableCell>
                })
            }
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {
                headers.map(h=>{
                    return  <TableCell align="right">{row[h]}</TableCell>
                })
            }
          
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}