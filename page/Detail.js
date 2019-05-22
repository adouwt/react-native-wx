import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import NavigationService from '../component/NavigationService';

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
            photos: []
        }
        this.takePicture = this.takePicture.bind(this);
    }
    takePicture = () => {
      alert(6)
    }
    render() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <Text>发现你的美</Text>
                <Button
                    onPress={this.takePicture}
                    title="+"
                    color="#333"
                    fontSize='14'
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 20,
      borderStyle: 'solid',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderRadius: 4,
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
    headerTxt: {
        width: 100,
    },
    addPhoto: {
        justifyContent:'center',
        alignItems:'center',
        width:20,
        height: 20,
        backgroundColor:'#ddd',
        marginTop: 30
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
  })

export default DetailsScreen