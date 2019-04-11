import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { logout } from "../ducks/authReducer";
import { Link } from "react-router-dom";
const Navbar = props => {
  return (
    <div>
      <Link to="/login">
        <button>Sign in</button>
      </Link>
      <Link to="/signup">
        <button>Sign up</button>
      </Link>
      <Link to="/">
        <button>Dasboard</button>
      </Link>
      <Link to="/login">
        <button onClick={props.logout}>Logout</button>
      </Link>
    </div>
  );
};

const mapStateToProps = state => {
  const { auth } = state.firebase;
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
