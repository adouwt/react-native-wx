import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabBar from '../component/tabBar'

class MyScreen extends React.Component {
    // static navigationOptions = {
    //     title: '我',
    // };
    render() {
        return (
            <View style={{flex: 1, paddingBottom: 20}}>
                <View style={{paddingTop: 40,paddingLeft: 20,lineHeight:60, height: 60, textAlign: 'center', backgroundColor: '#00c1de', fontWeight: 'bold', fontSize: 30}}>
                  <Text>我</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.txt} >MyScreen</Text>
                </View>
                {/* <TabBar navigation={this.props.navigation} active='My'/> */}
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
      marginBottom: 15,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 15,
    },
  })

export default MyScreen