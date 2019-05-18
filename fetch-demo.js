import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Image, StyleSheet  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
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
      <View style={{flex: 1, padding:20, marginTop: 50}}>
        <FlatList
          data={this.state.dataSource}
          renderItem= {
            ({item}) => 
              <View style={styles.container}>
                <Image  style={styles.image} source={{uri: item.avatar_url, width: 64, height: 64}}  />
                <Text style={styles.txt} >{item.name}, {item.created_at}</Text>
              </View>
          }
          keyExtractor={(item, index) => item._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 22,
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 4,
    marginBottom: 15
  },
  image: {
    flex: 1,
  },
  txt: {
    padding: 10,
    fontSize: 18,
    flex: 3
  },
})