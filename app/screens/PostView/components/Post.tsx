import { useIsFocused, useNavigation } from '@react-navigation/native';
import analytics from '@segment/analytics-react-native';
import { SearchIcon } from 'components/Icons';
import { AppText } from 'components/text';
import ApiConfig from 'config/api-config';
import { iconColor, textColor } from 'config/colors';
import AppStateTypes from 'models/reducers';
import { Posts } from 'models/types';
import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import {
    AppState,
    AppStateStatus,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewProps,
} from 'react-native';
import Image from 'react-native-fast-image';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import JWPlayer from 'react-native-jw-media-player';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import CommunityModel from 'screens/Discover/components/CommunityModel';
import Friends from 'screens/Friends';
import { apiClient } from 'services/client';
import SentRequest from 'services/sentRequest';
import { disableLoading, enableLoading } from 'store/actions/loadingActions';
import { enableSnackBar } from 'store/actions/snackBarAction';
import { VolumeIcon } from 'utils/icons';
import { logOutRequest } from 'store/actions/userActions';
import { LogOutRequestEnum } from 'models/actions/user';

//@ts-ignore
const VideoPost = React.forwardRef(
    (
        props: ViewProps & {
            post: Posts;
            toggleCommunityModel?: (value: boolean) => void;
            setAcceptGuideLines?: (value: boolean) => void;
            isAcceptGuideLines?: boolean;
            isCommunityModalVisible?: boolean;
            index?: number;
            currentIndex?: number;
            isPreview?: boolean;
            toggleHeader?: (value: boolean) => void;
            isScrolling: boolean;
            onSearch: () => void;
            allPosts: object[];
            setAllPosts: (data: object[]) => void;
            isMuted: boolean;
            setIsMuted: (value: boolean) => void;
        },
        ref,
    ) => {
        // const videoRef = useRef();
        const navigation = useNavigation();
        const userID = useSelector((state: AppStateTypes) => state.user._id);
        const dispatch = useDispatch();
        const swipeRow = useRef();
        const isAcceptGuideLine: boolean = useSelector(
            (state: AppStateTypes) => state.user.isAcceptGuideLines,
        );
        const [isAcceptGuideLines, setAcceptGuideLine] =
            useState(isAcceptGuideLine);
        const {
            // _id,
            post_file,
            description,
            created_by,
            post_type,
            jw_media_id = null,
            jw_media_url = null,
            jw_media_thumb = null,
            view_count,
        } = props.post;
        // TODO: handle autoplay and muting on mobile web
        const [ isMuted, setIsMuted]  = useState(false);
        const [isPause, togglePause] = useState(true);
        const [loading, setLoading] = useState(
            post_type === 'video' ? true : false,
        );
         const isLoggedIn = useSelector((state:AppStateTypes) => state.user.isLoggedIn)

        // const [isError, setError] = useState(false);
        const [isBuffering, setIsBuffering] = useState(false);
        const [isConnectedUser, setConnectedUser] = useState('');
        const isFocused = useIsFocused();
        const jwpPlayerRef = useRef<JWPlayer>();
        useImperativeHandle(ref, () => ({
            async play() {
                if (isFocused) {

                    jwpPlayerRef.current?.play();
                    togglePause(false);
                }
            },
            pause() {
                togglePause(true);
                jwpPlayerRef.current?.pause();

                jwpPlayerRef.current?.stop();
            },
            back() {
                goBack();
            },
        }));
        useEffect(() => {
            jwpPlayerRef?.current?.setControls(false);
        }, [jwpPlayerRef]);
        useEffect(() => {
            return () => {
                jwpPlayerRef.current?.pause();
            };
        }, [isFocused]);
        const sentUserRequest = useCallback(async () => {
            try {
                dispatch(enableLoading());
                const data = {
                    sender_id: userID,
                    recipient_id: created_by._id,
                };
                await SentRequest(data)
                dispatch(disableLoading());


            } catch (error:any) {
                if (error?.response?.status == 401) {
                    dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
                  } else {
                    dispatch(enableSnackBar());
                  }
            }
        }, [userID, created_by, dispatch]);

        useEffect(() => {
            AppState.addEventListener('change', _handleAppStateChange);

            return () => {
                AppState.removeEventListener('change', _handleAppStateChange);
            };
        }, []);

        const _handleAppStateChange = (nextAppState: AppStateStatus) => {
            if (nextAppState !== 'active') {
                jwpPlayerRef.current?.pause();
            }
        };
        const errorHandler = (error: any) => {
          if (error?.response?.status == 401) {
            dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
          } else {
            dispatch(enableSnackBar());
          }
          dispatch(disableLoading());
        };
        const checkAllReadyConnected = useCallback(() => {
          try {
            dispatch(enableLoading());
            const data = {
              sender_id: userID,
              recipient_id: created_by._id,
              make_connection: true,
            };
            apiClient
              .post(ApiConfig.CHECK_IS_CONNECTED, data)
              .then((response) => {
                dispatch(disableLoading());
                if (
                  response.data.statusCode === 502 ||
                  response.data.statusCode == 404
                ) {
                  sentUserRequest();
                } else if (response.data.statusCode === 501) {
                  setConnectedUser("pending");
                } else if (response.data.statusCode === 200) {
                  setConnectedUser("connected");
                } else {
                  dispatch(disableLoading());
                  dispatch(enableSnackBar());
                }
              })
              .catch((error: any) => {
                errorHandler(error);
              });
          } catch (error) {
            errorHandler(error);
          }
        }, [userID, created_by, dispatch, dispatch, sentUserRequest]);

        const goBack = () => {
            if (swipeRow.current.close) {
                swipeRow.current.close();
            }
        };
        const renderLeftActions = useCallback(() => {
            if (!props.isPreview) {
                if (isAcceptGuideLines) {
                    return (
                        <Friends
                            isConnectedUser={isConnectedUser}
                            goBack={goBack}
                            user={created_by}
                            style={props.style}
                        />
                    );
                } else {
                    return (
                        <CommunityModel
                            isModalVisible={isAcceptGuideLines}
                            toggleModal={() => {
                                if (swipeRow.current.close) {
                                    swipeRow.current.close();
                                }
                            }}
                            acceptGuideLines={() => {
                                if (swipeRow.current) {
                                    analytics.track('Guidelines_accepted', {});
                                    onSwipeLeftOpen();
                                    setAcceptGuideLine(true);
                                    setTimeout(() => {
                                        swipeRow.current.openLeft();
                                    }, 300);
                                }
                            }}
                            isAcceptGuideLines={isAcceptGuideLines}
                        />
                    );
                }
            }
        }, [
            props.isPreview,
            isAcceptGuideLines,
            isConnectedUser,
            goBack,
            created_by,
            props.style,
        ]);

        const onSwipeRight = () => {
            if (!props.isPreview) {
                analytics.track('Swiped_right_to_add_user', {
                    user_id: props.post.user_id,
                    post_id: props.post._id,
                    post_description: props.post.description,
                    post_tags: props.post.tags,
                    post_title: props.post.title,
                });
                setLoading(false);
                jwpPlayerRef.current?.pause();
            }
        };
        const onSwipeLeftOpen = () => {
            console.log('props.isPreview', props.isPreview, isAcceptGuideLines);
            if (!props.isPreview && isAcceptGuideLines) {
                analytics.track('Swiped_left_to_discover_feed', {});
                jwpPlayerRef.current?.pause();
                setLoading(false);

                checkAllReadyConnected();
            }
        };
        const abbreviateNumber = value => {
            var newValue = value;
            if (value >= 1000) {
                var suffixes = ['', 'k', 'm', 'b', 't'];
                var suffixNum = Math.floor(('' + value).length / 3);
                var shortValue = '';
                for (var precision = 2; precision >= 1; precision--) {
                    shortValue = parseFloat(
                        (suffixNum != 0
                            ? value / Math.pow(1000, suffixNum)
                            : value
                        ).toPrecision(precision),
                    );
                    var dotLessShortValue = (shortValue + '').replace(
                        /[^a-zA-Z 0-9]+/g,
                        '',
                    );
                    if (dotLessShortValue.length <= 2) {
                        break;
                    }
                }
                if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
                newValue = shortValue + suffixes[suffixNum];
            }
            return newValue;
        };

        return (
            <Swipeable
                forwardedRef={ref}
                ref={swipeRow}
                onSwipeableWillClose={() => {
                    if (props.toggleHeader) {
                        props.toggleHeader(true);
                    }
                }}
                onSwipeableWillOpen={onSwipeRight}
                onSwipeableLeftOpen={onSwipeLeftOpen}
                renderLeftActions={renderLeftActions}>
                <Pressable
                    onPressIn={() => {
                        if (isPause) {
                            // jwpPlayerRef.current.seekTo(0);

                            jwpPlayerRef.current.play();
                            setIsBuffering(true);
                            togglePause(false);
                        } else {
                            togglePause(true);
                            jwpPlayerRef.current?.pause();
                        }
                    }}
                    style={[styles.container, props.style]}>
                    {loading || isBuffering ? (
                        <View style={styles.loadingView}>
                            <ActivityIndicator size="large" color={textColor} />
                        </View>
                    ) : null}
                    {!loading && isPause && post_type === 'video' && (
                        <View style={styles.playButtonView}>
                            <Ionicons
                                onPress={() => {
                                    if (isPause) {
                                        // jwpPlayerRef.current.seekTo(0);

                                        jwpPlayerRef.current.play();
                                        setIsBuffering(true);
                                        togglePause(false);
                                    } else {
                                        togglePause(true);
                                        jwpPlayerRef.current?.pause();
                                    }
                                }}
                                name="play-outline"
                                size={80}
                                color={'#efdede'}
                            />
                        </View>
                    )}
                    {post_type === 'video' && jw_media_url ? (
                        //@ts-ignore
                        <JWPlayer
                            ref={jwpPlayerRef}
                            onBeforePlay={() => {
                                console.log('onBeforePlay');
                            }}
                            onTime={() => {
                                if (isBuffering) {
                                    setIsBuffering(false);
                                }
                            }}
                            onBuffer={() => {
                                setIsBuffering(true);
                                console.log('onBuffer');
                            }}
                            style={[styles.imageStyle, props.style]}
                            playlistItem={{
                                mediaId: jw_media_id,
                                file: jw_media_url,
                                autostart: false,
                                repeat: true,
                                controls: false,
                                stretching: 'uniform',
                                image: jw_media_thumb,
                            }}
                            onPlayerReady={() => {
                                togglePause(true);
                                setLoading(false);
                            }}
                            controls={false}
                            stretching={'uniform'}
                            nativeFullScreen={false}
                            portraitOnExitFullScreen={false}
                            landscapeOnFullScreen={false}
                            fullScreenOnLandscape={false}
                            onPlay={() => {
                                togglePause(false);
                            }}
                            onPause={() => {
                                togglePause(true);
                            }}
                            // onPlayerError={error => {
                            //     alert(JSON.stringify(error));
                            //     console.log(
                            //         'onPlayerError was called with error: ',
                            //         error,
                            //     );
                            // }}
                            // onSetupPlayerError={({ nativeEvent }) => {
                            //     alert(JSON.stringify(error));
                            // }}
                            colors={{
                                icons: 'transparent',
                            }}
                            onComplete={() => {
                                if (!isPause) {
                                    jwpPlayerRef.current?.seekTo(0);
                                }
                            }}
                        />
                    ) : (
                        <Image
                            resizeMode="cover"
                            style={[styles.imageStyle, props.style]}
                            source={{ uri: post_file }}
                        />
                    )}
                </Pressable>
                <LinearGradient
                    colors={[
                        'transparent',
                        'transparent',
                        'rgba(0,0,0,0.5)',
                        'rgba(0,0,0,0.7)',
                        'rgba(0,0,0,1)',
                    ]}
                    style={styles.bottomView}>
                    <View style={styles.headingView}>
                        <AppText medium style={styles.heading}>
                            {created_by?.full_name}
                        </AppText>
                        <View>
                            {view_count && (
                                <View style={styles.iconView}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            //   navigation.navigate('AllUser');
                                            if (props.onSearch()) {
                                                props.onSearch();
                                            }
                                        }}
                                        style={styles.icon}>
                                        <Text style={{ color: 'white' }}>
                                            {abbreviateNumber(view_count)}
                                        </Text>
                                        {/* </ImageBackground> */}
                                    </TouchableOpacity>
                                </View>
                            )}
                           {isLoggedIn && <View style={styles.iconView}>
                                <TouchableOpacity
                                    onPress={() => {
                                        //   navigation.navigate('AllUser');
                                        if (props.onSearch()) {
                                            props.onSearch();
                                        }
                                    }}
                                    style={styles.icon}>
                                    <SearchIcon />
                                </TouchableOpacity>
                            </View>}
                            {post_type === 'video' && (
                                <View style={styles.iconView}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (isMuted) {
                                                jwpPlayerRef?.current?.setVolume(
                                                    3,
                                                );

                                                setIsMuted(!isMuted);
                                            } else {
                                                setIsMuted(!isMuted);

                                                jwpPlayerRef?.current?.setVolume(
                                                    0,
                                                );
                                            }
                                        }}
                                        style={styles.icon}>
                                        <VolumeIcon
                                            width={22}
                                            height={22}
                                            strokeWidth={0.6}
                                        />
                                        {isMuted && (
                                            <View style={styles.isMuted} />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}
                            <TouchableOpacity
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={() => {
                                   if(isLoggedIn){
                                       navigation.navigate('MyProfile', {
                                        user: created_by,
                                        userType: '',
                                    });
                                }
                                }}>
                                <Image
                                    source={{ uri: created_by?.cover_image }}
                                    style={styles.image}
                                />
                                <AppText
                                    numberOfLines={1}
                                    style={{ color: textColor }}>
                                    <Entypo
                                        name="location-pin"
                                        size={widthPercentageToDP('3.5')}
                                        color="white"
                                    />{' '}
                                    {created_by?.location}
                                </AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {description ? (
                        <AppText
                            numberOfLines={2}
                            style={{
                                color: textColor,
                                fontSize: widthPercentageToDP('3'),
                                paddingVertical: heightPercentageToDP('1'),
                            }}>
                            {description}
                        </AppText>
                    ) : null}
                </LinearGradient>
            </Swipeable>
        );
    },
);

const VideoPostComponent = React.memo(VideoPost);

export default VideoPostComponent;

const styles = StyleSheet.create({
    container: { width: '100%', height: '100%', backgroundColor: iconColor },
    playButtonView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    videStyle: {
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    innerContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 5,
    },
    containerView: {},
    descriptionView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        margin: 16,
        backgroundColor: iconColor,
        opacity: 0.5,
        borderRadius: 6,
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    icon: {
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: textColor,
        borderWidth: 1,
        width: 40,
        height: 40,
        borderRadius: 9999,
    },
    isMuted: {
        width: 36,
        height: 1.5,
        backgroundColor: textColor,
        position: 'absolute',
        transform: [{ rotate: '45deg' }],
    },
    headingView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: heightPercentageToDP('1'),
    },
    heading: {
        color: textColor,
        fontSize: 36,
        bottom: -heightPercentageToDP('0.8'),
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: '0%',
        maxWidth: '75%',
    },
    imageView: { alignItems: 'flex-end' },
    image: {
        width: 40,
        height: 40,
        borderRadius: 9999,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: textColor,
        alignSelf: 'flex-end',
    },
    bottomView: {
        position: 'absolute',
        // backgroundColor: 'yellow',
        width: '100%',
        paddingTop: 15,
        paddingHorizontal: 20,
        paddingBottom: 15,
        bottom: 0,
    },
});
