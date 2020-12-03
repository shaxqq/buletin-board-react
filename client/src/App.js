import React from 'react';
import { CreatePost } from './CreatePost';
import { AllPost } from './AllPost';
import { Route } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import { useStyles } from './styles';

export const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    <Container className={classes.rootContainer} >
      <Route path='/' component={ AllPost } exact />
    </Container>
    </div>
  );
}

//     <Route path='/post' component={ CreatePost } />