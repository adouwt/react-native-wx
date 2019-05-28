import React from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList, TextInput } from 'react-native';
import fetchRequest from '../utils/fetch'
import Icon from "react-native-vector-icons/Ionicons";

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
        
        return (
          <View style={{flex: 1, padding: 10, paddingTop: 0,backgroundColor: '#eee'}}>
            <FlatList
              style={{}}
              data={msgArr}
              renderItem= {
                ({item}) => 
                  <View style={{
                    position: 'relative', 
                    width: item.isMe ? '100%' : '85%', 
                    marginTop: 10, 
                    display: 'flex',
                    flexDirection: item.isMe ? 'row-reverse' : 'row',
                    borderRadius: 5,
                    }} key={item.uri}>
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
              keyExtractor={(item, index) => item._id}
            />
            <View style={styles.inputWrapper}>
              <Icon name="ios-volume-high" size={20} color="#333" style={{flex: 1}}></Icon>
              <TextInput
                style={{height: 40, flex: 8, backgroundColor: '#fff'}}
                placeholder="我知道你现在在想我"
                onChangeText={(text) => alert(text)}
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