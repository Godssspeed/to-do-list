import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createList } from "../ducks/authReducer";
import { withTheme, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

const styles = theme => ({
  main: {
    width: "100vw",
    height: "50vh",
    margin: "0 auto",
    marginTop: "5rem",
    background: theme.palette.primary.main,
    padding: "1rem"
  },

  addButton: {
    border: "2px solid",
    borderColor: theme.palette.secondary.dark,
    color: theme.palette.secondary.dark,
    fontWeight: "bold",
    background: theme.palette.primary.light,
    marginLeft: "2rem",
    letterSpacing: "2px"
  },
  button: {
    background: theme.palette.secondary.main,
    marginTop: "2rem",
    padding: "1 1.5rem",
    letterSpacing: "2px"
  },
  form: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    margin: "0 auto"
  },
  itemInput: {
    width: "100%",
    height: "5rem ",
    margin: " 0 1rem"
  }
});

export class CreateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInput: "",
      listItem: [],
      title: "",
      newItem: "",
      edit: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const pushItem = this.state.listItem;
    pushItem.push(this.state.newItem);
    this.setState({ listItem: pushItem });
    this.setState({ newItem: "" });
  };

  handleListTitle = e => {
    e.preventDefault();
    this.setState({ title: this.state.titleInput });
    this.setState({ titleInput: "" });
    this.setState({ edit: false });
  };

  handleChange = e => {
    this.setState({ newItem: e.target.value });
  };
  handleTitleChange = e => {
    this.setState({ titleInput: e.target.value });
  };
  // TO CLEAR INPUT AFTER ADD
  sendThru = () => {
    this.inputTitle.value = "";
  };

  saveListToDb = () => {
    const { listItem, title } = this.state;
    this.props.createList(title, listItem).then(res => {
      this.setState({ newItem: "" });
      this.setState({ title: "" });
    });
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  render() {
    console.log(this.state);
    const { listItem, title, edit } = this.state;
    const { classes } = this.props;
    const listToMap =
      listItem &&
      listItem.map((e, i) => {
        return <li key={i}>{e}</li>;
      });
    return (
      <div>
        <Paper className={classes.main}>
          <div>
            <form onSubmit={this.handleListTitle}>
              <FormControl>
                {edit ? (
                  <Input
                    placeholder="Add a Title"
                    ref={el => (this.inputTitle = el)}
                    onChange={this.handleTitleChange}
                    autoFocus
                  />
                ) : title ? null : (
                  <Input
                    placeholder="Add a Title"
                    ref={el => (this.inputTitle = el)}
                    onChange={this.handleTitleChange}
                  />
                )}
              </FormControl>
              {/* <button type="submit">Add Title</button> */}
            </form>
            <Typography variant="h4" onClick={this.toggleEdit}>
              {this.state.title}
            </Typography>
          </div>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <FormControl>
              <textarea
                className={classes.itemInput}
                placeholder="Add an item"
                ref={el => (this.inputTitle = el)}
                onChange={this.handleChange}
              />
            </FormControl>
            <Button
              className={classes.addButton}
              type="submit"
              onClick={this.sendThru}
            >
              Add
            </Button>
          </form>
          <Typography variant="ul">{listToMap ? listToMap : null}</Typography>
          <div>
            <Button className={classes.button} onClick={this.saveListToDb}>
              Save List
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

CreateList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  connect(
    null,
    { createList }
  ),
  withTheme(),
  withStyles(styles)
)(CreateList);
