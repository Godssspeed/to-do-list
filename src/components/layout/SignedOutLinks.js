import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const styles = theme => ({
  signInButton: {
    color: theme.palette.secondary.dark,
    padding: "1 1.5rem",
    letterSpacing: "2px",
    textDecoration: "none"
  },
  signUpButton: {
    border: "2px solid",
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.dark,
    padding: "1 1.5rem",
    letterSpacing: "2px",
    marginLeft: "1rem"
  },
  navbar: {
    width: "90%",
    display: "flex",
    alignContent: "center",
    justifyContent: "flex-end",
    marginTop: "2rem"
  }
});

const SignedOutLinks = props => {
  const { classes } = props;
  return (
    <div className={classes.navbar}>
      <Link to="/login">
        <Button className={classes.signInButton} disableUnderline={true}>
          Sign in
        </Button>
      </Link>
      <Link to="/signup">
        <Button className={classes.signUpButton}>Sign up</Button>
      </Link>
    </div>
  );
};

SignedOutLinks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignedOutLinks);
