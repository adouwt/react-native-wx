import React from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TextInput } from 'react-native';
import fetchRequest from '../utils/fetch'
import Icon from "react-native-vector-icons/Ionicons";
import Socket from 'socket.io-client'

let socket = Socket('http://localhost:3000');
class ChatTogetherScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: '一个搞个小上海',
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
            roomId: '',
            allChatContents: [],
            userMsg: {},
            isMe: true,
            currentChatMsg: '',
            myAvatar: '',
            value: '',           
        }
    }
    initChatData = () => {
        this.state.roomId = this.props.navigation.state.params.roomId;
        // 获取聊天室历史信息
        fetchRequest('/post/getRoomMsg', 'POST', 
        {
            roomId: this.state.roomId,
        })
        .then(res => {
          console.log(res)
          if(res.success) {
            this.setState({
                allChatContents: res.msgData.allChatContents
            })
          }
        })
        // 获取我的信息
        fetchRequest('/post/oneUser', 'POST', 
        {
            id: this.state.roomId,
        })
        .then(res => {
          console.log(res)
          if(res.success) {
            this.setState({
              userMsg: res.data.userMsg
            })
          }
        })
        // this.setState({
        //     allChatContents:    
        //         [    
        //             {
        //                 'isMe': false,
        //                 uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564222023705&di=9a2c58c6b4611c97e326ccd68af44c96&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F16%2F20170316161525_rQMtc.thumb.224_0.jpeg', 
        //                 text: 'CSS中没有对应的属性，iOS 图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS'
        //             },
        //             {
        //                 'isMe': true, 
        //                 uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564221869343&di=bf9f44ac8f496937826b802ed07b41ac&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201805%2F16%2F20180516001524_pgnyd.jpg', 
        //                 text: 'CSS中没有对应的属性，iOS 图像上特殊的色彩，改变不透明像素的颜色'
        //             }
        //         ]
        // })
    }

    saveChatCurrentMsg = () => {
      fetchRequest('/post/saveChatRoomMsg', 'POST', 
        {
          roomId: this.state.roomId,
          currentMsg: {
              'isMe': true, 
              uri: this.state.userMsg.uri, 
              _id: this.state.userMsg._id, 
              name: this.state.userMsg.name,
              text: this.state.value
          }
        })
        .then(res => {
            // this.setState({
            //     userMsg: res
            // })
            console.log(res)
        })
    }

    componentDidMount(){
        this.initChatData()
    }

    pushArrMsg = () => {
      this.setState({
        allChatContents: this.state.allChatContents.concat(
          {
            'isMe': true, 
            uri: this.state.userMsg.uri, 
            _id: this.state.userMsg._id, 
            name: this.state.userMsg.name,
            text: this.state.value
          }
        ),
        value: '',
      })
    }
    
    submitMSg = () => {
      socket.emit('erlingerFamily',{
          "contents" : this.state.value,
      });
      this.pushArrMsg(); // is a Bug
      // socket.on('erlingerFamily',  (msg) => {
      //     if(msg.contents) {
      //       this.pushArrMsg();
      //     }
      // })
      // 将提交的数据 保存数据库
      this.saveChatCurrentMsg();
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

export default ChatTogetherScreen