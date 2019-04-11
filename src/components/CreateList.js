import React, { Component } from "react";

export class CreateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: []
    };
  }

  handleCreateList = e => {
    const { listItems } = this.state;
    const listArr = listItems;
  };

  render() {
    return (
      <div>
        <form>
          <input />
          {this.handleCreateList()}
        </form>
      </div>
    );
  }
}

export default CreateList;
