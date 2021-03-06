import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-community/async-storage';
import fetchRequest from '../utils/fetch'

class MyScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: '我',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'left'
          },
          headerRight: (
            <View style={{marginRight: 20}}>
              <TouchableOpacity
                onPress={navigation.getParam('takePicture')}
                marginRight="20"
              >
                <Icon name="md-camera" size={18} color="#333"></Icon>
              </TouchableOpacity>
            </View>
          ),
        };
    }

    constructor(props) {
        super(props)
        this.state = {
            photos: [],
            myMsg: {},
            userToken: ''
        }
    }

    componentDidMount() {
      new Promise((resolve, rejects) => {
        let userToken =  AsyncStorage.getItem('userToken');
        this.setState({
          userToken: userToken
        })
        resolve(userToken)
      })
      .then( userToken => {
        // 获取我的信息
        fetchRequest('/get/user/info', 'POST', 
        {},
        userToken
        )
        .then(res => {
          console.log(res)
          if(res.success) {
            this.setState({
              MyId: res.data._id ,
              myMsg: res.data
            })
          }
        })
      })
      this.props.navigation.setParams({ takePicture: this._takePicture });
    }
    
    _takePicture = () => {
        this.props.navigation.navigate('Camera')
    };
    
    takePicture = () => {
        this.props.navigation.navigate('Camera')
    };
    toLogin = () => {
      this.props.navigation.navigate('Login')
    };
    toExit = () => {
      new Promise((resolve, rejects) => {
        let userToken =  AsyncStorage.getItem('userToken');
        resolve(userToken)
      })
      .then( userToken => {
        // 获取我的信息
        fetchRequest('/post/logout', 'POST', 
        {},
        userToken
        )
        .then(res => {
          console.log(res);
          if(res.success) {
            AsyncStorage.removeItem('userToken');
            // 清楚缓存
            this.toLogin();
          }
        })
      })
    };
    toShowMyLocation = () => {
      this.props.navigation.navigate('MyLocation')
    }
    render() {
        return (
          <View style={{flex: 1, backgroundColor: '#eee'}}>
            <View style={{backgroundColor: '#fff', height: 100, padding: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                style={styles.ContainerItem}
              >
              <View style={styles.msgHeader}>
                <Image source={{uri: this.state.myMsg.avatar_url, width: 50, height: 50, borderRadius: 5}}></Image>
                <View style={{flex: 1, flexDirection: 'column', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 20}} >{this.state.myMsg.name}</Text>
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 3}}>
                    <Text >微信号：adouwt</Text>
                    <Icon name="ios-arrow-forward" size={18} color="#333"></Icon>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            </View>

            {/* 支付 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                style={styles.ContainerItem}
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-chatboxes" size={18} color="orange" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 16}} >支付</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>

            {/* 收藏 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                style={styles.ContainerItem}
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-magnet" size={18} color="orange" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row',
                  marginLeft: 15, justifyContent: 'space-between', 
                  height: 30, borderBottomColor: '#ddd', borderBottomWidth: 1,
                  borderStyle: 'solid', marginRight: -20, paddingRight: 20}}>
                  <Text style={{fontSize: 16}} >收藏</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, }}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                style={styles.ContainerItem}
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="ios-images" size={18} color="#00c1de" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row',
                  marginLeft: 15, justifyContent: 'space-between', 
                  height: 30, borderBottomColor: '#ddd', borderBottomWidth: 1,
                  borderStyle: 'solid', marginRight: -20, paddingRight: 20}}>
                  <Text style={{fontSize: 16}} >相册</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, }}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                style={styles.ContainerItem}
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-book" size={18} color="orange" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row',
                  marginLeft: 15, justifyContent: 'space-between', 
                  height: 30, borderBottomColor: '#ddd', borderBottomWidth: 1,
                  borderStyle: 'solid', marginRight: -20, paddingRight: 20}}>
                  <Text style={{fontSize: 16}} >卡包</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, }}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                style={styles.ContainerItem}
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-happy" size={18} color="orange" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row',
                  marginLeft: 15, justifyContent: 'space-between', 
                  height: 30, marginRight: -20, paddingRight: 20}}>
                  <Text style={{fontSize: 16}} >表情</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>

            {/* 设置 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                style={styles.ContainerItem}
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-settings" size={18} color="#00c1de" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 16}} >设置</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            {/* 测试注册登录页面 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.toLogin.bind(this)}
                style={styles.ContainerItem}
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-settings" size={18} color="#00c1de" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 16}} >登录</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.toExit.bind(this)}
                style={styles.ContainerItem}
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-settings" size={18} color="#00c1de" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 16}} >退出登录</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>

            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.toShowMyLocation.bind(this)}
                style={styles.ContainerItem}
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-settings" size={18} color="#00c1de" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 16}} >我的位置</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
  msgHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  ContainerItem: {
    flex: 1,
    flexDirection: 'row',
  },
})

export default MyScreen