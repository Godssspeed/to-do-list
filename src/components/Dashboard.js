import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CreateList from "./CreateList";
import Lists from "./Lists";

export class Dashboard extends Component {
  render() {
    const { auth } = this.props;
    // console.log(this.props.auth.uid);
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div>
        Dashboard
        <CreateList />
        <Lists />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state.firebase;
  return {
    auth
  };
};

export default connect(mapStateToProps)(Dashboard);
