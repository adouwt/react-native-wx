# react-native-wx
模仿微信界面的RN

## 使用
```
  git clone https://github.com/adouwt/react-native-wx.git
  cd react-native-wx
  npm install 
  npm run ios or npm run and
```
博客预览地址：

[先预览看看](https://segmentfault.com/a/1190000019333809)


### RN 从上手到“放弃”
前言： react-native，相对于最近🔥的飞起的flutter，不算是一个新技术，2015年Facebook 开源，到现在已经4 5 个年头，一直在维护当中，但是至今未发布 v1 版本，目前已经更新到0.59。 该技术目标： 跨平台实现原生应用。 GitHub start 数目： 77602（2019-5-29）。
![clipboard.png](/img/bVbteHp)
文章内，图片很多，占据了一定的篇幅。班门弄斧之作，若有大神见到，敬请指教，有不对不合理之处，敬请指出！我是迩伶贰！
##正文
github地址： https://github.com/adouwt/react-native-wx

nodejs后台：https://github.com/adouwt/nodejsAPI 
### 1、项目预览
现在已完成的功能展示：
![图片描述][1]

入手demo项目，本打算模仿微信的功能做一遍。现在已经完成微信的一级界面。截图如下：
首页：

![clipboard.png](/img/bVbteIc)

通信录：


![clipboard.png](/img/bVbteIA)


发现：

![clipboard.png](/img/bVbteJb)


我：

![clipboard.png](/img/bVbteIj)

朋友圈（上拉加载和下拉刷新）： 
（未完成，就是调用了接口）

![clipboard.png](/img/bVbteIM)

聊天界面：


![clipboard.png](/img/bVbteIV)

摄像头拍照（安卓虚拟机）：


![clipboard.png](/img/bVbtfpo)



----------



项目主要使用插件（库）： 

 1. react-native-camera （调用摄像头）  
 2. react-native-vector-icons （图标库）
 3. react-navigation （路由导航）

参考资料：
    

 - https://reactnative.cn/
 - https://oblador.github.io/react-native-vector-icons/
 - https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md
 - https://shenbao.github.io/ishehui/html/RN%20%E5%9F%BA%E7%A1%80/React%20Native%20%E6%A0%B7%E5%BC%8F%E8%A1%A8%E6%8C%87%E5%8D%97.html

### 2、项目运行
～前提： 环境搭建及相关软件、安卓或者ios 的模拟器安装， 参考官网即可，https://reactnative.cn/docs/getting-started.html
#### git clone https://github.com/adouwt/react-native-wx.git
#### cd react-native-wx
#### npm i
#### npm run and (安卓)
#### npm run ios (苹果)
（上面的运行命令，我在package.json 做了封装，一些处理编译错误的命令，我也已经封装进去）

![clipboard.png](/img/bVbteL2)

执行命令后，会自动弹出nodejs 执行终端界面，这个是程序运行的一个监控

![clipboard.png](/img/bVbtfoP)
模拟器显示：
![图片描述][2]

### 3、分步实现
#### 3.1 初始化并运行项目
    ```
    react-native init AwesomeProject
    react-native run-ios
    ```
#### 3.2 项目结构说明 

#### 3.3 新建文件夹 app，接下来所有的源码文件代码将在这里

![clipboard.png](/img/bVbteNs)
 
目前新建 component组件、page页面、及utils 工具三个，后面会根据需要建新的文件夹。

![clipboard.png](/img/bVbteNJ)
四个一级界面+ 聊天和朋友圈的界面

#### 3.4 安装插件做页面导航跳转
#### 3.4.1 npm install react-navigation -S

#### 3.4.2 修改项目文件下的App.js
这是根文件，我们的页面导航写进这个组件，我项目中已经完成代码片段，这里直接使用，代码如下：
```
import React from 'react';
import HomeScreen  from './app/page/Home'
import DiscoverScreen from './app/page/Discover'
import UserListScreen from './app/page/UserList'
import MyScreen from './app/page/My'
import CameraComponent from './app/component/camera'
import ChatScreen from './app/page/Chat'
import FriendCircle from './app/page/friendCircle'
import Icon from "react-native-vector-icons/Ionicons";
import { View, Text } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation'; // Version can be specified in package.json


const HomeNav = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions:{
      headerTitle:'微信',
      headerBackTitle:null,
    }
  },
})
const UserListNav = createStackNavigator({
  UserList: {
    screen: UserListScreen,
  },
})

// 二级页面写进一级页面中
const DiscoverNav = createStackNavigator(
  {
    Discover: {
      screen: DiscoverScreen,
    },
  }
)

const MyNav = createStackNavigator(
  {
    My: MyScreen,
  }
);

let BottomNav = createBottomTabNavigator(
  // createBottomTabNavigator 两个参数，一个页面路由，一个是路由配置
  {
    微信: HomeNav,
    通讯录: UserListNav,
    发现: DiscoverNav,
    我: MyNav,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        let badgeCount = 3
        switch(routeName) {
          case '微信':
            iconName = 'ios-text';
            break;
          case '通讯录':
            iconName = 'md-person-add';
            break;
          case '发现':
            iconName = 'md-compass';
            break;
          case '我':
            iconName = 'ios-person';
            break;
        }
        iconColor = `${focused ? '#1AAD19' : '#4D4D4D'}`;

        return (
          <View>
            <Icon name={iconName} size={18} color={iconColor}></Icon>
            { routeName === '发现' && badgeCount > 0 && (
              <View style={{
                // If you're using react-native < 0.57 overflow outside of the parent
                // will not work on Android, see https://git.io/fhLJ8
                position: 'absolute',
                right: -6,
                top: -3,
                backgroundColor: 'red',
                borderRadius: 6,
                width: 12,
                height: 12,
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff'
              }}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{badgeCount}</Text>
              </View>
            )}
          </View>
        )
      },
    }),
    tabBarOptions: {
      activeTintColor: '#1AAD19',
      inactiveTintColor: '#4D4D4D',
    },
  }
);

let RootNav = createStackNavigator({
  BottomNav: {
    screen: BottomNav,
    navigationOptions: ({ navigation, screenProps }) => {
      return {
        header: null,
      };
    }
  },
  Camera: {
    screen: CameraComponent
  },
  Chat: {
    screen: ChatScreen
  },
  FriendCircle: {
    screen: FriendCircle
  }
})

export default createAppContainer(RootNav);
```
这里需要参考导航资料： https://reactnavigation.org/docs/en/tab-based-navigation.html

文档讲的很明白，看看示例就知道怎么用了，我下面讲两个注意内容，这也是在这几天的学习中遇到的troubles.

#### a、创建底部导航：
createBottomTabNavigator 方法，接受两个参数，一个页面路由，一个是路由配置，
直接看这个方法名字，就知道这个是创建底部导航的方法。
--第一个参数，页面路由，这里你写多少tab, 底部就会呈现几个tab 均匀分布，（不要有杠精来袭，“要是有100个tab,怎么显示？”，哪有这样的设计，你要是有100个tab，你试试这样排版？）

![clipboard.png](/img/bVbtfte)

参数的key,就是底部显示的名称，value 就是这个页面 screen。页面screen可以单独定义引入，如下：

![clipboard.png](/img/bVbtfuH)

可以像第一个DiscoverNav，以screen定义的方式引入，也可以简略使用，如下面的MyNav

-- 第二个参数，路由配置，在这里配置，底部导航的样式、图标、foucs 状态及badge等
tabBarIcon 顾名思义，配置他的图标，我这里根据navigation.state 里的routeName 来区分页面路由，从而为他们配置不同的 icon

![clipboard.png](/img/bVbtfyR)

#### b、二级页面注入Stack Navigator
我们写的页面要注入我们的导航，这样才能访问到，我们这里采用的是react-navigation的 createStackNavigaor 的createStackNavigator方法，如图：

![clipboard.png](/img/bVbtfDX)

#### 3.4.3 具体页面逻辑
这里讲两个页面，一个是静态页面，一个是调用接口的长列表的界面。

##### 静态页面 discoverScreen
**布局方式**： flex， 属性和web 书写不一致，语法参考这个不完全手册： https://shenbao.github.io/ishehui/html/RN%20%E5%9F%BA%E7%A1%80/React%20Native%20%E6%A0%B7%E5%BC%8F%E8%A1%A8%E6%8C%87%E5%8D%97.html

**点击按钮封装：** RN 里面的点击方法只能绑定在它的button 组件上，提供的其他组件我们么办法直接绑定事件，它提供了一个封装子组件可以绑定事件的自定义按钮-Touchable 系列 （TouchableOpacity ，TouchableNativeFeedback）如下书写可以点击的item：

![clipboard.png](/img/bVbtf0T)

**注意：** 上面划线的位置，这个样式（flex: 1, flexDirection: 'row',）要写上。有一定的兼容问题，如果没有这个样式，在安卓上无法点击，ios上没有影响。说明在实际开发中，我们还要处理一定的平台差异问题，真正实现无差异的跨平台还是有些困难。

**页面header：**

![clipboard.png](/img/bVbtfKG)
 
在static 里面没办法直接调用组件的方法，需要借助 navigation 来做一下中转，调用setParams将方法放进navigation里面，这样在static里面就可以使用navigation.getParams 获取这个方法了，如下：

![clipboard.png](/img/bVbtfNg)

**过渡动画**

这个方法实现的是一个 动画，我们在 写web 的时候，会用 transform  transaction 这样的动画属性，RN里面也支持这样的动画，具体语法有所差异。这里我们用一个绝对定位里面的 right值 做过渡效果。
开始定义：

![clipboard.png](/img/bVbtf1W)

在点击时候，修改这个 this.state.animateRightValue 的值，实现动画效果，
![clipboard.png](/img/bVbtfY2)

Animated有几个动画（），这里采用了timing,他接受两个参数，一个是监听的动画值，另一个是这个值的配置，配置动画方式，动画时间等。

![clipboard.png](/img/bVbtfZv)

这个页面也没有复杂的页面逻辑，基本一看就知道怎么回事，一些语法 api 不会的话，可以上官网lou 一眼：

![clipboard.png](/img/bVbtgdR)

##### 调接口的页面 friendCircle
这个页面调用了一个分页接口，上拉加载更多，长列表的组件用的是RN 原生的 FlatList 组件，这个具体使用可以参考api 文档看看，

![clipboard.png](/img/bVbtggg)

但是就个人使用之后的感觉而言，这个真正要用到生产，还得要稍微改造一下，比如loading菊花图片要改一改。
在生命周期函数componentDidMount 里面，调用我们的接口。说道这里，我们引出了接口封装问题，用的是自带的fetch，这个fetch 底层具体我们就不考虑怎么实现的，现在我们需要对fetch 封装一下，方便后面在多处使用，fetch 封装如下：
```
let base_url = 'https://api.scampus.cn';  //服务器基本地址
// let base_url = 'http://18.10.1.115:4000';  //服务器基本地址
let token = '';   
/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */
const  fetchRequest = (url, method, params = '') => {
    let header = {
        "Content-Type": "application/json;charset=UTF-8",
        "accesstoken":token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
    };
    if(params == ''){   //如果网络请求中带有参数
        return new Promise(function (resolve, reject) {
            fetch(base_url + url, {
                method: method,
                headers: header
            }).then((response) => response.json())
                .then((responseData) => {
                    resolve(responseData);
                })
                .catch( (err) => {
                    reject(err);
                });
        });
    } else{   //如果网络请求中没有参数
        return new Promise(function (resolve, reject) {
            fetch(base_url + url, {
                method: method,
                headers: header,
                body:JSON.stringify(params)   //body参数，通常需要转换成字符串后服务器才能解析
            }).then((response) => response.json())
                .then((responseData) => {
                    resolve(responseData);
                })
                .catch( (err) => {
                    reject(err);
                });
        });
    }
}

export default fetchRequest

```
使用Promise 处理异步问题，将我们最后的需要的数据统统resolve 出去。封装中规中距，基本是按照文档说明 fetch 的用法，稍加修改

![clipboard.png](/img/bVbtgh2)
##### 调用如下：

![clipboard.png](/img/bVbtsr8)

### 4、使用第三方的图标
npm install -S react-native-vector-icons 
图标地址: https://oblador.github.io/react-native-vector-icons/  注意这站点不是图标全部可用，滚动条快速找到中间位置，就能看到我们需要的图标。
使用： <Icon name="ios-arrow-forward" size={18} color="#333" ></Icon>  name 值可以在上面的地址中寻找，哪个合适就用哪个，
就个人看来，这个图标库基本够开发使用，如果不够可以继续引用字体图标库。

### 5、调用手机硬件设备-摄像头
具体演示实例，拍照功能，用的第三方库，https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md

安装： npm install -S react-native-camera
使用：import { RNCamera } from 'react-native-camera';

```
<View style={styles.container}>
    <RNCamera
        ref={ref => {
            this.camera = ref;
        }}
        style={styles.preview}
        type={ this.state.cameraType}
        flashMode={RNCamera.Constants.FlashMode.on}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
        }}
    >
        {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around',marginBottom: 20 }}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> 拍照 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.swtichCamera} style={styles.capture}>
                    <Icon name="ios-reverse-camera" size={18} color="#333"></Icon>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.lookAlbum} style={styles.imgPreview}>
                        <Image
                            style={styles.imgPreview}
                            source={{uri: this.state.currentUri || 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?', isStatic: true}}
                        />
                    </TouchableOpacity>
                    
                </View>
                );
            }}
        </RNCamera>
    </View>
```

在组件里面可以定义照相机界面的ui，可以自定义拍照按钮，切换摄像头的按钮，拍照图片预览等，调用api 不难，问题难点在配置调用的文件，你得有权限调用原生的设备。
1、修改android/gradle/wrapper/gradle-wrapper.properties
    ```
    distributionUrl=https\://services.gradle.org/distributions/gradle-4.10.1-all.zip
    
    ```
2、修改android/app/build.gradle
```
missingDimensionStrategy 'react-native-camera', 'general'
```
![clipboard.png](/img/bVbtgoF)

在实际安装使用的时候会有相关的提示报错，按照报错信息去寻找解决办法，这里还是得推荐github，上面有很多类似的问题，可以耐心找找。

### 6、结言
   从一开始了解RN 到最后上手demo，到现在陆续修改项目，差不多十天时间，本人的技术栈是vue,react 并没有生产项目，看看文档，基本可以上手。总结而言，使用一些基本的功能，并不难，文档很全，使用的群体很大，所以遇到的问题也可以在相关社区找到合适的解决方法或者替换方案。还没有具体开发生产项目，但是我觉得我将要面临的问题，应该在体验优化上，比如过渡动画，上拉下拉刷新加载，切换视图；集成第三方库，调用硬件设备；性能优化问题等。

### 7、TODO
后面有时间，继续把这个项目做下去，
 - 登录注册
 - 聊天，后面集成聊天机器人
 - 通讯录的人员分组，现在因为是后台接口还没有完成，只是本地造了一个数据
 - 扫码功能
 - 发动态
 - 集成地图
 - 拍照后，图像识别

如果有兴趣的同学欢迎加入一起完成。
react-native 的地址：https://github.com/adouwt/react-native-wx
nodejs的后台地址： https://github.com/adouwt/nodejsAPI




### -1、相关错误处理
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
   

 - react-native-camera 插件的使用问题：

 ![图片描述][3]
    解决： https://github.com/react-native-community/react-native-camera/issues/2150


 - 编译问题

![图片描述][4]
```
    解决： cd android   &&  ./gradlew clean
```

 - Unable to resolve module 'scheduler/tracing' in ReactNative

    
    解决： yarn add @babel/runtime@7.0.0  再重新跑 react-native run-android
    


----------


  开发中还遇到了其他问题，但是忘了做记录 ~~ RN 暂时“放弃”，接下来要使用 flutter，打算两周后 出一个flutter版本。  


----------
--2019-6-4 更新
最近抽空在撸 flutter的版本：
github： [flutter_wx](https://github.com/adouwt/flutter-wx) 有兴趣的同学，可以先点进去看看，后面后抽空迭代开发。



  [1]: /img/bVbtfYA
  [2]: /img/bVbtgvE
  [3]: /img/bVbtgvb
  [4]: /img/bVbtgvv
