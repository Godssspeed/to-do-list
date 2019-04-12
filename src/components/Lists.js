import React, { Component } from "react";
import { connect } from "react-redux";
import { getLists } from "../ducks/authReducer";

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

  render() {
    console.log(this.props);
    const { lists } = this.props;
    const listTitle = lists.map(e => {
      return <h4 key={e.id}>{e.title}</h4>;
    });
    return <div>{listTitle}</div>;
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

export default connect()(Lists);
// mapStateToProps
// mapDispatchToProps
