import AppStack from './app/router'
import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import AsyncStorage from '@react-native-community/async-storage';
import SignInScreen from './app/page/login';
import fetchRequest from './app/utils/fetch';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
      // 调用鉴权token 的接口，如果登录不过期 获取，过期 删除上一个userToken
      const userToken = await AsyncStorage.getItem('userToken');
      // this.props.navigation.navigate('Home')
      fetchRequest(
          '/get/user/info', 
          'POST', 
          {},
          userToken
      )
      .then(async (res) => {
          // alert(JSON.stringify(res))
          if(res.success) {
              this.props.navigation.navigate('Home')
          } else {
              AsyncStorage.removeItem('userToken');
              this.props.navigation.navigate('Login');
          }
          // console.log(res)
      })
      .catch( err => {
        this.props.navigation.navigate('Login');
      })
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const AuthStack = createStackNavigator({ SignIn: SignInScreen });
export default createAppContainer(createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
));