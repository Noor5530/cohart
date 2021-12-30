# README #

This README would normally document whatever steps are necessary to get your application up and running.


#1. Make sure NodeJS,React native cli and npm is installed.
###### some script are write for for clean and install in package.json

#2.Install project dependencies
  * npm install

#3 run android
   --npx react-native run-android or npm run android
   4 run ios
  * npm run setup:ios(script for install pod)
   * npx react-native run-ios or npm run ios or open

#5 for clean node node_modules
  npm run clean

#6 for install and clean pods
  * for clean pod:
  * npm run clean:ios (script for delete pod)
  * for install pods
  * npm run setup:ios
#7 for clean android (if required)
  * npm run  clean:android (script for android clean)


#8 generate android build run
 for beta build:
     copy firebase json file using this command
       npm run copy-dev-firebaseFile than
       --npm clean clean:android
      --  npm run android:staging-release
      for production build:
         -- copy firebase json file using this command

            npm run copy-prd-firebaseFile than
            --npm clean clean:android
            -- npm run android:production-release
#9 generate ios build
   *download certificates and add in key store
  * password for all certificate and .developerprofile
  * password: 123456789
   * open  .developerprofile file in xcode
   * login with apple account in xcode
   * add all certificate in keychain
   * after install certificate open cohart/ios folder in xcode then in signing & capabilities   selected   team
  * for beta build
    --select beta scheme from top tab
    --close all  open files
    --copy firebase file by run
      npm run copy-ios-firebase-dev-file
    --run command+shift+k for clean
    --check build id
    *generate archive using xcode and push build in app store connect
    *  for production build
      --select production scheme
      --close all  open files
      --copy firebase file by run
        npm run copy-ios-firebase-prd-file
      --run command+shift+k for clean
      --check build id
      *generate archive using xcode and push build in app store connect

#10 api constant exit in /app/config/api-config.s



