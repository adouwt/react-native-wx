import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, StyleSheet, Button  } from 'react-native';
import { formateTime } from '../utils/formate-time.js'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '微信',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

  componentDidMount(){
    // return fetch('http://18.10.1.115:4000/get/alluser')
    return fetch('https://api.scampus.cn/get/alluser')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.users,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20,marginTop: 100}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingBottom: 10}}>
        <View style={styles.DetailsScreenHeader}><Text>微信</Text></View>
        <FlatList
          style={{padding: 10}}
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