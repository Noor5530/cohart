import { CrossIcon } from 'components/Icons';
import { appFonts } from 'components/text';
import { iconColor, primary } from 'config/colors';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';

import SearchBar from './SearchBar';

const data = [
    'Painting',
    'Drawing',
    'Illustration',
    'Graphic Design',
    'Digital Art',
    'Photography',
    'Sculpture',
    'Installation',
    'New Media',
    'Fashion',
    'Publication',
    'Interior',
    '3D Design',
    'Experimental',
];

interface Props {
    selectedTags: string[];
    setTags: (value: string[]) => void;
    isVisible: boolean;
    hideModel: (value: boolean) => void;
}
export default function TagModel(props: Props) {
    const [searchString, setSearchString] = useState('');
    const [tagList, setTagList] = useState([]);
    const onSave = () => {
        props.hideModel(false);
    };
    useEffect(() => {
        if (searchString == '') {
            setTagList(data);
        }
    }, [searchString]);

    const onSearch = useCallback(
        value => {
            //   Keyboard.dismiss();
            const temp = data.filter(item => {
                if (item.includes(value)) {
                    return item;
                }
            });
            setTagList(temp);
        },
        [data, setTagList],
    );
    return (
        <Modal isVisible={props.isVisible}>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <View style={styles.herder}>
                        <TouchableOpacity onPress={() => {}} />
                        <Text style={styles.heading}>ADD ARTWORK TAGS</Text>
                        <TouchableOpacity
                            onPress={() => {
                                props.hideModel(false);
                            }}>
                            <CrossIcon height={'19'} width={'18'} />
                        </TouchableOpacity>
                    </View>
                    <SearchBar
                        value={searchString}
                        onSubmit={() => {}}
                        handleSearchInput={data => {
                            setSearchString(data);
                            onSearch(data);
                        }}
                    />
                    <FlatList
                        data={tagList}
                        keyExtractor={(item, index) => `id_${index}`}
                        renderItem={({ item }) => {
                            return (
                                <Tag
                                    style={styles.tag}
                                    selectedTags={props.selectedTags}
                                    tag={item}
                                    setTags={props.setTags}
                                />
                            );
                        }}
                    />
                    {props.selectedTags?.length > 0 && (
                        <Button
                            style={styles.button}
                            onPress={onSave}
                            mode="text"
                            labelStyle={styles.buttonText}>
                            save
                        </Button>
                    )}
                </View>
            </View>
        </Modal>
    );
}

interface ITagProps {
    tag: string;
    selectedTags: string[];
    setTags: (value: string[]) => void;
}
function Tag(props: ITagProps) {
    const animation = useRef(new Animated.Value(0));

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
        outputRange: ['#B0B0B0', '#000000'],
    });
    useEffect(() => {
        props.selectedTags.map(tag => {
            if (tag == props.tag) {
                handleAnimation();
            }
        });
    }, []);
    const toggleSelection = () => {
        let index = -1;
        index = props.selectedTags.findIndex(tag => {
            return tag == props.tag;
        });
        if (index !== -1) {
            const result = props.selectedTags.filter(tag => {
                return tag !== props.tag;
            });
            fadeOut();
            props.setTags(result);
        } else {
            const temp = [...props.selectedTags, props.tag];
            props.setTags(temp);
            handleAnimation();
        }
    };
    return (
        <Pressable onPress={toggleSelection} style={styles.tagView}>
            <Animated.Text style={[styles.tagText, { color: fadeText }]}>
                {props.tag}
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    innerContainer: {
        height: '70%',
        //  paddingHorizontal: 13,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    herder: {
        paddingTop: 20,
        paddingHorizontal: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        fontFamily: appFonts.InterRegular,
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 22.0843,
        alignItems: 'center',
        textAlign: 'center',
        color: iconColor,
    },
    tag: {
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 6.49051,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#000000',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: primary,
        // width: wp('50%'),
        height: 31,
        borderRadius: 22,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50,
        paddingHorizontal: 5,
    },
    buttonText: {
        color: '#000000',
        fontSize: 10,
        //fontWeight: 'bold',
        textAlign: 'center',
        fontWeight: '500',
        fontFamily: appFonts.InterRegular,
    },
    tagText: {
        textAlign: 'center',
        fontFamily: appFonts.InterRegular,
        fontWeight: '500',
        fontSize: 13,
    },
    tagView: { paddingVertical: 10 },
});
