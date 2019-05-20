import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles, Button } from "@material-ui/core";

const styles = theme => ({
  button: {
    background: theme.palette.alert.main,
    border: "2px solid",
    borderColor: theme.palette.alert.main,
    marginLeft: "1rem",
    padding: "1 1.5rem",
    letterSpacing: "3px"
  },
  editButton: {
    border: "2px solid",
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.dark,
    padding: "1 1.5rem",
    letterSpacing: "2px"
  },
  buttonDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  listInfo: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  list: {
    listStyleType: "none",
    padding: "0",
    fontSize: "1.3rem",
    fontWeight: "bold"
  }
});

const ListDetails = props => {
  const { items, classes, deleteFn, list_id, id } = props;
  console.log(props);
  const itemArr = items.split(",");
  const list = itemArr.map(e => {
    return <li>{e}</li>;
  });
  console.log(itemArr);

  return (
    <div className={classes.listInfo}>
      <div className={classes.buttonDiv}>
        <Button className={classes.editButton}>Edit</Button>
        <Button
          className={classes.button}
          onClick={() => deleteFn(list_id, id)}
        >
          Delete
        </Button>
      </div>
      <ul className={classes.list}>{list}</ul>
    </div>
  );
};

ListDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListDetails);

// import React from "react";

// const ListDetails = props => {
//   const { items } = props;
//   const itemArr = items.split(",");
//   const list = itemArr.map(e => {
//     return <li>{e}</li>;
//   });
//   console.log(itemArr);
//   return (
//     <div>
//       <ul>{list}</ul>
//     </div>
//   );
// };

// export default ListDetails;
