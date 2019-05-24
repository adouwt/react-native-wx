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
            userMsg: {}
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
        return (
          <View style={{flex: 1, paddingBottom: 20}}>
            <View style={styles.container}>
              <Text style={styles.txt} > 我知道你是 {this.state.name}</Text>
              <View  style={styles.txt}>
                    <Text>{this.state.userMsg.name}</Text>
              </View>
              <View  style={styles.txt}>
                    <Text>{this.state.userMsg.age}</Text>
              </View>
              <View>
                    <Image source={{uri: this.state.userMsg.avatar_url, width: 44, height: 44}}></Image>
              </View>
            </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      borderStyle: 'solid',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderRadius: 4,
      marginBottom: 15,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 15,
    },
  })

export default ChatScreen