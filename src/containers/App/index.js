import React, { Component } from 'react';
import LoginPage from '../LoginPage';
import UserListPage from '../UserListPage';
import RoomPage from '../RoomPage';
import { Router } from '@reach/router';
import { connect } from 'react-redux';
import { updateCurrentUser } from './actions';
import CheckInPage from '../CheckInPage';

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
          <RoomPage path='/' />
          <UserListPage path='/users' />
          <CheckInPage path='/checkin' />
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
    currentUser: state.global.currentUser,
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
