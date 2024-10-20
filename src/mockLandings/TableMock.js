import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("LPD-10-2024- 3/7", 159, 6.0),
  createData("LPD-10-2024- 2/7", 237, 9.0),
  createData("LPD-10-2024- 4/7", 262, 16.0),
  createData("LPD-10-2024- 5/7", 305, 3.7),
  createData("LPD-10-2024- 6/7", 356, 16.0),
];

export default function TableMock() {
  return (
    <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
      <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Payment Title</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Per cent rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
