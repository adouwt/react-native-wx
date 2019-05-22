import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class MyScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: '发现',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: (
            <Button
              onPress={navigation.getParam('takePicture')}
              title="+"
              color="#333"
              marginRight="20"
            />
          ),
        };
    }

    constructor(props) {
        super(props)
        this.state = {
            photos: []
        }
        this.takePicture = this.takePicture.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({ takePicture: this._takePicture });
    }
    
    _takePicture = () => {
        this.props.navigation.navigate('Camera')
    };
    
    takePicture = () => {
        this.props.navigation.navigate('Camera')
    };

    render() {
        return (
            <View style={{flex: 1, paddingBottom: 20}}>
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
    DetailsScreenHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center',
      paddingLeft: 20,
      paddingRight: 20,
      lineHeight:60, 
      height: 60, 
      backgroundColor: '#00c1de', 
      fontWeight: 'bold',
      fontSize: 30,
      position: 'relative'
  },
  })

export default MyScreen