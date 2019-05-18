import React from 'react';
import HomeScreen  from './page/Home'
import DetailsScreen from './page/Detail'
import UserListScreen from './page/UserList'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailsScreen,
  },
  UserList: {
    screen: UserListScreen,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);