import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { getLists } from "../ducks/authReducer";
import { Redirect } from "react-router-dom";
import CreateList from "./CreateList";
import Lists from "./Lists";
import axios from "axios";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    axios.get("/user/lists").then(async response => {
      await this.setState({ lists: response.data });
    });
  }
  componentDidUpdate() {
    axios.get("/user/lists").then(async response => {
      await this.setState({ lists: response.data });
    });
  }

  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div>
        <CreateList />
        <Lists lists={this.state.lists} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state.firebase;
  const { user } = state.auth;
  return {
    auth,
    user
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getLists: () => dispatch(getLists())
//   };
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(Dashboard);
