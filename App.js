import React from 'react';
import HomeScreen  from './page/Home'
import DetailsScreen from './page/Detail'
import UserListScreen from './page/UserList'
import MyScreen from './page/My'
import { View } from 'react-native';
import { createAppContainer, createBottomTabNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

const AppNavigator = createBottomTabNavigator(
  {
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
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          // Sometimes we want to add badges to some icons. 
          // You can check the implementation below.
        } else if (routeName === 'UserList') {
          iconName = `ios-options`;
        }

        // You can return any component that you like here!
        return <View name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(AppNavigator);