import React from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TextInput } from 'react-native';
import fetchRequest from '../utils/fetch'
import Icon from "react-native-vector-icons/Ionicons";
import Socket from 'socket.io-client'
import { YellowBox } from 'react-native';

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.state.params.friendName,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        };
    }

    constructor(props) {
        super(props)
        this.state = {
            friendName: '',
            roomId: '',
            allChatContents: [],
            userMsg: {},
            isMe: true,
            currentChatMsg: '1221',
            value: '',
            socket: Socket.connect('http://localhost:3000')
        }
    }
    initChatData = () => {
        
        //传输文本内容
        // 初始化数据
        this.state.roomId = this.props.navigation.state.params.roomId;
        this.state.friendName = this.props.navigation.state.params.friendName;
        this.state.socket.emit(this.state.roomId,{
            "contents" : '',
            "id": '5c9f994a3659414c8ab5a19b'
        });

        // 获取历史信息
        fetchRequest('/post/getRoomMsg', 'POST', 
        {
            roomId: this.state.roomId,
            friendName: this.state.friendName
        })
        .then(res => {
            this.setState({
                userMsg: res
            })
        })
        

        this.setState({
            allChatContents:    
                [    
                    {
                        'isMe': false,
                        uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564222023705&di=9a2c58c6b4611c97e326ccd68af44c96&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F16%2F20170316161525_rQMtc.thumb.224_0.jpeg', 
                        text: 'CSS中没有对应的属性，iOS 图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS'
                    },
                    {
                        'isMe': true, 
                        uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564221869343&di=bf9f44ac8f496937826b802ed07b41ac&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201805%2F16%2F20180516001524_pgnyd.jpg', 
                        text: 'CSS中没有对应的属性，iOS 图像上特殊的色彩，改变不透明像素的颜色'
                    }
                ]
        })
    }

    componentDidMount(){
        this.initChatData()
    }
    
    submitMSg = () => {
        this.state.socket.emit(this.state.roomId,{
            "contents" : this.state.currentChatMsg,
            "id": '5c9f994a3659414c8ab5a19b'
        });
        // alert(this.state.roomId)
        _this = this
        // this.state.socket.on(this.state.roomId, function (msg) {
        //     if(msg.contents) {
        //         _this.state.allChatContents.push({
        //             text: msg.contents,
        //             'isMe': true, 
        //             uri: 'http://www.158pic.com/uploads/allimg/1904/2-1Z4021935240-L.jpg',
        //             id: '5c9f994a3659414c8ab5a19b'
        //         })
        //         // alert(JSON.stringify(_this.state.allChatContents))
        //     }
        // // 这里为什么页面渲染信息的个数会逐个增加
        // })

        this.state.allChatContents.push({
            text: this.state.currentChatMsg,
            isMe: true, 
            uri: 'https://b-ssl.duitang.com/uploads/item/201703/11/20170311184143_NMUrn.thumb.700_0.jpeg',
            id: '5c9f994a3659414c8ab5a19b'
        })

        this.setState({
            value: '',
        })
    }
    render() {
        return (
          <View style={{flex: 1, padding: 10, paddingTop: 0,backgroundColor: '#eee'}}>
            <FlatList
              style={{}}
              data={this.state.allChatContents}
              extraData={this.state}
              renderItem= {
                ({item, index}) => 
                  <View style={{
                    position: 'relative', 
                    width: item.isMe ? '100%' : '85%', 
                    marginTop: 10, 
                    display: 'flex',
                    flexDirection: item.isMe ? 'row-reverse' : 'row',
                    borderRadius: 5,
                    }} key={item.chatid}>
                    <Image source={{uri: item.uri, width: 40, height: 40}}/>
                    <Text style={{
                      width: 15,height: 15, 
                      backgroundColor: item.isMe ? '#1AAD19' : '#fff', 
                      marginTop: 10,
                      transform: [{rotate:'45deg'}],
                      position: 'relative',
                      left: 8}}></Text>
                    <Text style={{ 
                      backgroundColor: item.isMe ? '#1AAD19' : '#fff', 
                      lineHeight: 20, padding: 5, 
                      borderRadius: 5,
                      marginLeft: item.isMe ? 60 : 0
                      }}>
                      {item.text}
                    </Text>
                  </View>
              }
              keyExtractor={(item, index) => index + ''}
            />
            <View style={styles.inputWrapper}>
              <Icon name="ios-volume-high" size={20} color="#333" style={{flex: 1}}></Icon>
              <TextInput
                style={{height: 40, flex: 8, backgroundColor: '#fff'}}
                placeholder="我知道你现在想发信息"
                onChangeText={(text) => this.setState({currentChatMsg: text, value: text})}
                value={this.state.value}
                onSubmitEditing={this.submitMSg.bind(this)}
              />
              <Icon name="md-happy" size={20} color="#333" style={{flex: 1}}></Icon>
              <Icon name="md-add-circle" size={20} color="#333" style={{flex: 1}}></Icon>
            </View>
          </View>
          
        );
    }
}
const styles = StyleSheet.create({
    inputWrapper: {
      height: 50,
      backgroundColor: '#fff',
      marginLeft: -10,
      marginRight: -10,
      marginBottom: -10,
      paddingLeft: 15,
      paddingRight: 15,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  })

export default ChatScreen