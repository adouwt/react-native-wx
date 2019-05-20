import React from 'react';
import { SectionList, StyleSheet, Text, View, Image } from 'react-native';
import TabBar from '../component/tabBar'

class UserListScreen extends React.Component {
    static navigationOptions = {
        title: '通讯录',
    };
    render() {
      return (
        <View style={{ flex: 1, paddingBottom: 20}}>
            <View style={{ flex: 1}}>
                <View style={{paddingTop: 40,paddingLeft: 20,lineHeight:60, height: 60, textAlign: 'center', backgroundColor: '#00c1de', fontWeight: 'bold', fontSize: 30}}>
                  <Text>通讯录</Text>
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

})

export default UserListScreen