import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity} from  'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Login extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '登录',
            headerStyle: {
                backgroundColor: '#eee',
            },
            headerTintColor: '#333',
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: 'left'
            },
        }
    }

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <TextInput
                    style={{height: 40}}
                    placeholder="login!"
                    onChangeText={(text) => this.setState({text})}
                />
            </View>
        )
    }
}

export default Login;