import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity} from  'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import fetchRequest from '../utils/fetch'
import { red } from 'ansi-colors';

class Login extends React.Component {
    static navigationOPtions = ({navigation}) => {
        return {
            title: '登录',
            headerStyle: {
                backgroundColor: '#fff'
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: ''
        }
    }
    Login = () => {
        fetchRequest(
            '/post/login', 
            'POST', 
            {
                "username": this.state.username,
                "password": this.state.pwd,
            }
        )
        .then(async (res) => {
            // alert(JSON.stringify(res))
            if(res.success) {
                await AsyncStorage.setItem('userToken', res.token);
                this.props.navigation.navigate('Home')
            }
            console.log(res)
        })
    }

    Register = () => {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <View>
                <View style={styles.wrapper}>
                    <Text style={styles.title}>登录</Text>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Please input your name"
                        onChangeText={(text) => this.setState({'username': text})}
                        value={this.state.text}
                    />
                    <TextInput
                        style={styles.inputs}
                        placeholder="Please input your password"
                        onChangeText={(text) => this.setState({'pwd': text})}
                        value={this.state.pwd}
                    />

                    <TouchableOpacity
                        style={{marginTop: 20, alignItems: 'flex-end', color: '#ddd'}}
                        onPress={this.Register.bind(this)}
                    >
                        <Text style={styles.primaryColor}>没有账号，我来注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.Login.bind(this)}
                    >
                        <Text style={styles.whiteColor}> 点我登录 </Text>
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

export default Login;