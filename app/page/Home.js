import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import { formateTime } from '../utils/formate-time.js'
import fetchRequest from '../utils/fetch'


class HomeScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: '#333',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
    constructor(props){
      super(props);
      this.state ={ isLoading: true}
      this.state= {
        dataSource: []
      }
      this.jumpChat = this.jumpChat.bind(this)
    }

  componentDidMount(){
    fetchRequest(
      '/post/getUsersFromPage', 
      'POST', 
      {"page": 4, "skip":false}
    )
    .then(res => {
        this.setState({
          dataSource: res.users
        })
    })
  }

  jumpChat = (name) => {
    this.props.navigation.navigate('Chat', {roomId: 'sds', name: name})
  }


  render () {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20,marginTop: 100}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1,padding: 10}}>
        <FlatList
          style={{padding: -10}}
          data={this.state.dataSource}
          renderItem= {
            ({item}) => 
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('Chat', {roomId: item._id, name: item.name})}}>
                <View style={styles.container}>
                  <Image  style={styles.image} source={{uri: item.avatar_url, width: 44, height: 44}}  />
                  <View style={styles.txtwarpper}>
                      <View style={styles.txt}>
                          <Text style={styles.name}>{item.name}</Text>
                          <Text numberOfLines={2} style={styles.content}>{item.created_at}</Text>
                      </View>
                      <Text style={styles.time}>{formateTime(item.created_at)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
          }
          keyExtractor={(item, index) => item._id}
        />
        {/* <TabBar navigation={this.props.navigation} active='Home'/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 5
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

export default HomeScreen