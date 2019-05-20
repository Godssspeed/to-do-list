import React from "react";
import { connect } from "react-redux";
import { logout } from "../../ducks/authReducer";
import { Link } from "react-router-dom";

const SignedInLinks = props => {
  return (
    <div>
      <Link to="/">
        <button>Dasboard</button>
      </Link>
      <Link to="/login">
        <button onClick={props.logout}>Logout</button>
      </Link>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
