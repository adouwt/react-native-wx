import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, CameraRoll, TouchableNativeFeedback } from 'react-native';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Waiting</Text>
    </View>
);
class CameraComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            cameraType: RNCamera.Constants.Type.back,
            currentUri: ''
        }
        this.takePicture = this.takePicture.bind(this);
        this.swtichCamera = this.swtichCamera.bind(this);
        // alert(RNCamera.Constants.Type.back)
    }
    takePicture = async (camera) => {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        this.setState({
            currentUri: data.uri
        })
        alert(data.uri);
    };

    swtichCamera = () => {
        if(this.state.cameraType === RNCamera.Constants.Type.front) {
            this.setState({
                cameraType: RNCamera.Constants.Type.back
            })
        } else {
            this.setState({
                cameraType: RNCamera.Constants.Type.front
            })
        }
    }

    lookAlbum = () => {
        alert('查看相册')
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.container}>
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={styles.preview}
                            type={ this.state.cameraType}
                            flashMode={RNCamera.Constants.FlashMode.on}
                            autoFocus={RNCamera.Constants.AutoFocus.off}
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
                                        <Text style={{ fontSize: 14 }}> 切换 </Text>
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
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    preview: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center',
    },
    imgPreview: {
        flex: 0,
        height: 40,
        width: 40,
        borderRadius: 5,
        alignSelf: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    }
  })


export default CameraComponent;
