import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
            cameraType: RNCamera.Constants.Type.back 
        }
        this.takePicture = this.takePicture.bind(this);
        this.swtichCamera = this.swtichCamera.bind(this);
        // alert(RNCamera.Constants.Type.back)
    }
    takePicture = async (camera) => {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        alert(data.uri);
    };

    swtichCamera = () => {
        if(this.state.cameraType === RNCamera.Constants.Type.front) {
            this.setState({
                cameraType: RNCamera.Constants.Type.back
            })
            alert(this.state.cameraType)
        } else {
            this.setState({
                cameraType: RNCamera.Constants.Type.front
            })
            alert(this.state.cameraType)
        }
    }
    
    render() {
        return (
            <View style={{flex: 1, paddingBottom: 20}}>
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
                                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.swtichCamera} style={styles.capture}>
                                        <Text style={{ fontSize: 14 }}> swtich </Text>
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
  })


export default CameraComponent;
