import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabBar from '../component/tabBar'

class MyScreen extends React.Component {
    // static navigationOptions = {
    //     title: '我',
    // };
    render() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <View style={styles.container}>
                    <Text style={styles.txt} >MyScreen</Text>
                </View>
                <TabBar navigation={this.props.navigation} active='My'/>
                {/* 此处有坑， 引用子组件，子组件里面的navigation的指向有变动，需要将react里面的navigation 传递给子组件 */}
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
      marginBottom: 15
    },
  })

export default MyScreen