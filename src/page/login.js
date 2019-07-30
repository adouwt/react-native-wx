import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, BackHandler} from  'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import fetchRequest from '../utils/fetch'
import { red } from 'ansi-colors';

class Login extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '登录',
            headerStyle: {
                backgroundColor: '#fff'
            },
            headerBackTitle: null,
            headerBackTitleStyle: {
                color: red
            },
            headerLeft: (
                <View>
                </View>
            )
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: '',
            usernameErr: ' ',
            pwdErr: ' ',
        }
    }
    changeUserName = (text) => {
        let userReg = /\w{4,}/;
        this.setState({
            username: text
        })
        if(userReg.test(text)) {
            this.setState({
                usernameErr: ''
            })
        } else {
            this.setState({
                usernameErr: true
            })
        }
    }

    changePWD = (text) => {
        let pwdReg = /\w{6,15}/;
        this.setState({
            pwd: text
        })
        if(pwdReg.test(text)) {
            this.setState({
                pwdErr: ''
            })
        } else {
            this.setState({
                pwdErr: true
            })
        }
    }

    Login = () => {
        if(this.state.pwdErr || this.state.usernameErr) {
            return
        }
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
            } else {
                alert('用户名或密码不正确！')
            }
            
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
                    <View style={{position:'relative'}}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Please input your name"
                            autoCapitalize= 'none'
                            onChangeText={this.changeUserName.bind(this)}
                        />
                        {
                            this.state.usernameErr ? <Text style={styles.errTips} >请输入正确的用户名</Text> :
                            <View></View>
                        }
                        
                    </View>
                    <View style={{position:'relative'}}>
                        <TextInput
                            style={styles.inputs}
                            secureTextEntry={true}
                            placeholder="Please input your password"
                            onChangeText={this.changePWD.bind(this)}
                        />
                        {
                            this.state.pwdErr ? <Text style={{marginTop: 5,color: '#c00'}}>请输入6位的密码</Text>:
                            <View></View>
                        }
                        
                    </View>
                    <TouchableOpacity
                        style={{marginTop: 20, alignItems: 'flex-end', color: '#ddd'}}
                        onPress={this.Register.bind(this)}
                    >
                        <Text style={styles.primaryColor}>没有账号，我来注册</Text>
                    </TouchableOpacity>
                    {
                        (this.state.pwdErr || this.state.usernameErr) ? 
                            <TouchableOpacity
                            style={styles.buttonDefault}
                        >
                            <Text style={styles.whiteColor}> 点我登录 </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.Login.bind(this)}
                        >
                            <Text style={styles.whiteColor}> 点我登录 </Text>
                        </TouchableOpacity>
                    }
                    
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
    errTips: {
        position: 'absolute',
        color: '#c00',
        top: 70
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#1AAD19',
        padding: 10,
        marginTop: 25,
        borderRadius: 5
    },
    buttonDefault: {
        alignItems: 'center',
        backgroundColor: '#91ED61',
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