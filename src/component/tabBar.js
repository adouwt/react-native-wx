import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

class tabBar extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.item}
                    title="微信"
                    color={this.props.active === 'Home' ? 'red': '#333'}
                    onPress={() => this.props.navigation.navigate('Home')}
                    /* 此处有坑， 这个子组件里面的navigation，是父组件传递过来的 */
                />
                <Button style={styles.item}
                    title="通讯录"
                    color={this.props.active === 'UserList' ? 'red': '#333'}
                    onPress={() => this.props.navigation.navigate('UserList')}
                />
                <Button style={styles.item}
                    title="发现"
                    color={this.props.active === 'discover' ? 'red': '#333'}
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button style={styles.item}
                    title="我"
                    color={this.props.active === 'My' ? 'red': '#333'}
                    onPress={() => this.props.navigation.navigate('My')}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ddd',
        marginLeft: -20,
        marginRight: -20,
        marginBottom: -20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        fontSize: 18,
        height: 44,
        
    },
})

export default tabBar