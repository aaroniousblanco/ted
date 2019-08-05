import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: '#1976d2',
    color: '#fff',
  },
  clapper: {
    height: '33px',
    position: 'absolute',
    right: '30px',
  },
});

const SimpleAppBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.bar}>
        <Toolbar>
          <Typography variant="h5" color="inherit">
            Ted Search
          </Typography>
          <img className={classes.clapper} src="images/clapperboard.svg" alt="clapperboard" />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default SimpleAppBar;
