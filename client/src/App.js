import React from "react";
import { CreatePost } from "./CreatePost";
import { AllPost } from "./AllPost";
import { Route, Switch } from "react-router-dom";
import { Box, Container } from "@material-ui/core";
import { Navbar } from "./Navbar";
import { Switches } from "./Switches";
import { useStyles } from "./styles";

export const App = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <div className={classes.rootContent}>
        <Container className={classes.rootContainer}>

            <Switch>
              <Route path="/" component={AllPost} exact />
              <Route path="/switches" component={Switches} />
            </Switch>

        </Container>
      </div>
    </div>
  );
};

//     <Route path='/post' component={ CreatePost } />
