import React, { Component } from "react";
import { connect } from "react-redux";
import { createList } from "../ducks/authReducer";

export class CreateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleInput: "",
      listItem: [],
      title: "",
      newItem: ""
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
    this.props.createList(title, listItem);
  };

  render() {
    console.log(this.state);
    const { listItem, title } = this.state;
    const listToMap = listItem.map((e, i) => {
      return <li key={i}>{e}</li>;
    });
    return (
      <div>
        <div>
          <form onSubmit={this.handleListTitle}>
            <input
              ref={el => (this.inputTitle = el)}
              onChange={this.handleTitleChange}
            />
            <button type="submit">Add Title</button>
          </form>
          <h3>{this.state.title}</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={el => (this.inputTitle = el)}
            onChange={this.handleChange}
          />
          <button type="submit" onClick={this.sendThru}>
            Add
          </button>
        </form>
        <ul>{listToMap}</ul>
        <div>
          <button onClick={this.saveListToDb}>Save List</button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { createList }
)(CreateList);
