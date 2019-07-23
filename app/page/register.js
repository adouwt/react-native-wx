import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity} from  'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Register extends React.Component {
    static navigationOPtions = ({navigation}) => {
        return {
            title: '注册',
            headerStyle: {
                backgroundColor: '#fff'
            }
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
                    placeholder="注册!"
                    onChangeText={(text) => this.setState({text})}
                />
            </View>
        )
    }
}

export default Register;