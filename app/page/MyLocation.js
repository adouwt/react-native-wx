import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity} from  'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchRequest from '../utils/fetch'
import { MapView } from 'react-native-amap3d'

class MyLocation extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: '我的定位',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'left'
          },
        };
    }

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    Register = () => {
    }
    render() {
        return (
            <View>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>location</Text>
                    <MapView
                        coordinate={{
                            latitude: 39.91095,
                            longitude: 116.37296,
                        }}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper:{
        padding: 20,      
    },
});

export default MyLocation;