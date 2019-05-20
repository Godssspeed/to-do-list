import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { logout } from "../../ducks/authReducer";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
const Navbar = props => {
  const { auth } = props;
  return <div>{auth.uid ? <SignedInLinks /> : <SignedOutLinks />}</div>;
};

const mapStateToProps = state => {
  const { auth } = state.firebase;
  return {
    auth
  };
};

export default connect(mapStateToProps)(Navbar);
