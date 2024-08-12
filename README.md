## Environment
Use the [react native official doc](https://reactnative.dev/docs/environment-setup) to guide you setting up the environment. As this written I'm running Windows 10 with Node 14.16 and as for the MacOS 11.4 with Xcode 12.5.1 and Node 14.17.2

## Installation

 - npm install
 - for ios build, go to ios directory, run pod install
 - npx react-native run-android or npx react-native run-ios

## Troubleshoot

 - you may have an error says "duplicate output file.." on ios build after clonnig this file project, to fix this open xcode > target webopt > build phases > delete all font from react-native-vector icons
## build .apk or .aab

 - refer to [official guide](https://reactnative.dev/docs/signed-apk-android) to generate the keystroke
 - go to android directory
 - grandlew assemble release


## running on ios device via terminal
 - [Our holy stackoverflow will guide you](https://stackoverflow.com/questions/38495793/run-react-native-application-on-ios-device-directly-from-command-line)

 ## running on ios device via xcode
 - open .xcodeproj file
 - click run