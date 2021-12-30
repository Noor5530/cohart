import Circle from 'assets/Circle.png';
import Community from 'assets/Community.png';
import Inspiration from 'assets/Inspiration.png';
import StarIconFull from 'assets/StarIconFull.png';

import { appFonts } from 'components/text';
import { placeHolderColor, primary, textColor } from 'config/colors';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    Pressable,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { saveTopicRequest } from 'store/actions/userActions';

import { iconColor } from '../../config/colors';
import AppState from '../../models/reducers';
import ProfileHeader from './components/ProfileHeader';

const data = [
    {
        id: 1,
        name: 'Building My Community',
        tag: Community,
    },
    {
        id: 2,
        name: 'Showcasing My Work',
    },
    {
        id: 3,
        name: 'Buying Artwork',
    },
    {
        id: 4,
        name: 'Inspiration',
        tag: Inspiration,
    },
    {
        id: 5,
        name: 'Sharing Ideas & Concepts',
        tag: Community,
    },
    {
        id: 6,
        name: 'Meeting  Artists',
        tag: Circle,
    },
    {
        id: 7,
        name: 'Meeting Collectors',
    },
    {
        id: 8,
        name: 'Collaboration',
        tag: Community,
    },
    {
        id: 9,
        name: 'Art News',
    },
    {
        id: 10,
        name: 'Workshops & Talks',
        tag: StarIconFull,
    },
    {
        id: 11,
        name: 'Reselling Artwork',
    },
    {
        id: 12,
        name: 'Exploration',
    },
    {
        id: 13,
        name: 'I Don’t Know Yet',
    },
];
const Profile: React.FC = () => {
    const interests = useSelector((state: AppState) => state.user.interests);
    const [selectedTopic, setSelectedTopic] = useState(interests);

    const onSave = () => {
        dispatch(saveTopicRequest(selectedTopic));
    };
    const dispatch = useDispatch();
    const renderTopics = ({ item, index }: { item: any, index: number }) => {
        return (
            <Tags
                item={item}
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                index={index}
            />
        );
    };
    return (
        <>
            <StatusBar backgroundColor={textColor} barStyle="dark-content" />

            <ProfileHeader
                description={'[ SELECT 3 OR MORE ]'}
                heading={'I’M INTERESTED IN..'}
            />

            <FlatList
                contentContainerStyle={{
                    paddingHorizontal: 38,
                    paddingTop: 28,
                    paddingBottom: 100,
                }}
                data={data}
                renderItem={renderTopics}
                keyExtractor={(item, index) => `id_${index}`}
            />
            {selectedTopic.length > 1 ? (
                <Button
                    style={styles.saveButton}
                    onPress={onSave}
                    mode="text"
                    labelStyle={styles.buttonText}>
                    START DISCOVERING
                </Button>
            ) : null}
        </>
    );
};

interface ITagsProps {
  setSelectedTopic: (topic: any) => void;
  item: any; 
  selectedTopic: any;
  index: number;
}

const Tags = (props: ITagsProps) => {
  const { item, selectedTopic, index } = props;
  // const color = useSharedValue(colors[0]);
  const animation = useRef(new Animated.Value(0));

    const interests = useSelector((state: AppState) => state.user.interests);

    const handleAnimation = () => {
        Animated.timing(animation.current, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
        }).start();
    };
    const fadeOut = () => {
        Animated.timing(animation.current, {
            toValue: 0,
            duration: 800,
            useNativeDriver: false,
        }).start();
    };
    const fadeText = animation.current.interpolate({
        inputRange: [0, 1],
        outputRange: [placeHolderColor, '#000000'],
    });
    useEffect(() => {
        interests.map(tag => {
            if (tag == item.name) {
                handleAnimation();
            }
        });
    }, []);
    const toggleSelection = () => {
        let index = -1;
        index = selectedTopic.findIndex((tag: string) => {
            return tag == item.name;
        });
        if (index !== -1) {
            const data = selectedTopic.filter((tag: string) => {
                return tag !== item.name;
            });

            props.setSelectedTopic(data);
            fadeOut();
        } else {
            const temp = [...props.selectedTopic, item.name];
            props.setSelectedTopic(temp);
            handleAnimation();
        }
    };
    return (
        <Pressable style={styles.row} onPress={toggleSelection}>
            <Animated.Text
                style={[styles.animatedText, { color: fadeText }]}
                key={`id_${index}`}>
                {item.name}
            </Animated.Text>
            {item.tag && (
                <Animated.Image
                    resizeMode="contain"
                    style={[
                        styles.animatedImage,
                        { opacity: animation.current },
                    ]}
                    source={item.tag}
                />
            )}
        </Pressable>
    );
};

export default Profile;
const styles = StyleSheet.create({
    animatedImage: {
        position: 'absolute',
        top: 10,
        left: 210,
        width: 55,
        height: 50,
    },
    animatedText: {
        width: 298,
        fontFamily: appFonts.InterRegular,
        fontSize: 40,
        fontWeight: 'bold',
        paddingBottom: 25,
    },
    row: {
        flexDirection: 'row',
    },
    saveButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primary,
        borderRadius: 39,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50,
    },
    buttonText: {
        color: iconColor,
        fontSize: 13,
        paddingVertical: 7,
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: appFonts.InterRegular,

        paddingHorizontal: 20,
    },
});
