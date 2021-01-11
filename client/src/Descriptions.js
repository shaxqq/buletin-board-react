import React, { useState } from "react";
import axios from "axios"
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
} from "@material-ui/core";
// import contentLinks from "./contentLinks.json";
// import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useTableSearch } from "./searchTabDesc"


const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(id, name, description) {
  return {
    id,
    name,
    description,
  };
}
const rows = [
  createData(1, "раздаёт", "2020-01-01"),
  createData(2, "подмена", "2020-01-02"),
  createData(3, "флап"),
  createData(4, "Cupcake"),
  createData(5, "Gingerbread"),
  createData(6, "Gingerbread"),
];



const Row = (props) => {
  const { row } = props;
  // console.log(row)
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
 

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{width: '5%'}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" >
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>{row.description}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};


export const Descriptions = () => {
  const [search, setSearch] = useState(null);
  const { filteredData, loading } = useTableSearch ({
    search, retrieve: rows
  })
  console.log(filteredData);
  console.log(loading);
  console.log(search);
  console.log(rows);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
            <TextField
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            </TableCell>
         
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <Row key={row.id} row={row} loading={loading} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

{
  /* <EnhancedTableToolbar numSelected={selected.length} handleSearch={this.handleSearch} 
value={this.searchValue} /> */
}
