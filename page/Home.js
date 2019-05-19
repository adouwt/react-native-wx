import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, StyleSheet, Button  } from 'react-native';
import TabBar from '../component/tabBar'
import { formateTime } from '../utils/formate-time.js'

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

  componentDidMount(){
    return fetch('http://localhost:4000/get/alluser')
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
      <View style={{flex: 1, padding: 10}}>
        {/* <Text>UserList Screen</Text> */}
        {/* <Button
                title="Go back"
                onPress={() => this.props.navigation.goBack()}
        /> */}
        <FlatList
          data={this.state.dataSource}
          renderItem= {
            ({item}) => 
              <View style={styles.container}>
                <Image  style={styles.image} source={{uri: item.avatar_url, width: 64, height: 64}}  />
                <View style={styles.txtwarpper}>
                    <View style={styles.txt}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text numberOfLines={2} style={styles.content}>{item.created_at}</Text>
                    </View>
                    <Text style={styles.time}>{formateTime(new Date(item.created_at))}</Text>
                </View>
              </View>
          }
          keyExtractor={(item, index) => item._id}
        />
        <TabBar navigation={this.props.navigation} active='Home'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 15,
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
        borderBottomColor: '#ccc'
    },
    txt: {
        padding: 10,
        flex: 3,
        overflow: 'hidden',
        flexWrap: 'nowrap'// 没有用
    },
    name: {
        fontSize: 18,
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