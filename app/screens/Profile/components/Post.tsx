import AnimatedImage from "components/AnimatedImage";
import { AppText } from "components/text";
import React, { FC, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Post } from "utils/stores";

import styles from "../style";

interface IProps {
  onpenEditMode: (...args: any[]) => any;
  openPost: (post: Post) => void;
  currentUser: boolean;
  posts: Post[];
}

const Posts: FC<
  {
    currentUser: boolean;
    posts: Post[];
    openPost: (post: Post) => void;
    onpenEditMode: (...args: any[]) => any;
  } & ViewProps
> = (props: IProps) => {
  const renderItem = ({ item }: any) => {
    if (!item) {
      return <View></View>;
    }
    return (
      <TouchableOpacity key={item?._id} onPress={() => props.openPost(item)}>
        {props.currentUser && (
          <TouchableOpacity
            onPress={() => {
              props.onpenEditMode(item);
            }}
            style={[styles.editIcon, { bottom: 5 }]}
          >
            <Ionicons
              color={"rgba(0, 0, 0, 1)"}
              name={"ellipsis-vertical"}
              size={20}
            />
          </TouchableOpacity>
        )}
        {item?.processing_status == "processed" ? (
          <AtWORK post={item} />
        ) : (
          <View style={styles.postsContainerProcessingView}>
            <AppText style={styles.postsContainerProcessingViewText}>
              {item?.processing_status == "processing"
                ? "processing"
                : "failed"}
            </AppText>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      {props?.posts?.length === 0 ? (
        <View style={styles.postsContainer}>
          <AppText medium style={{ color: "rgba(107, 114, 128, 1)" }}>
            No posts yet
          </AppText>
        </View>
      ) : (
        <FlatList
          data={props?.posts}
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={true}
          keyExtractor={(item, index) => `id_${index}`}
          renderItem={renderItem}
          updateCellsBatchingPeriod={5}
          initialNumToRender={3}
          maxToRenderPerBatch={5}
          windowSize={10}
        />
      )}
    </View>
  );
};

export default React.memo(Posts);

const AtWORK = (props: { post: object }) => {
  const { post } = props;
  const [width, setWidth] = useState(160);
  useLayoutEffect(() => {
    Image.getSize(
      post?.jw_media_thumb ? post.jw_media_thumb : post?.post_file,
      (imageWidth, height) => {
        const currentWidth = (imageWidth * 160) / height;
        if (!isNaN(currentWidth)) {
          setWidth(currentWidth);
        }
      }
    );
  }, [post?.jw_media_thumb, post?.post_file]);
  return (
    <AnimatedImage
      thumbnail={post?.jw_media_thumb}
      style={[styles.postsContainerImage, { width: width, height: 160 }]}
      resizeMode="cover"
      uri={post?.jw_media_thumb}
    />
  );
};
