import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity} from  'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchRequest from '../utils/fetch'

class Register extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '注册',
            headerStyle: {
                backgroundColor: '#fff',
                color: '#333'
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
            username: '',
            pwd: '',
            // registerCode: '',
        }
    }
    Register = () => {
        fetchRequest(
            '/post/adminRegister', 
            'POST', 
            {
                "username": this.state.username,
                "password": this.state.pwd,
                // "registerCode": this.state.registerCode
                "roles": "dev"
            }
        )
        .then(res => {
            alert(JSON.stringify(res))
            if(res.success) {
                this.props.navigation.navigate('Home')
            }
            console.log(res)
        })
    }
    render() {
        return (
            <View>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>注册</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Please input your name"
                        onChangeText={(text) => this.setState({'username': text})}
                        value={this.state.username}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Please input your password"
                        onChangeText={(text) => this.setState({'pwd': text})}
                        value={this.state.pwd}
                    />
                    {/* <TextInput
                        style={styles.inputs}
                        placeholder="Please input register code"
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.pwd}
                    /> */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.Register.bind(this)}
                    >
                        <Text style={styles.whiteColor}> 点我注册 </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper:{
        padding: 20,      
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    inputs: {
        height: 40, 
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 25,
        paddingLeft: 3,
        paddingRight: 3
    },

    button: {
      alignItems: 'center',
      backgroundColor: '#1AAD19',
      padding: 10,
      marginTop: 25,
      borderRadius: 5
    },
    primaryColor: {
        color: '#1AAD19',
    },
    whiteColor: {
        color: '#fff'
    }
});

export default Register;