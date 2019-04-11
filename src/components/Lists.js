import React, { Component } from "react";
import { connect } from "react-redux";
import { getLists } from "../ducks/authReducer";

export class Lists extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // componentDidMount() {
  //   this.props.getLists();
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps) {
  //     this.props.getLists();
  //   }
  // }

  render() {
    console.log(this.props);
    const { lists } = this.props;
    return <div>{lists}</div>;
  }
}

const mapStateToProps = state => {
  const { lists } = state.auth;
  return {
    lists
  };
};

export default connect(
  mapStateToProps,
  { getLists }
)(Lists);
