# RN Dummy
git clone https://github.com/coolworld2015/rn-dummy.git
-------------------------------------------------------------------------------------------------
git config user.name "coolworld2015"
-------------------------------------------------------------------------------------------------
git config user.email "wintermute2015@ukr.net"
-------------------------------------------------------------------------------------------------
npm install -g react-native-cli
-------------------------------------------------------------------------------------------------
react-native init AwesomeProject
-------------------------------------------------------------------------------------------------
npm i
-------------------------------------------------------------------------------------------------
react-native run-ios //CMD+D
-------------------------------------------------------------------------------------------------
react-native run-android //CMD+M
-------------------------------------------------------------------------------------------------
react-native run-ios --simulator="iPhone 5"
-------------------------------------------------------------------------------------------------
Сертификаты for Distribution
-------------------------------------------------------------------------------------------------
https://www.diawi.com/ for *.ipa
-------------------------------------------------------------------------------------------------
xCode 8 update
-------------------------------------------------------------------------------------------------
RCTWebSocet -> Apple LLVM 8.0 Custom... -> other warning flags
-------------------------------------------------------------------------------------------------
ANDROID for IOS
-------------------------------------------------------------------------------------------------
echo export "ANDROID_HOME=/Users/ed/Library/Android/sdk" >> ~/.bash_profile
-------------------------------------------------------------------------------------------------
export ANDROID_HOME=/Users/ed/Library/Android/sdk
-------------------------------------------------------------------------------------------------
export PATH=$PATH:$ANDROID_HOME/bin
-------------------------------------------------------------------------------------------------
add VirtualBox
-------------------------------------------------------------------------------------------------
ERROR -> cd android/ && ./gradlew clean
-------------------------------------------------------------------------------------------------
MAKE DIR--> android/app/src/main/assets
-------------------------------------------------------------------------------------------------
APK -> react-native bundle --dev false --platform android --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ 
-------------------------------------------------------------------------------------------------
APK -> cd android && ./gradlew assembleDebug && cd ..
-------------------------------------------------------------------------------------------------
RELEASE -> cd android -> assembleRelease -> \android\app\build\outputs\apk
-------------------------------------------------------------------------------------------------
PIC -> /android/app/src/main/res/mipmap
-------------------------------------------------------------------------------------------------
CONFIG -> android/app ->build.gradle /applicationId + versionName
-------------------------------------------------------------------------------------------------
NAME -> android\app\src\main\res\values\strings
-------------------------------------------------------------------------------------------------
INSTALL ->
remove ios/build
remove android/app/build
remove node_modules
npm i
react-native link react-native-gesture-handler
-------------------------------------------------------------------------------------------------
cd ios && pod install && cd ..
-------------------------------------------------------------------------------------------------
APK -> android/app/build.gradle -> def enableSeparateBuildPerCPUArchitecture = true
-------------------------------------------------------------------------------------------------
