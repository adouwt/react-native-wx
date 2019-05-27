import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import fetchRequest from '../utils/fetch'

class ChatScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.state.params.name,
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
            name: '',
            roomId: '',
            userMsg: {},
            isMe: true
        }
    }

    componentDidMount(){
        let roomId = this.props.navigation.state.params.roomId;
        let name = this.props.navigation.state.params.name;
        this.setState({
            name: name,
            roomId: roomId
        })
        fetchRequest('/post/oneUser', 'POST', {id: roomId})
        .then(res => {
            this.setState({
                userMsg: res
            })
        })

        
    }

    render() {
        let dom = []
        let msgArr = [
          {
            'isMe': false, uri: 'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg', 
            text: 'CSS中没有对应的属性，iOS 图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS'
          },
          {
            'isMe': true, uri: 'http://www.158pic.com/uploads/allimg/1904/2-1Z4021935240-L.jpg', 
            text: 'CSS中没有对应的属性，iOS 图像上特殊的色彩，改变不透明像素的颜色'
          },
          {
            'isMe': false, uri: 'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg', 
            text: 'CSS中没有对应的属性，iOS 图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS图像上特殊的色彩，改变不透明像素的颜色,CSS中没有对应的属性，iOS 图像上特殊的色彩，改变不透明像素的颜色'
          },
          {
            'isMe': false, uri: 'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg', 
            text: 'looo'
          },
          {
            'isMe': true, uri: 'http://www.158pic.com/uploads/allimg/1904/2-1Z4021935240-L.jpg', 
            text: '像上特殊的色彩，改像上特殊的色彩，改像上特殊的色彩，改像上特殊的色彩，改像上特殊的色彩，改像上特殊的色彩，改像上特殊的色彩，改像上特殊的色彩，改像上特殊的色彩，改'
          },
          {
            'isMe': false, uri: 'http://img.wxcha.com/file/201807/13/9bbc369f6e.jpg', text: '像上特殊的色彩，改像上特殊的色彩，改像上特殊的色彩，改 图像上特殊的色彩，改变不透明像素的颜色'
          },
          {
            'isMe': true, uri: 'http://www.158pic.com/uploads/allimg/1904/2-1Z4021935240-L.jpg', text: '像上特殊的色彩，改像上特殊的色彩，改像上特殊的色彩，改'
          },
        ]
        for (let i in msgArr) {
          if(!msgArr[i].isMe) {

          }
          dom.push(
              <View  key={msgArr[i].uri} style={{flex: 0,width: '90%', 
                marginTop: 15,
                flexDirection: msgArr[i].isMe ? 'row-reverse' : 'row', 
                justifyContent: msgArr[i].isMe ? 'flex-end' : 'flex-start'
                }}>
                <Image source={{uri: msgArr[i].uri, width: 40, height: 40}} />
                <View style={{}}>
                    <Text style={{
                      width: 20,
                      height: 20,
                      backgroundColor: msgArr[i].isMe ? '#1AAD19' : '#fff',
                      position: 'absolute',
                      top: 10,
                      left: msgArr[i].isMe ? '91%' : 5,
                      transform: [{rotate:'45deg'}],
                    }}>
                    </Text>
                    <Text style={{marginLeft: 10, borderRadius: 5, 
                    marginRight: 10,
                    minHeight: 40,
                    padding: 5, backgroundColor: msgArr[i].isMe ? '#1AAD19' : '#fff'}}>
                      {msgArr[i].text}
                    </Text>
                </View>
            </View>
          )
        }
        return (
          <View style={{flex: 1, padding: 20, paddingTop: 0,backgroundColor: '#eee'}}>
            {dom}
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      
    },
    Msgarrow: {
      width: 20,
      height: 20,
      backgroundColor: '#1AAD19',
      position: 'absolute',
      top: 10,
      left: 5,
      transform: [{rotate:'45deg'}],
    }
  })

export default ChatScreen