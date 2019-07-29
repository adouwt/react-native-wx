# Uncomment the next line to define a global platform for your project
# platform :ios, '9.0'
 
target 'AwesomeProject' do
    rn_path = '../node_modules/react-native'

    xcodeproj 'ios/AwesomeProject'
    pod 'yoga', path: "#{rn_path}/ReactCommon/yoga/yoga.podspec"
    pod 'React', path: rn_path, subspecs: [
        'Core',
        'CxxBridge',
        'DevSupport', 
        'RCTText',
        'RCTNetwork',
        'RCTWebSocket', 
        'RCTAnimation'
    ]
  
    pod 'DoubleConversion', :podspec => "#{rn_path}/third-party-podspecs/DoubleConversion.podspec"
    pod 'glog', :podspec => "#{rn_path}/third-party-podspecs/glog.podspec"
    pod 'Folly', :podspec => "#{rn_path}/third-party-podspecs/Folly.podspec"
  
    pod 'react-native-baidu-map', :podspec => '../node_modules/react-native-baidu-map/ios/react-native-baidu-map.podspec'
    
    post_install do |installer|
      installer.pods_project.targets.each do |target|
        if target.name == "React"
          target.remove_from_project
        end
    
        if target.name == "yoga"
          target.remove_from_project
        end
      end
    end
end
