import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, CameraRoll, ScrollView, Image } from 'react-native';

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
    }
    constructor(props) {
        super(props)
        this.state = {
            photos: []
        }
        this.onButtonPress = this.onButtonPress.bind(this);
    }
    onButtonPress () {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
            })
            .then(r => {
                this.setState({ photos: r.edges });
                // alert(r.edges)
            })
            .catch((err) => {
                //Error Loading Images
            });
    }
    _handleButtonPress = () => {
    
    };
    render() {
        return (
            <View style={{flex: 1, paddingBottom: 20}}>
                <View style={styles.DetailsScreenHeader}>
                    <Text style={styles.headerTxt}>发现</Text>
                    <TouchableOpacity  onPress={this.onButtonPress}  activeOpacity={0.2} focusedOpacity={0.5}>
                        <View style={styles.addPhoto}>
                        <Text style={{color:'#ffffff'}}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text style={styles.txt} >ccccccc</Text>
                    <ScrollView>
                        {this.state.photos.map((p, i) => {
                        return (
                            <Image
                            key={i}
                            style={{
                                width: 300,
                                height: 100,
                            }}
                            source={{ uri: p.node.image.uri }}
                            />
                        );
                        })}
                    </ScrollView>
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
      marginBottom: 15,
      marginBottom: 15,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 15
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
    headerTxt: {
        width: 100,
    },
    addPhoto: {
        justifyContent:'center',
        alignItems:'center',
        width:20,
        height: 20,
        backgroundColor:'#ddd'
    }
  })

export default DetailsScreen