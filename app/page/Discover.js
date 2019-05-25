import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

class MyScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: '发现',
          headerStyle: {
            backgroundColor: '#eee',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'left'
          },
          headerRight: (
            <View style={{marginRight: 20}}>
              <TouchableOpacity
                onPress={navigation.getParam('takePicture')}
                marginRight="20"
              >
                <Icon name="md-camera" size={18} color="#333"></Icon>
              </TouchableOpacity>
            </View>
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
          <View style={{flex: 1, backgroundColor: '#eee'}}>
            {/* 朋友圈 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                marginRight="20"
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="ios-aperture" size={18} color="#00c1de" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 16}} >朋友圈</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>

            {/* 收藏 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                marginRight="20"
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-qr-scanner" size={18} color="orange" ></Icon>
                </View>
                <View style={styles.itemWrapper}>
                  <Text style={{fontSize: 16}} >扫一扫</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            {/* 摇一摇 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, }}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                marginRight="20"
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="ios-images" size={18} color="#00c1de" ></Icon>
                </View>
                <View style={styles.itemWrapper}>
                  <Text style={{fontSize: 16}} >摇一摇</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            {/* 看一看 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                marginRight="20"
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-eye" size={18} color="#FF962B" ></Icon>
                </View>
                <View style={styles.itemWrapper}>
                  <Text style={{fontSize: 16}} >看一看</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            {/* 搜一搜 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, }}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                marginRight="20"
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-happy" size={18} color="#FF7E50" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 16}} >搜一搜</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>

            {/* 附近的人 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                marginRight="20"
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="md-people" size={18} color="#41D3FF" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 16}} >附近的人</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            {/* 购物 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                marginRight="20"
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="ios-share" size={18} color="#E89D90" ></Icon>
                </View>
                <View style={styles.itemWrapper}>
                  <Text style={{fontSize: 16}} >购物</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            {/* 小游戏 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                marginRight="20"
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="ios-american-football" size={18} color="#FBABFF" ></Icon>
                </View>
                <View style={styles.itemWrapper}>
                  <Text style={{fontSize: 16}} >小游戏</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>

            {/* 小程序 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15}}>
              <TouchableOpacity
                onPress={this.props.navigation.getParam('takePicture')}
                marginRight="20"
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="ios-link" size={18} color="#9790E8" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 16}} >小程序</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>

          </View>
        );
    }
}
const styles = StyleSheet.create({
  msgHeader: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  itemWrapper: {
    flex: 1, 
    flexDirection: 'row', 
    marginLeft: 15, 
    justifyContent: 'space-between', 
    height: 30,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  }
})

export default MyScreen