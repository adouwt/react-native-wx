import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
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
          dataSource: []
        }
        this.takePicture = this.takePicture.bind(this);
    }

    componentDidMount(){
      fetchRequest(
        '/getUsersFromPage', 
        'POST', 
        {"page":1,"skip":true}
      )
      .then(res => {
        // alert(JSON.stringify(res))
        this.setState({
          dataSource: res.users
        })
      })
    }
  
    takePicture = () => {
      alert(6)
    }

    render() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <View style={{flex: 1}}>
                  <FlatList
                    style={{padding: -10}}
                    data={this.state.dataSource}
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
                    keyExtractor={(item, index) => item._id}
                  />
                  {/* <TabBar navigation={this.props.navigation} active='Home'/> */}
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
    DetailsScreenHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
      paddingLeft: 20,
      paddingRight: 20,
      lineHeight:60, 
      height: 60, 
      backgroundColor: '#00c1de', 
      fontWeight: 'bold',
      fontSize: 30,
      position: 'relative'
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
    }
})

export default DetailsScreen