import React, { Component } from 'react';
import LoginPage from '../LoginPage';
import HomePage from '../HomePage';
import { Router } from '@reach/router';
import { connect } from 'react-redux';
import { updateCurrentUser } from '../LoginPage/actions';

class App extends Component {
  componentDidMount = () => {
    const { updateCurrentUser } = this.props;
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) updateCurrentUser(user.user);
  };

  render() {
    const { currentUser } = this.props;
    if (currentUser)
      return (
        <Router>
          <HomePage path='/' />
        </Router>
      );
    else
      return (
        <Router>
          <LoginPage default />
        </Router>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.login.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentUser: (user) => {
      dispatch(updateCurrentUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
