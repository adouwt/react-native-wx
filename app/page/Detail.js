import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, FlatList, RefreshControl } from 'react-native';
import NavigationService from '../component/NavigationService';
import fetchRequest from '../utils/fetch'
class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: '发现',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        };
    }

    constructor(props) {
        super(props)
        this.state = {
          dataSource: [],
          refreshing: false,
          isLoreMoreing: 'LoreMoreing',
          count: 1,
          maxSize: 1
        }
    }

    componentDidMount(){
      fetchRequest(
        '/getUsersFromPage', 
        'POST', 
        {"page": this.state.count, "skip":false}
      )
      .then(res => {
        this.setState({
          dataSource: res.users,
          count: this.state.count,
          maxSize: res.maxSize
        })
        
      })
    }
  
    LoreMore = ()=> {
      if(this.state.count< this.state.maxSize) {
        this.Refresh()
      }
    }
    
    Refresh = function () {
      if(this.state.count >= this.state.maxSize) {
        return
      }
      this.setState({
          refreshing: true,
      });
      setTimeout(() => {
          if(this.state.count< this.state.maxSize) {
            this.setState({
              count: this.state.count + 1,
            })
          }
          fetchRequest(
            '/getUsersFromPage', 
            'POST', 
            {"page":this.state.count, "skip":false}
          )
          .then(res => {
            // alert(JSON.stringify(res))
            this.setState({
              dataSource: res.users,
              refreshing: false
            })
            if (this.state.count === res.maxSize) {
              this.setState({
                refreshing: false
              })
            }
          })
          this.isLoreMore = false;
      }, 1500);
    }

    renderFooter =() => {
      if(this.state.refreshing) {
        return(
          <View >
            <Text style={styles.footer}>Loading...</Text>
          </View>
        )
      } else {
        return(
          <View >
            <Text style={styles.footer}>-到底了-</Text>
          </View>
        )
      }
      
    }

    render() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <View style={{flex: 1}}>
                  <FlatList
                      showsVerticalScrollIndicator={false}//是否显示垂直滚动条
                      showsHorizontalScrollIndicator={false}//是否显示水平滚动条
                      numColumns={1}//每行显示1个
                      // ListHeaderComponent={this.renderHeader}//头部
                      ListFooterComponent={this.renderFooter}//尾巴
                      renderItem= {
                        ({item}) => 
                          <View style={styles.container}>
                            <Image  style={styles.image} source={{uri: item.avatar_url, width: 44, height: 44}}  />
                            <View style={styles.txtwarpper}>
                                <View style={styles.txt}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text numberOfLines={2} style={styles.content}>{item.created_at}</Text>
                                </View>
                                <Text style={styles.time}>{item.created_at}</Text>
                            </View>
                          </View>
                      }
                      // ItemSeparatorComponent={this.renderSeparator}//每行底部---一般写下划线
                      enableEmptySections={true}//数据可以为空
                      keyExtractor={(item, index)=>item._id}
                      onEndReachedThreshold={0.1}//执行上啦的时候10%执行
                      onEndReached={this.LoreMore}
                      data={this.state.dataSource}
                      // scrollToEnd={alert('scrollToEnd')}
                      refreshing={this.state.refreshing}
                      onRefresh={this.Refresh.bind(this)}
                      // refreshControl={
                      //     <RefreshControl
                      //         refreshing={this.state.refreshing}
                      //         onRefresh={this.Refresh}
                      //         title="Loading..."/>
                      // }
                  />
                  
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 15,
      marginBottom: 15,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 15
    },
    image: {
      flex: 1,
      borderRadius: 4,
    },
    txtwarpper: {
      flex: 5,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: '#ccc',
      marginLeft: 10
    },
    txt: {
      paddingTop: 10,
      flex: 3,
      overflow: 'hidden',
      flexWrap: 'nowrap',// 没有用
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    name: {
      fontSize: 18,
      paddingBottom: 5
      // flex:1
    },
    content: {
      color: '#ddd',
      fontSize: 14
    },
    time: {
      flex: 1,
      flexWrap: 'nowrap',
      color: '#ddd',
      fontSize: 12,
      textAlign: 'right',
    },
    footer: {
      textAlign: 'center',
      color: '#999'
    }
})

export default DetailsScreen