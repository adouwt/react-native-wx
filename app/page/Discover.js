import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Animated, Easing} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { getLabelPrinter } from 'jest-matcher-utils';

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
            <View style={{marginRight: 20, position: 'relative'}}>
              <TouchableOpacity
                onPress={navigation.getParam('Toggle')}
                marginRight="20"
              >
                <Icon name="md-add-circle-outline" size={18} color="#333"></Icon>
              </TouchableOpacity>
            </View>
          ),
        };
    }

    constructor(props) {
        super(props)
        this.state = {
          isOn: false,
          animatedRightValue: new Animated.Value(-140),
          animatedValue: new Animated.Value(0),
        }
    }

    componentDidMount() {
      this.props.navigation.setParams({ Toggle: this.toggleHandle });
    }
    
    toggleHandle = () => {
      this.modelComponent()
      this.setState({
        isOn: !this.state.isOn
      },
      () => {
        Animated.timing(
          this.state.animatedRightValue,
          { 
            toValue: this.state.isOn ? 7 : -140,
            // easing: Easing.ease,
            duration: 100,
          }
        ).start()
      }
      );
    } 

    modelComponent = () => {
        return (
          <Animated.View style={{
            position: 'absolute',
            top: 10,
            right: this.state.animatedRightValue,
            width: 140,
            height: 240,
            backgroundColor: '#555',
            borderRadius: 5,
            zIndex:999,
            }}>
            <Text style={styles.modelArrow}></Text>
            <View style={styles.modelContainer}>
              <View style={{height: 35, marginBottom: 10}}>
                  <TouchableOpacity onPress={ () =>{alert('群聊')}}>
                    <View style={styles.modelContainerItem}> 
                      <View style={{height: 30}}>
                        <Icon name="md-chatboxes" size={18} color="#fff" ></Icon>
                      </View>
                      <View style={styles.txt}><Text style={{color: '#fff'}}>发起群聊</Text></View>
                    </View>
                  </TouchableOpacity>
                </View>
              <View style={{height: 35, marginBottom: 10}}>
                <TouchableOpacity onPress={ () =>{alert('群聊')}}>
                  <View style={styles.modelContainerItem}> 
                    <View style={{height: 30}}>
                      <Icon name="md-person-add" size={20} color="#fff" ></Icon>
                    </View>
                    <View style={styles.txt}><Text style={{color: '#fff'}}>添加朋友</Text></View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{height: 35, marginBottom: 10}}>
                <TouchableOpacity onPress={ () =>{alert('群聊')}}>
                  <View style={styles.modelContainerItem}> 
                    <View style={{height: 30}}>
                      <Icon name="ios-qr-scanner" size={18} color="#fff" ></Icon>
                    </View>
                    <View style={styles.txt}><Text style={{color: '#fff'}}>扫一扫</Text></View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{height: 35, marginBottom: 10}}>
                <TouchableOpacity onPress={ () =>{alert('群聊')}}>
                  <View style={styles.modelContainerItem}> 
                    <View style={{height: 30}}>
                      <Icon name="ios-aperture" size={18} color="#fff" ></Icon>
                    </View>
                    <View style={styles.txt}><Text style={{color: '#fff'}}>收付款</Text></View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{height: 35, marginBottom: 10}}>
                <TouchableOpacity onPress={ () =>{alert('群聊')}}>
                  <View style={styles.modelContainerItem}> 
                    <View style={{height: 30}}>
                      <Icon name="ios-mail" size={18} color="#fff" ></Icon>
                    </View>
                    <View style={styles.txt}><Text style={{color: '#fff'}}>帮助与反馈</Text></View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        ) 
        // return <Animated.View style={{width: 0}}></Animated.View>
    }

    toFriendCicle = () => {
      this.props.navigation.navigate('FriendCircle')
    };

    render() {
        return (
          <View style={{flex: 1, backgroundColor: '#eee', position: 'relative'}}>
            {/* 弹框 */}
            {this.modelComponent()}
            {/* 朋友圈 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15}}>
              <TouchableOpacity
                onPress={this.toFriendCicle.bind(this)}
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
                onPress={this.toFriendCicle.bind(this)}
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
                onPress={this.toFriendCicle.bind(this)}
                marginRight="20"
              >
              <View style={styles.msgHeader}>
                <View style={{color: '#333', width: 18, height: 20}}>
                  <Icon name="ios-images" size={18} color="#00c1de" ></Icon>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 15, justifyContent: 'space-between', height: 50}}>
                  <Text style={{fontSize: 16}} >摇一摇</Text>
                  <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>
                </View>
              </View>
              </TouchableOpacity>
            </View>
            {/* 看一看 */}
            <View style={{backgroundColor: '#fff', height: 50, padding: 15, marginTop: 15}}>
              <TouchableOpacity
                onPress={this.toFriendCicle.bind(this)}
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
                onPress={this.toFriendCicle.bind(this)}
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
                onPress={this.toFriendCicle.bind(this)}
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
                onPress={this.toFriendCicle.bind(this)}
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
                onPress={this.toFriendCicle.bind(this)}
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
                onPress={this.toFriendCicle.bind(this)}
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
  },
  model: {
    position: 'absolute',
    top: 10,
    right: 7,
    height: 240,
    width: 140,
    backgroundColor: '#555',
    borderRadius: 5,
    zIndex:999,
  },
  modelArrow: {
    width: 20,
    height: 20,
    backgroundColor: '#555',
    position:'absolute',
    right: 10,
    top: -5,
    borderRadius: 5,
    transform: [{rotate:'45deg'}],
  },
  modelContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 15
  },
  modelContainerItem: {
    flex: 1,
    flexDirection: 'row',
  },
  txt :{
    marginLeft: 10,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#444047',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    color: '#fff',
    height: 30,
    width: 100,
  }
})

export default MyScreen