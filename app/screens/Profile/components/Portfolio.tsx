import { useNavigation } from '@react-navigation/native';
import AnimatedImage from 'components/AnimatedImage';
import React, { useLayoutEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from '../style';

interface IProps {
    items: string[]; 
    userData: object; 
    currentUser: any;
}

const Portfolio = (props: IProps) => {
    const renderItem = ({ item }: any) => {
        return (
            <AtWORK
                key={item?._id}
                post={item}
                currentUser={props.currentUser}
                userData={props.userData}
            />
        );
    };
    return (
        props?.items?.length > 0 && (
            <FlatList
                data={props.items}
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
        )
    );
};
export default React.memo(Portfolio);

const AtWORK = (props: {
    post: object;
    currentUser: boolean;
    userData: object;
}) => {
    const navigation = useNavigation();
    const { post } = props;
    const [width, setWidth] = useState(160);
    useLayoutEffect(() => {
        if (!post?.resize_width || !post.orignal_width) {
            Image.getSize(props.post?.post_image, (imageWidth, height) => {
                const currentWidth = (imageWidth * 160) / height;
                if (!isNaN(currentWidth)) {
                    setWidth(currentWidth);
                }
            });
        } else {
            let calculatorWidth =
                post?.resized_image_path && post?.resize_width
                    ? post?.resize_width
                    : post?.post_image && post.orignal_width
                    ? post.orignal_width
                    : 160;
            const height =
                post?.resized_image_path && post?.resize_height
                    ? post?.resize_height
                    : post?.post_image && post.orignal_height
                    ? post.orignal_height
                    : 160;
            const currentWidth = (calculatorWidth * 160) / height;
            if (!isNaN(currentWidth)) {
                setWidth(currentWidth);
            }
        }
    }, []);
    return (
        <TouchableOpacity
            key={props.post?._id}
            onPress={() => {
                navigation.navigate('AddPortfolio', {
                    mediaUrl: props.post?.post_image,
                    data: props.post,
                    isPreView: true,
                    editView: false,
                    userWork: props.currentUser ? true : false,
                    userData: props.userData,
                });
            }}>
            {props.currentUser && (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddPortfolio', {
                            mediaUrl: props.post?.post_image,
                            data: props.post,
                            isPreView: true,
                            editView: props.currentUser ? true : false,
                            userWork: props.currentUser ? true : false,
                            userData: props.userData,
                        });
                    }}
                    style={styles.editIcon}>
                    <Ionicons
                        color={'rgba(0, 0, 0, 1)'}
                        name={'ellipsis-vertical'}
                        size={20}
                    />
                </TouchableOpacity>
            )}
            <AnimatedImage
                thumbnail={props.post?.resized_image_path}
                style={[
                    styles.PortfolioContainerImage,
                    { width: width, height: 160 },
                ]}
                resizeMode="cover"
                uri={props.post?.post_image}
                source={{
                    uri: props.post?.resized_image_path
                        ? props.post?.resized_image_path
                        : props.post?.post_image,
                }}
            />
        </TouchableOpacity>
    );
};
