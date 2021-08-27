import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "./Menu"
import { Weather } from './Weather'
import { useStyles } from './styles'

export const Navbar = () => {
  const classes = useStyles()
   return (
    <AppBar className={classes.rootNav} color='default' >
      <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
        <Menu /> 
        <Typography variant="h6">Доска объявлений</Typography>
        </div>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};
