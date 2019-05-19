import React from 'react';
import HomeScreen  from './page/Home'
import DetailsScreen from './page/Detail'
import UserListScreen from './page/UserList'
import MyScreen from './page/My'
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
  My: {
    screen: MyScreen,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);