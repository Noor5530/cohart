import React from 'react';
import { Text, View } from 'react-native';

// import { useRoute } from '@react-navigation/native';
// import avatar from 'assets/avatar.png';
// import React, { useEffect, useRef, useState } from 'react';
// import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
// import { Configuration, VESDK } from 'react-native-fast-videoeditorsdk';
// VESDK.unlockWithLicense({
//   api_token: '3lj845DZm7SoWWpqpF6OTQ',
//   app_identifiers: ['com.cohartinc.cohart'],
//   available_actions: [],
//   domains: ['https://api.photoeditorsdk.com'],
//   enterprise_license: false,
//   expires_at: 1624060800,
//   features: [
//     'camera',
//     'library',
//     'export',
//     'whitelabel',
//     'customassets',
//     'frame',
//     'overlay',
//     'textdesign',
//     'transform',
//     'adjustment',
//     'brush',
//     'filter',
//     'focus',
//     'sticker',
//     'text',
//     'trim',
//     'composition',
//     'videolibrary',
//     'audio',
//   ],
//   issued_at: 1621490766,
//   minimum_sdk_version: '1.0',
//   owner: 'Ahtisham Shahzad',
//   platform: 'Android',
//   products: ['vesdk'],
//   version: '2.4',
//   signature:
//     'L5lzlirKmdNvlYMaUB6+Z1kLG2u1giyRG6ZE6lC9opY+x51ZW0KxDJ0bi9NviKIdf7Nj5Pzox1gtT5nIv5Qi5MlhGVsy/6e9JSWenLiRsb8kbeHzXyZ0tidSzSNKNKaFsp9nbI74iHRXpXRTGUDfxWdqh+EP3C+MA75vDVI7a7EfruxB+At2LwZsEmY+zK6gnQZg6ymXZXRvGezus0gfKuBxDzDQ++/KaVpCCNcq17RuH471XjqPnfG/b5z8koAIXa29/UZrYpOAtePkLe0VKiueEVtm7p6dKq9Gp76mpWt68gS+ahAXYbIR2Mdx9idl05eZZXKGdTRLAJJBS1W7hLE98bLTcNw7d6BBOMxCL643IWgyCWLZspjgHN1ikK5ewRE8LlNUbKPYZGc0X/SogPK6Sa4Kictmf5EQXpwOndGRAzIQ1ba8Z+dazF4sidCndnEH8a+vPzJ6FXJKDawG140u3vPM6vtJu53k72Bt3qJ0t1gwjBLdEJVlDvsGMCOvheMlbXdQYBuF6XU6eSfT5qDvA9BrtB+OlFh9fj2w2oCmu3x6dGLhHvcfinKeS6D/tqYy0O+92Pf5g+502a6G9YQX56GV/TXGI5HK2grvFmtXRLxh5BXAZ6PSOABIsVgCG6BGQtqbPkNI0PvSo4y8dyyO46fq3xoAKALlLgaItEo=',
// });

// /**
//  * Uncomment the following single line of code to unlock VideoEditor SDK automatically
//  * for both platforms. Every platform requires a separate license file which must be
//  * named `vesdk_license.ios.json` for the iOS license and `vesdk_license.android.json`
//  * for the Android license file.
//  */
// // VESDK.unlockWithLicense(require('./vesdk_license'));

// const App: () => React$Node = () => {
//   const route = useRoute();
//   const { mediaUrl = '', post = null } = route.params;
//   console.log('mediaUrl', mediaUrl);
//   const openEditor = () => {
//     // Set up sample video
//     let video = { uri: mediaUrl.path };
//     // Set up configuration
//     let configuration: Configuration = {
//       // Configure sticker tool
//       sticker: {
//         // Enable personal stickers
//         personalStickers: true,
//         // Configure stickers
//         categories: [
//           // Create sticker category with stickers
//           {
//             identifier: 'example_sticker_category_logos',
//             name: 'Logos',
//             thumbnailURI: avatar,
//             items: [
//               {
//                 identifier: 'example_sticker_logos_react',
//                 name: 'React',
//                 stickerURI: avatar,
//               },
//               {
//                 identifier: 'example_sticker_logos_imgly',
//                 name: 'img.ly',
//                 stickerURI: avatar,
//               },
//             ],
//           },
//           // Reorder and use existing sticker categories
//           { identifier: 'imgly_sticker_category_animated' },
//           { identifier: 'imgly_sticker_category_emoticons' },
//           // Modify existing sticker category
//           {
//             identifier: 'imgly_sticker_category_shapes',
//             items: [
//               { identifier: 'imgly_sticker_shapes_badge_01' },
//               { identifier: 'imgly_sticker_shapes_arrow_02' },
//               { identifier: 'imgly_sticker_shapes_spray_03' },
//             ],
//           },
//         ],
//       },
//     };
//     VESDK.openEditor(video, configuration).then(
//       result => {
//         console.log('resultpath', result);
//       },
//       error => {
//         console.log('error', error);
//       },
//     );
//   };
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>VideoEditor SDK</Text>
//               <TouchableHighlight onPress={openEditor}>
//                 <Text style={styles.sectionDescription}>
//                   Click here to{' '}
//                   <Text style={styles.highlight}>edit a sample video</Text>.
//                 </Text>
//               </TouchableHighlight>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}></Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}></Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     //  backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     // backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     //   color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     //   color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     //  color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;

export default function TrimVideo() {
  return (
    <View>
      <Text />
    </View>
  );
}
