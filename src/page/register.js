import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, BackHandler} from  'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
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
            headerTruncatedBackTitle: '返回',
            headerBackTitle: '返回',
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
            usernameErr: ' ',
            pwdErr: ' ',
        }
    }
    changeUserName = (text) => {
        let userReg = /\w{4}/;
        if(userReg.test(text)) {
            this.setState({
                usernameErr: ''
            })
        } else {
            this.setState({
                usernameErr: true,
                username: text
            })
        }
    }

    changePWD = (text) => {
        let pwdReg = /\w{6,15}/;
        if(pwdReg.test(text)) {
            this.setState({
                pwdErr: ''
            })
        } else {
            this.setState({
                pwdErr: true,
                pwd: text
            })
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
        .then(async res => {
            alert(JSON.stringify(res))
            if(res.success) {
                await AsyncStorage.setItem('userToken', res.token);
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
                    <View style={{position:'relative'}}>
                        <TextInput
                            style={styles.inputs}
                            placeholder="Please input your name"
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
                    {
                        (this.state.pwdErr || this.state.usernameErr) ? 
                            <TouchableOpacity
                            style={styles.buttonDefault}
                        >
                            <Text style={styles.whiteColor}> 点我注册 </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.Register.bind(this)}
                        >
                            <Text style={styles.whiteColor}> 点我注册 </Text>
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

export default Register;