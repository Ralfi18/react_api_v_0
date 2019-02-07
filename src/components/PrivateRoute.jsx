import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getData} from '../DbHelpers/storageHelper';

// const user = (table) => {
//   const localStorageBooks = localStorage.getItem(table);
//   if (localStorage){
//     return JSON.parse(localStorageBooks);
//   }
//   return false;
// };

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render = {(props) =>
      getData('user') && getData('user').isAuth === "1" ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default withRouter(PrivateRoute);
