import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    useIsFocused,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import StatusBar from 'components/CustomStatusBar';
import { ArrowLeft, ArrowRight, CheckMarkIcon } from 'components/Icons';
import Header from 'components/PostHeader';
import { appFonts } from 'components/text';
import VideoPost from 'components/VideoPost';
import { TouchAble } from 'components/workAround';
import { iconColor, NeonBlue, textColor } from 'config/colors';
import { isIphone } from 'lib/isIphone';
import AppState from 'models/reducers';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    LayoutAnimation,
    NativeModules,
    Platform,
    Text,
    TextInput,
    UIManager,
    useWindowDimensions,
    View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import AllUserBottomSheet from 'screens/AllUser';

const { StatusBarManager } = NativeModules;
const NewPostPreview = () => {
    const route = useRoute();
    const { mediaUrl, post_type, editView, post } = route.params;
    console.log("route.params.post", route.params.post);

    const { height, width } = useWindowDimensions();
    const navigation = useNavigation();
    const tabBarHeight = useBottomTabBarHeight();
    const isFocused = useIsFocused();
    const getVideoHeight = () => {
        return Platform.OS == 'ios'
            ? height + StatusBarManager.HEIGHT - 22 - tabBarHeight
            : height - 60;
    };
    const [caption, setCaption] = useState('');

    const flatListHeight = useMemo(() => getVideoHeight, []);
    const bottomSheetRef = useRef();
    const [showAllUserBottomSheet, setAllUserBottomSheet] = useState(false);
    const [showCaptionView, setShowCaptionView] = useState(true);
    const user = useSelector((state: AppState) => state.user);

    const uploadPost = async () => {
        const apiData = {
            id: user._id,
            phone_number: user.phone_number,
            title: user.subtitle ? user.subtitle : '',
            post_type: post_type,
            urlContentType: mediaUrl.mime ? mediaUrl.mime : 'mp4',
            description: caption,
            tags: user.tags ? user.tags.toString() : '',
            file_name: mediaUrl.path.substring(
                mediaUrl.path.lastIndexOf('/') + 1,
            ),
            file_value: mediaUrl.path,
            first_name: '',
            last_name: '',
            full_name: user.full_name ? user.full_name : '',
            location: user.location ? user.location : '',
            state: '',
            country: '',
            interests: user.interests ? user.interests.toString() : '',
            title_stamp: user?.title_stamp ? user?.title_stamp : 3,
            meet_me_at: user.meet_me_at ? user.meet_me_at.toString() : '',
            bio: user.bio ? user.bio : '',
            last_spotted: user.last_spotted ? user.last_spotted : '',
            currently: user.currently ? user.currently : '',
            affiliations: user.affiliations ? user.affiliations.toString() : '',
        };
        navigation.navigate('UploadPost', {
            apiData: apiData,
            editView: false,
        });
    };
    const updatePost = () => {
        const data = { ...post };
        data.description = caption;
        data.is_file_change = 'no';
        navigation.navigate('UploadPost', {
            apiData: data,
            editView: editView,
        });
    };
    useEffect(() => {
        if (editView && isFocused) {
            setCaption(post?.description);
        } else {
            setCaption('');
        }
        return () => {
            setShowCaptionView(true);
        };
    }, [isFocused]);

    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }, []);
    const toggleCaptionView = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setShowCaptionView(prv => !prv);
    }, [setShowCaptionView]);

    return (
        <>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        height: height - 60,
                        width: width,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: iconColor
                    }}>
                    <StatusBar
                        backgroundColor={textColor}
                        barStyle="dark-content"
                    />

                    <Header
                        titleStyle={{
                            fontFamily: appFonts.InterBlack,
                            fontWeight: '700',
                        }}
                        style={{
                            paddingHorizontal: 20,
                            height: 80,
                            backgroundColor: textColor,
                            paddingTop: isIphone() + 10,
                        }}
                        renderLeft={<ArrowRight />}
                        renderRight={
                            showCaptionView ? (
                                <ArrowLeft />
                            ) : (
                                <CheckMarkIcon color={'#0033F7'} />
                            )
                        }
                        title={
                            showCaptionView && editView
                                ? 'Edit Snapshot'
                                : showCaptionView
                                ? 'New Snapshot'
                                : 'Preview'
                        }
                        back={true}
                        color={iconColor}
                        textColor={iconColor}
                        onPress={() => {
                            if (showCaptionView) {
                                toggleCaptionView();
                            } else if (editView) {
                                updatePost();
                            } else {
                                uploadPost();
                            }
                        }}
                        onPressLeft={() => {
                            if (!showCaptionView) {
                                toggleCaptionView();
                            } else {
                                navigation.goBack();
                            }
                        }}
                    />
                    <VideoPost
                        style={{
                            height: editView
                                ? flatListHeight() - 80 - 45
                                : flatListHeight() - 80,
                            width: width,
                        }}
                        isPreview={isFocused ? true : false}
                        post={{ ...route?.params?.post, description: caption }}
                        onSearch={() => {
                            bottomSheetRef?.current?.snapTo(0);
                            setAllUserBottomSheet(true);
                        }}
                        notShowUserData={showCaptionView ? true : false}
                    />
                    {showCaptionView && (
                        <View
                            style={{
                                width: '95%',
                                height: hp(25),
                                position: 'absolute',
                                paddingVertical: 20,
                                bottom: hp('7'),
                                zIndex: 5,
                                backgroundColor: textColor,
                                alignSelf: 'center',
                                borderRadius: 15,
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    paddingHorizontal: 20,
                                    justifyContent: 'space-between',
                                }}>
                                <Text
                                    style={{
                                        color: 'rgba(0, 0, 0,1)',
                                        fontWeight: '700',
                                        fontFamily: appFonts.InterRegular,
                                        fontSize: wp('3.5'),
                                    }}>
                                    Add caption to your snapshot
                                </Text>
                                <TouchAble onPress={toggleCaptionView}>
                                    <CheckMarkIcon
                                        color={
                                            caption !== ''
                                                ? iconColor
                                                : NeonBlue
                                        }
                                    />
                                </TouchAble>
                            </View>
                            <TextInput
                                onChangeText={text => {
                                    setCaption(text.substring(0, 100));
                                }}
                                value={caption}
                                multiline={true}
                                placeholder={'Enter caption'}
                                style={{
                                    paddingTop: 20,
                                    paddingHorizontal: 20,
                                    height: hp(20),
                                    color: iconColor,
                                    fontWeight: '700',
                                    fontFamily: appFonts.InterRegular,
                                    fontSize: wp('3.5'),
                                    textAlignVertical: 'top',
                                }}
                            />
                        </View>
                    )}
                    {editView && showCaptionView && (
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                position: 'absolute',
                                bottom: hp('7'),
                                left: 0,
                                right: 0,
                                zIndex: 30,
                            }}>
                        </View>
                    )}
                </View>
            </KeyboardAwareScrollView>
            <AllUserBottomSheet
                toggleButtonSheet={() => {
                    setAllUserBottomSheet(false);
                }}
                isVisible={showAllUserBottomSheet}
                bottomSheetRef={bottomSheetRef}
            />
        </>
    );
};

export default NewPostPreview;
