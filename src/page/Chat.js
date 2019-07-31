import React from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TextInput } from 'react-native';
import fetchRequest from '../utils/fetch';
import Icon from "react-native-vector-icons/Ionicons";
import Socket from 'socket.io-client';
let socket = Socket('http://localhost:3000');

// 第一次登陆接收其它成员信息
socket.on('login', function (user) {
  console.log(user, '19')
  if(user.length>=1){
    for(var i =0;i<user.length;i++){
      // incomeHtml(user[i],'src/img/head.jpg');
    }
  }
});
// 监听中途的成员加入
socket.on('user joined', function (tname, index) {
  console.log(tname+'房间建立');
});

// 接收私聊信息
socket.on('receive private message', function (data) {
  // 这里的data 应该渲染页面中
  console.log(data);
});



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
        }
    }
    initChatData = async () => {    
        //传输文本内容
        // 初始化数据
        this.state.roomId = this.props.navigation.state.params.roomId;
        // 发送房间roomID给后台
        socket.emit('new roomId', this.state.roomId);
        // 获取我的信息
        await fetchRequest('/post/oneUser', 'POST', 
        {
            id: this.props.navigation.state.params.MyId,
        })
        .then(res => {
          console.log(res)
          if(res.success) {
            this.setState({
              userMsg: res.data.userMsg
            })
          }
        })
        console.log('/post/getSingleRoomMsg woyao zhege')
        // 获取聊天历史信息
        await fetchRequest('/post/getSingleRoomMsg', 'POST', 
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
    }
    saveChatCurrentMsg = () => {
      fetchRequest('/post/saveChatRoomSingleMsg', 'POST', 
        {
          roomId: this.state.roomId,
          currentMsg: {
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
      socket.emit('send private message', {
        "contents" : this.state.value,
        "roomId": this.state.roomId
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
                    width: item._id === this.state.userMsg._id ? '100%' : '85%', 
                    marginTop: 10, 
                    display: 'flex',
                    flexDirection: item._id === this.state.userMsg._id ? 'row-reverse' : 'row',
                    borderRadius: 5,
                    }} key={item.chatid}>
                    <Image source={{uri: item.uri, width: 40, height: 40}}/>
                    <Text style={{
                      width: 15,height: 15, 
                      backgroundColor: item._id === this.state.userMsg._id ? '#1AAD19' : '#fff', 
                      marginTop: 10,
                      transform: [{rotate:'45deg'}],
                      position: 'relative',
                      left: 8}}></Text>
                    <Text style={{ 
                      backgroundColor: item._id === this.state.userMsg._id ? '#1AAD19' : '#fff', 
                      lineHeight: 20, padding: 5, 
                      borderRadius: 5,
                      marginLeft: item._id === this.state.userMsg._id ? 60 : 0
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