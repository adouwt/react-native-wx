import React from 'react';
import { SectionList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import fetchRequest from '../utils/fetch'
import AsyncStorage from '@react-native-community/async-storage';

class UserListScreen extends React.Component {
    static navigationOptions = {
        title: '通讯录',
    };
    constructor(props) {
        super(props)
        this.state = {
          MyId: '',
          commomRoomId: '',
          roomName: 'erlingerRoom'
        }
    }
    componentDidMount() {
      new Promise((resolve, rejects) => {
        let userToken =  AsyncStorage.getItem('userToken');
        resolve(userToken)
      })
      .then( res => {
        // 获取我的信息
        fetchRequest('/get/user/info', 'POST', 
        {},
        res
        )
        .then(res => {
          console.log(res)
          if(res.success) {
            this.setState({
              MyId: res.data._id
            })
          }
        })
      })
      
      // 生成公共的聊天室
      fetchRequest('/post/generateCommomRoom', 'POST', 
      {
        roomName: this.state.roomName,
      })
      .then(res => {
        console.log(res)
        if(res.success) {
          this.setState({
            commomRoomId: res.data.roomId
          })
        }
      })
    }
    togetherChat = () => {
      // alert(this.state.commomRoomId+'---'+this.state.MyId)
      this.props.navigation.navigate('ChatTogether',{roomId: this.state.commomRoomId, MyId: this.state.MyId})
    }
    render() {
      return (
        <View style={{ flex: 1, paddingBottom: 20}}>
            <View style={{ flex: 1}}>
                <View style={{backgroundColor: '#fff', height: 50, padding: 15}}>
                  <TouchableOpacity
                    style={styles.modelContainerItem}
                    onPress={this.togetherChat.bind(this)}
                  >
                  <View style={styles.msgHeader}>
                    <View style={{color: '#333', width: 18, height: 20}}>
                      <Icon name="ios-aperture" size={18} color="#00c1de" ></Icon>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                      <Text style={{fontSize: 16}} >发起群聊</Text>
                      <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                    </View>
                  </View>
                  </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#fff', height: 50, padding: 15, borderTopWidth: 1, borderTopColor: '#ddd'}}>
                  <TouchableOpacity
                    style={styles.modelContainerItem}
                    onPress={this.togetherChat.bind(this)}
                  >
                  <View style={styles.msgHeader}>
                    <View style={{color: '#333', width: 18, height: 20}}>
                      <Icon name="ios-aperture" size={18} color="#00c1de" ></Icon>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                      <Text style={{fontSize: 16}} >找个朋友</Text>
                      <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                    </View>
                  </View>
                  </TouchableOpacity>
                </View>
                <SectionList
                    style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10}}
                    renderSectionHeader={({ section }) => (
                      <Text style={styles.sectionHeader}>{section.title}</Text>
                    )}
                    renderItem={({ item, index, section }) => (
                      <View style={styles.container}>
                        <Image  style={styles.image} source={{uri: item.avatar_url, width: 40, height: 40}}  />
                        <Text key={index} style={styles.txt}>{item.name}</Text>
                      </View>
                    )}
                    sections={[
                        { title: "A", data: 
                          [
                            {
                              "avatar_url": 'https://pic.qqtn.com/up/2017-10/15082099204249036.jpg',
                              "name": '阿逗'
                            }, 
                            {
                              "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                              "name": '阿逗1'
                            },
                            {
                              "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                              "name": '爱你呀'
                            },
                          ]  
                        },
                        { title: "B", data: 
                          [
                            {
                              "avatar_url": 'https://pic.qqtn.com/up/2017-10/15082099205103498.jpg',
                              "name": 'Bob'
                            }, 
                            {
                              "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                              "name": '鲍鱼'
                            },
                            {
                              "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                              "name": '暴雷了'
                            },
                          ]  
                        },
                        { title: "C", data: 
                          [
                            {
                              "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                              "name": '次噢'
                            }, 
                            {
                              "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                              "name": '次次恩'
                            },
                            {
                              "avatar_url": 'https://pic.qqtn.com/up/2017-10/15082099202446042.jpg',
                              "name": '刺客荆轲'
                            },
                          ]  
                        },
                        { title: "D", data: 
                          [
                            {
                              "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                              "name": '第一'
                            }, 
                            {
                              "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                              "name": '第二梦'
                            },
                            {
                              "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                              "name": '第三'
                            },
                          ]  
                        },
                        { title: "E", data: 
                        [
                          {
                            "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                            "name": '迩伶贰'
                          }, 
                          {
                            "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                            "name": '尔冬升'
                          },
                          {
                            "avatar_url": 'http://www.imeitou.com/uploads/allimg/2018041608/jwzx4afoxf5.jpg',
                            "name": '尔豪'
                          },
                        ]  
                      },
                    ]}
                    keyExtractor={(item, index) => item + index}
                />
                {/* <TabBar navigation={this.props.navigation} active='UserList'/> */}
            </View>
        </View>
      );
    }  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 10,
      flexDirection: 'row'
    },
    
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: '#ddd',
    },
    txt: {
      padding: 10,
      fontSize: 18,
      height: 44,
      color: 'red',
      flex: 4
    },
    image: {
      flex: 1,
      borderRadius: 10
    },
    msgHeader: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
    },
    modelContainerItem: {
      flex: 1,
      flexDirection: 'row',
    }
})

export default UserListScreen