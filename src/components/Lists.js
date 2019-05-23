import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { deleteItems, deleteTitle } from "../ducks/authReducer";
// import { getLists } from "../ducks/authReducer";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import PropTypes from "prop-types";
import { withStyles, Button } from "@material-ui/core";
import ListDetails from "./ListDetails";

const styles = theme => ({
  main: {
    width: "100vw",
    height: "50vh",
    margin: "0 auto",
    marginTop: "1rem",
    background: theme.palette.primary.main,
    padding: "1rem",
    overflowY: "scroll"
  },
  title: {
    fontSize: "1.5rem"
  },
  panel: {
    width: "90%",
    border: "2px inset",
    borderColor: theme.palette.secondary.main
  }
});

export class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount() {
  //   this.props.getLists();
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.lists !== prevProps.lists) {
  //     this.props.getLists();
  //   }
  // }

  handleDelete = (list_id, id) => {
    this.props.deleteItems(list_id).then(response => {
      this.props.deleteTitle(id);
    });
  };

  render() {
    const { lists, classes } = this.props;
    console.log(lists);
    const listTitle =
      lists &&
      lists.map(e => {
        return (
          <ExpansionPanel
            key={e.id}
            className={classes.panel}
            onClick={this.handleExpanded}
          >
            <ExpansionPanelSummary>
              <Typography className={classes.title}>{e.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ListDetails
                items={e.list_item}
                deleteFn={this.handleDelete}
                list_id={e.list_id}
                id={e.id}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      });
    return (
      <div>
        <Card className={classes.main}>
          <CardContent>{listTitle}</CardContent>
        </Card>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   const { lists } = state.auth;
//   return {
//     lists
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     getLists: () => dispatch(getLists())
//   };
// };

Lists.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(
    null,
    { deleteItems, deleteTitle }
  ),
  withStyles(styles)
)(Lists);

// mapStateToProps
// mapDispatchToProps
