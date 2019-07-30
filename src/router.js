import React from 'react';
import HomeScreen  from './page/Home'
import DiscoverScreen from './page/Discover'
import UserListScreen from './page/UserList'
import MyScreen from './page/My'
import CameraComponent from './component/camera'
import ChatScreen from './page/Chat'
import FriendCircle from './page/friendCircle'
import LoginScreen from './page/login'
import RegisterScreen from './page/register'
import MyLocationScreen from './page/MyLocation'
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json


const HomeNav = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions:{
      headerTitle:'微信',
      headerBackTitle:null,
    }
  },
})
const UserListNav = createStackNavigator({
  UserList: {
    screen: UserListScreen,
  },
})

// 二级页面写进一级页面中
const DiscoverNav = createStackNavigator(
  {
    Discover: {
      screen: DiscoverScreen,
    },
  }
)

const MyNav = createStackNavigator(
  {
    My: MyScreen,
  }
);

let BottomNav = createBottomTabNavigator(
  // createBottomTabNavigator 两个参数，一个页面路由，一个是路由配置
  {
    微信: HomeNav,
    通讯录: UserListNav,
    发现: DiscoverNav,
    我: MyNav,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let badgeCount = 3
        switch(routeName) {
          case '微信':
            iconName = 'ios-text';
            break;
          case '通讯录':
            iconName = 'md-person-add';
            break;
          case '发现':
            iconName = 'md-compass';
            break;
          case '我':
            iconName = 'ios-person';
            break;
        }
        iconColor = `${focused ? '#1AAD19' : '#4D4D4D'}`;

        return (
          <View>
            <Icon name={iconName} size={18} color={iconColor}></Icon>
            { routeName === '发现' && badgeCount > 0 && (
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
                alignItems: 'center',
                color: '#fff'
              }}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{badgeCount}</Text>
              </View>
            )}
          </View>
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: '#1AAD19',
      inactiveTintColor: '#4D4D4D',
    },
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

let RootNav = createStackNavigator({
  BottomNav: {
    screen: BottomNav,
    navigationOptions: ({ navigation, screenProps }) => {
      return {
        header: null,
      };
    }
  },
  Camera: {
    screen: CameraComponent
  },
  Chat: {
    screen: ChatScreen
  },
  FriendCircle: {
    screen: FriendCircle
  },
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  },
  MyLocation: {
    screen: MyLocationScreen
  }
})



export default RootNav;