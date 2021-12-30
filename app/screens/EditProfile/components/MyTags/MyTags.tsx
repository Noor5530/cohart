import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import RemoveIcon from "assets/ic_remove.png";
import PlusIcon from "assets/ic_plus.png";
import styles from "./style";
import { IMyTags } from "models/reducers/user";
import saveUserProfileTags, { ISaveTags } from "services/saveUserProfileTags";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch } from "react-redux";
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

enum TagType {
  NORMAL = "NORMAL",
  MEDIUM = "MEDIUM",
  MOOD = "MOOD",
}

interface IProps {
  closeCollapsibleSection(): void;
  myTags: IMyTags;
  setSubmitForm(): void;
}

const MyTags: React.FC<IProps> = (props: IProps) => {
  const {
    myTags: { user_id },
    closeCollapsibleSection,
    setSubmitForm,
  } = props;
  const dispatch = useDispatch();

  const [data, setData] = useState<IMyTags>(props.myTags);

  useEffect(() => {
    setData(props.myTags);
   
    return () => {
      setData({})
    };
  }, [props.myTags]);
  const [submitting, setSubmitting] = useState<Boolean>(false);

  const handlePressCard =
    (payload: {
      _id: string;
      title: string;
      is_active: boolean;
      type: string;
    }) =>
    () => {
      let updatedData = { ...data };
      if (payload.type === TagType.NORMAL) {
        if (!data.user_tags) return;

        const newTagsUpdate = data.user_tags.map((tag) => {
          if (tag._id === payload._id) {
            return {
              ...tag,
              is_active: !payload.is_active,
            };
          }
          return tag;
        });
        updatedData["user_tags"] = newTagsUpdate;
      } else if (payload.type === TagType.MOOD) {
        if (!data.user_moods) return;

        const newTagsUpdate = data.user_moods.map((tag) => {
          if (tag._id === payload._id) {
            return {
              ...tag,
              is_active: !payload.is_active,
            };
          }
          return tag;
        });
        updatedData["user_moods"] = newTagsUpdate;
      } else if (payload.type === TagType.MEDIUM) {
        if (!data.user_mediums) return;

        const newTagsUpdate = data.user_mediums.map((tag) => {
          if (tag._id === payload._id) {
            return {
              ...tag,
              is_active: !payload.is_active,
            };
          }
          return tag;
        });
        updatedData["user_mediums"] = newTagsUpdate;
      }

      console.log("Update data " + JSON.stringify(updatedData));
      setData(updatedData);
    };

  const onSubmit = async () => {
    setSubmitting(true);
    // Transform
    const payload: ISaveTags = {
      id: user_id,
      tags: data.user_tags
        ?.filter((tag) => tag.is_active)
        .map((tagObj) => tagObj._id),
      moods: data.user_moods
        ?.filter((tag) => tag.is_active)
        .map((tagObj) => tagObj._id),
      mediums: data.user_mediums
        ?.filter((tag) => tag.is_active)
        .map((tagObj) => tagObj._id),
    };

    
    
    try {
      await saveUserProfileTags(payload);
    } catch (error: any) {
      if (error?.response?.status == 401) {
        dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
      }
    }

    
    setSubmitting(false);
    setSubmitForm((prev) =>
      prev.map((_, index) => (index === 2 ? true : false))
    );
    closeCollapsibleSection();
  };

  if (!data ) return <View style={styles.container}/>

  return (
    <View style={styles.container}>
      <View style={styles.tagListContainer}>
        <View key={TagType.NORMAL} style={styles.tagListItemContainer}>
          <Text style={styles.tagListHeader}>Roles</Text>
          <View style={styles.tagListItemGroup}>
            {data && data?.user_tags.map((tag) => (
              <TouchableOpacity
                onPress={handlePressCard({ ...tag, type: TagType.NORMAL })}
                key={tag._id}
                style={[
                  styles.tagButton,
                  tag.is_active && styles.tagButtonActive,
                ]}
              >
                {tag.is_active ? (
                  <Image source={RemoveIcon} style={styles.icon} />
                ) : (
                  <Image source={PlusIcon} style={styles.icon} />
                )}
                <Text
                  style={[
                    styles.buttonText,
                    tag.is_active && styles.buttonTextActive,
                  ]}
                >
                  {tag.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View key={TagType.MOOD} style={styles.tagListItemContainer}>
          <Text style={styles.tagListHeader}>Moods</Text>
          <View style={styles.tagListItemGroup}>
            {data && data?.user_moods.map((tag) => (
              <TouchableOpacity
                onPress={handlePressCard({ ...tag, type: TagType.MOOD })}
                key={tag._id}
                style={[
                  styles.tagButton,
                  tag.is_active && styles.tagButtonActive,
                ]}
              >
                {tag.is_active ? (
                  <Image source={RemoveIcon} style={styles.icon} />
                ) : (
                  <Image source={PlusIcon} style={styles.icon} />
                )}
                <Text
                  style={[
                    styles.buttonText,
                    tag.is_active && styles.buttonTextActive,
                  ]}
                >
                  {tag.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View key={TagType.MEDIUM} style={styles.tagListItemContainer}>
          <Text style={styles.tagListHeader}>Mediums</Text>
          <View style={styles.tagListItemGroup}>
            {data && data?.user_mediums.map((tag) => (
              <TouchableOpacity
                onPress={handlePressCard({ ...tag, type: TagType.MEDIUM })}
                key={tag._id}
                style={[
                  styles.tagButton,
                  tag.is_active && styles.tagButtonActive,
                ]}
              >
                {tag.is_active ? (
                  <Image source={RemoveIcon} style={styles.icon} />
                ) : (
                  <Image source={PlusIcon} style={styles.icon} />
                )}
                <Text
                  style={[
                    styles.buttonText,
                    tag.is_active && styles.buttonTextActive,
                  ]}
                >
                  {tag.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        {submitting ? (
          <ActivityIndicator color="black" size="small" />
        ) : (
          <Text style={styles.buttonSubmitText}>{"I'M DONE"}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MyTags;
