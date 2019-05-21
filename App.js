import React from 'react';
import HomeScreen  from './page/Home'
import DetailsScreen from './page/Detail'
import UserListScreen from './page/UserList'
import MyScreen from './page/My'
import CameraComponent from './component/camera'
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text } from 'react-native';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'; // Version can be specified in package.json

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    UserList: {
      screen: UserListScreen,
    },
    Details: {
      screen: DetailsScreen,
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
        let badgeCount = 3
        switch(routeName) {
          case 'Home': 
            iconName = 'logo-twitter';
            break;
          case 'UserList': 
            iconName = 'md-arrow-back';
            break;
          case 'Details': 
            iconName = 'md-more';
            break;
          case 'My': 
            iconName = 'md-settings';
            break;
        }
        iconColor = `${focused ? 'tomato' : 'gray'}`;

        return (
          <View>
            <Icon name={iconName} size={18} color={iconColor}></Icon>
            { routeName === 'Details' && badgeCount > 0 && (
              <View style={{
                // If you're using react-native < 0.57 overflow outside of the parent
                // will not work on Android, see https://git.io/fhLJ8
                position: 'absolute',
                right: -6,
                top: -3,
                backgroundColor: 'red',
                borderRadius: 6,
                width: 12,
                height: 12,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{badgeCount}</Text>
              </View>
            )}
          </View>
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(AppNavigator);