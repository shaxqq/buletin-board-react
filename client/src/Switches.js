import React, { useState } from "react";
import switches from "./switches.json";
import {
  Paper,
  Grid,
  Typography,
  Container,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "./styles";

export const Switches = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const listOptic = switches.optic.map((item) => {
    const childList = item.content.map((childItem) => {
      return (
        <Paper className={classes.paper} key={childItem.name}>
          <Grid container justify="space-between">
            <Grid>
              <Typography color="secondary">{childItem.name}</Typography>
            </Grid>
            <Grid container>
              <Typography>{childItem.command}</Typography>
              <Typography>{childItem.command1}</Typography>
              <Typography>{childItem.command2}</Typography>
              <Typography>{childItem.command3}</Typography>
              <Typography>{childItem.command4}</Typography>
              <Typography>{childItem.command5}</Typography>
              <Typography>{childItem.command6}</Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    });
    return (
      <div key={item.id}>
        <Typography className={classes.title}>{item.title}</Typography>
        <Typography className={classes.titleDesc} color="textSecondary">
          {item.description}
        </Typography>
        {childList}
      </div>
    );
  });
  const listNonOptic = switches.nonOptic.map((item) => {
    const childList = item.content.map((childItem) => {
      return (
        <Paper className={classes.paper} key={childItem.name}>
          <Grid container justify="space-between">
            <Grid>
              <Typography color="secondary">{childItem.name}</Typography>
            </Grid>
            <Grid container direction="column">
              <Typography>{childItem.command}</Typography>
              <Typography>{childItem.command1}</Typography>
              <Typography>{childItem.command2}</Typography>
              <Typography>{childItem.command3}</Typography>
              <Typography>{childItem.command4}</Typography>
              <Typography>{childItem.command5}</Typography>
              <Typography>{childItem.command6}</Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    });
    return (
      <div key={item.id}>
        <Typography className={classes.title}>{item.title}</Typography>

        {childList}
      </div>
    );
  });
  const listGateway = switches.gateway.map((item) => {
    const childList = item.content.map((childItem) => {
      return (
        <Paper className={classes.paper} key={childItem.name}>
          <Grid container justify="space-between">
            <Grid>
              <Typography color="secondary">{childItem.name}</Typography>
            </Grid>
            <Grid container direction="column">
              <Typography>{childItem.command}</Typography>
              <Typography>{childItem.command1}</Typography>
              <Typography>{childItem.command2}</Typography>
              <Typography>{childItem.command3}</Typography>
              <Typography>{childItem.command4}</Typography>
              <Typography>{childItem.command5}</Typography>
              <Typography>{childItem.command6}</Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    });
    return (
      <div key={item.id}>
        <Typography className={classes.title}>{item.title}</Typography>
        {childList}
      </div>
    );
  });

  return (
    <div className={classes.rootSwitches}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={(event, value) => {
            setValue(value);
          }}
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Оптические" id={0} />
          <Tab label="Не оптичские" id={1} />
          <Tab label="Шлюзы" id={2} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={(i) => setValue(i)}
        animateHeight
      >
        <Container maxWidth="lg">
          <Typography component="span" className={classes.switchesList}>
            {listOptic}
          </Typography>
        </Container>
        <Container maxWidth="lg">
          <Typography component="span" className={classes.switchesList}>
            {listNonOptic}
          </Typography>
        </Container>
        <Container maxWidth="lg">
          <Typography component="span" className={classes.switchesList}>
            {listGateway}
          </Typography>
        </Container>
      </SwipeableViews>
    </div>
  );
};
