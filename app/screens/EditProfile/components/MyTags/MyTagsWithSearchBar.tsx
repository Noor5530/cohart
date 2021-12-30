// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, Image } from "react-native";
// // import { TextInput } from "react-native-paper";
// // import { debounce } from "lodash";

// import RemoveIcon from "assets/ic_remove.png";
// import PlusIcon from "assets/ic_plus.png";
// import styles from "./style";
// import { IMyTags, ITag } from "models/reducers/user";
// import saveUserProfileTags, { ISaveTags } from "services/saveUserProfileTags";
// import { ActivityIndicator } from "react-native-paper";

// enum TagType {
//   NORMAL = "NORMAL",
//   MEDIUM = "MEDIUM",
//   MOOD = "MOOD"
// }

// interface IProps {
//   closeCollapsibleSection(): void;
//   myTags: IMyTags;
// }

// const MyTags: React.FC<IProps> = (props: IProps) => {

//   console.log('My tags ==> ' + JSON.stringify(props));
//   const { myTags: { user_id }, closeCollapsibleSection } = props;

//   const [data, setData] = useState<IMyTags>(props.myTags);
//   const [submitting, setSubmitting] = useState<Boolean>(false);


//   console.log('data ==> ' + JSON.stringify(data));

//   // const [focus, setFocus] = useState(false);
//   // const searchInputRef = useRef<any>();

//   const handlePressCard =
//     (payload: {
//       _id: string;
//       title: string;
//       is_active: boolean;
//       type: string;
//     }) =>
//     () => {

//       let updatedData = {...data};
//       if (payload.type === TagType.NORMAL) {
//         if (!data.user_tags) return;

//         const newTagsUpdate = data.user_tags.map((tag) => {
//           if (tag._id === payload._id) {
//             return {
//               ...tag,
//               is_active: !payload.is_active
//             }
//           }
//           return tag;
//         });
//         updatedData['user_tags'] = newTagsUpdate;
              
//       } else if (payload.type === TagType.MOOD) {
//         if (!data.user_moods) return;

//         const newTagsUpdate = data.user_moods.map((tag) => {
//           if (tag._id === payload._id) {
//             return {
//               ...tag,
//               is_active: !payload.is_active
//             }
//           }
//           return tag;
//         });
//         updatedData['user_moods'] = newTagsUpdate;


//       } else if (payload.type === TagType.MEDIUM) {
//         if (!data.user_mediums) return;

//         const newTagsUpdate = data.user_mediums.map((tag) => {
//           if (tag._id === payload._id) {
//             return {
//               ...tag,
//               is_active: !payload.is_active
//             }
//           }
//           return tag;
//         });
//         updatedData['user_mediums'] = newTagsUpdate;
//       }

//       console.log('Update data ' + JSON.stringify(updatedData));
//       setData(updatedData);
//     };

//     const onSubmit = async () => {
//       setSubmitting(true);
//       // Transform
//       const payload : ISaveTags = {
//         id: user_id,
//         tags: data.user_tags?.filter(tag => tag.is_active).map(tagObj => tagObj._id),
//         moods: data.user_moods?.filter(tag => tag.is_active).map(tagObj => tagObj._id),
//         mediums: data.user_mediums?.filter(tag => tag.is_active).map(tagObj => tagObj._id)
//       };
//       await saveUserProfileTags(payload);
//       setSubmitting(false);
//       closeCollapsibleSection();
//     };

//   // const handleChangeText = (text: string) => {
//   //   debounceFn(text);
//   // };

//   // const handleDebounceSearch = (value: string) => {
//   //   if (value.trim().length === 0) {
//   //     setData(dummyData);
//   //     return;
//   //   }
//   //   setData((prev) =>
//   //     prev.map((item) => {
//   //       return {
//   //         ...item,
//   //         tagList: item.tagList.filter((tag) => {
//   //           return tag.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
//   //         }),
//   //       };
//   //     })
//   //   );
//   // };

//   // const debounceFn = useCallback(debounce(handleDebounceSearch, 1000), []);

//   // const clearTextInput = () => {
//   //     searchInputRef.current.clear()
//   //     setData(dummyData);
//   // }


//   return (
//     <View style={styles.container}>
//       {/** Hide search bar temporarily until we have the submit suggested tag*/}
//       {/* <TextInput
//         ref={searchInputRef}
//         label={undefined}
//         placeholder="Search"
//         mode="outlined"
//         style={styles.textInputStyle}
//         returnKeyType="done"
//         onFocus={() => setFocus(true)}
//         onBlur={() => setFocus(false)}
//         onChangeText={handleChangeText}
//         theme={{
//           colors: {
//             primary: 'black',
//             text: "black",
//             accent: "black",
//             placeholder: "#a9a9a9",
//           },
//         }}
//         underlineColor={"transparent"}
//         right={
//           focus ? (
//             <TextInput.Icon onPress={clearTextInput} name="close" style={{ marginTop: 13 }} />
//           ) : (
//             <TextInput.Icon name="magnify" style={{ marginTop: 13 }} />
//           )
//         }
//       /> */}
//       <View style={styles.tagListContainer}>
//           <View key={TagType.NORMAL} style={styles.tagListItemContainer}>
//             <Text style={styles.tagListHeader}>Normal Tags</Text>
//             <View style={styles.tagListItemGroup}>
//               {data.user_tags.map((tag) => (
//                 <TouchableOpacity
//                   onPress={handlePressCard({ ...tag, type: TagType.NORMAL })}
//                   key={tag._id}
//                   style={[
//                     styles.tagButton,
//                     tag.is_active && styles.tagButtonActive,
//                   ]}
//                 >
//                   {tag.is_active ? (
//                     <Image source={RemoveIcon} style={styles.icon} />
//                   ) : (
//                     <Image source={PlusIcon} style={styles.icon} />
//                   )}
//                   <Text
//                     style={[
//                       styles.buttonText,
//                       tag.is_active && styles.buttonTextActive,
//                     ]}
//                   >
//                     {tag.title}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//           <View key={TagType.MOOD} style={styles.tagListItemContainer}>
//             <Text style={styles.tagListHeader}>Moods</Text>
//             <View style={styles.tagListItemGroup}>
//               {data.user_moods.map((tag) => (
//                 <TouchableOpacity
//                   onPress={handlePressCard({ ...tag, type: TagType.MOOD })}
//                   key={tag._id}
//                   style={[
//                     styles.tagButton,
//                     tag.is_active && styles.tagButtonActive,
//                   ]}
//                 >
//                   {tag.is_active ? (
//                     <Image source={RemoveIcon} style={styles.icon} />
//                   ) : (
//                     <Image source={PlusIcon} style={styles.icon} />
//                   )}
//                   <Text
//                     style={[
//                       styles.buttonText,
//                       tag.is_active && styles.buttonTextActive,
//                     ]}
//                   >
//                     {tag.title}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//           <View key={TagType.MEDIUM} style={styles.tagListItemContainer}>
//             <Text style={styles.tagListHeader}>Mediums</Text>
//             <View style={styles.tagListItemGroup}>
//               {data.user_mediums.map((tag) => (
//                 <TouchableOpacity
//                   onPress={handlePressCard({ ...tag, type: TagType.MEDIUM })}
//                   key={tag._id}
//                   style={[
//                     styles.tagButton,
//                     tag.is_active && styles.tagButtonActive,
//                   ]}
//                 >
//                   {tag.is_active ? (
//                     <Image source={RemoveIcon} style={styles.icon} />
//                   ) : (
//                     <Image source={PlusIcon} style={styles.icon} />
//                   )}
//                   <Text
//                     style={[
//                       styles.buttonText,
//                       tag.is_active && styles.buttonTextActive,
//                     ]}
//                   >
//                     {tag.title}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={onSubmit}>
//         {submitting ? (
//           <ActivityIndicator color="black" size="small" />
//         ) : (
//           <Text style={styles.buttonText}>I'M DONE</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default MyTags;
