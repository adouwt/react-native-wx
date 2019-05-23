import React from 'react';
import HomeScreen  from './app/page/Home'
import DetailsScreen from './app/page/Detail'
import UserListScreen from './app/page/UserList'
import MyScreen from './app/page/My'
import CameraComponent from './app/component/camera'
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation'; // Version can be specified in package.json


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
const DetailsNav = createStackNavigator(
  {
    Details: {
      screen: DetailsScreen,
    },
  },
  {
  }
)

const MyNav = createStackNavigator(
  {
    My: MyScreen,
    Camera: CameraComponent
  },
);

export default createAppContainer(createBottomTabNavigator(
  // createBottomTabNavigator 两个参数，一个页面路由，一个是路由配置
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
          case '微信':
            iconName = 'logo-twitter';
            break;
          case '通讯录':
            iconName = 'md-arrow-back';
            break;
          case '发现':
            iconName = 'md-more';
            break;
          case '我':
            iconName = 'md-settings';
            break;
        }
        iconColor = `${focused ? '#00c1de' : 'gray'}`;

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
                <Text style={{ color: '#999', fontSize: 10, fontWeight: 'bold' }}>{badgeCount}</Text>
              </View>
            )}
          </View>
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: '#00c1de',
      inactiveTintColor: 'gray',
    },
    navigationOptions: {
      tabBarVisible: false
    }
  }
));