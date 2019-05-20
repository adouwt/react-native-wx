import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

class DetailsScreen extends React.Component {
    static navigationOptions = {
        title: '发现',
        headerTitle: <View />,
        headerRight: (
            <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
            />
        ),
    };
    render() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <View style={styles.container}>
                    <Text style={styles.txt} >ccccccc</Text>
                </View>
                {/* <TabBar navigation={this.props.navigation} active='discover'/> */}
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

export default DetailsScreen