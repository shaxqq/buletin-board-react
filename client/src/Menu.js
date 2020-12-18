import React, {useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Drawer,
    List,
    ListItemText,
    ListItem,
    IconButton,
    Collapse} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import menuList from "./menuList.json"
import logo from "./logo.jpg"
import { Link } from "react-router-dom"
import { useStyles } from './styles'


export const Menu = () => {
    const classes = useStyles()
    const [state, setState] = useState({ left: false });
    const [open, setOpen] = useState(false);

  const togglePanel = (side, open) => e => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setState({ state, [side]: open });
  };

  const handleClick = item => {
    // console.log(open);
    // console.log(!open[item]);
    setOpen(open => ({ [item]: !open[item] }));
  };

  const menu = menuList;
  const listItems = menu.data.map(subOption => {
    if (!subOption.children) {
      return (
        <ListItem
          button
          className={classes.item}
          component={Link}
          to={subOption.url}
          primory="All"
          key={subOption.id}
          onClick={togglePanel(false)}
        >
          <ListItemText primary={subOption.title} key={subOption.id} />
        </ListItem>
      );
    }
    const listChild = subOption.children.map(subChild => {
      return (
        <ListItem
          button
          className={classes.nested}
          component={Link}
          key={subChild.id}
          to={subChild.url}
          onClick={togglePanel(false)}
        >
          <ListItemText primary={subChild.title} />
        </ListItem>
      );
    });
    return (
      <List component="ul" disablePadding key={subOption.id}>
        <ListItem
          button
          className={classes.item}
          component={Link}
          primory={subOption.title}
          onClick={() => handleClick(subOption.title)}
          key={subOption.id}
          to={'#'}
        >
          <ListItemText primary={subOption.title} />
          {open[subOption.title] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open[subOption.title]} className={classes.listActive}>
          {listChild}
        </Collapse>
      </List>
    );
  });

  const sideList = () => (
    <div className={classes.bgImg}>
      <List className={classes.list} component="ul">
        <ListItem button className={classes.itemLogo} divider component="li">
          <img src={logo} alt="" />
        </ListItem>
        {listItems}
      </List>
    </div>
  );

  return (
    <div>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        onClick={togglePanel("left", true)}
      >
        <MenuIcon /> 
      </IconButton>
      
      <Drawer open={state.left} onClose={togglePanel("left", false)} >
        {sideList("left")}
      </Drawer>
    </div>
  );
}
