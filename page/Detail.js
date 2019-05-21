import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';


const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
);
class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: '发现',
    }
    constructor(props) {
        super(props)
        this.state = {
            photos: []
        }
        this.takePicture = this.takePicture.bind(this);
    }
    takePicture = async function() {
        this.props.navigation.navigate('Camera')
    };
    
    render() {
        return (
            <View style={{flex: 1, paddingBottom: 20}}>
                <View style={styles.DetailsScreenHeader}>
                    <Text style={styles.headerTxt}>发现</Text>
                    <TouchableOpacity  onPress={this.takePicture}  activeOpacity={0.2} focusedOpacity={0.5}>
                        <View style={styles.addPhoto}>
                        <Text style={{color:'#ffffff'}}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        backgroundColor:'#ddd'
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