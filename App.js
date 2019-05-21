import React from 'react';
import HomeScreen  from './page/Home'
import DetailsScreen from './page/Detail'
import UserListScreen from './page/UserList'
import MyScreen from './page/My'
import CameraComponent from './component/camera'
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json


const HomeNav = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
})
const UserListNav = createStackNavigator({
  UserList: {
    screen: UserListScreen,
  },
})

// 二级页面写进一级页面中
const DetailsNav = createStackNavigator(
  {
    Details: {
      screen: DetailsScreen,
    },
    Camera: {
      screen: CameraComponent
    }
  },
)

const MyNav = createStackNavigator(
  {
    My: {
      screen: MyScreen,
    },
  },
);

export default createAppContainer(createBottomTabNavigator(
  {
    微信: HomeNav,
    通讯录: UserListNav,
    发现: DetailsNav,
    我: MyNav,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let badgeCount = 3
        switch(routeName) {
          case 'Home': 
            iconName = 'ios-options';
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
      activeTintColor: '#00c1de',
      inactiveTintColor: 'gray',
      showIcon: true
    },
  }
));