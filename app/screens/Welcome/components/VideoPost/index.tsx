import { useIsFocused, useNavigation } from '@react-navigation/native';
import dummyAvator from 'assets/dummyAvator.png';
import { GlowIcon } from 'components/Icons';
import { AppText } from 'components/text';
import { iconColor, textColor } from 'config/colors';
import { Posts } from 'models/types';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { AppState, AppStateStatus, Pressable, StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import Image from 'react-native-fast-image';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import JWPlayer from 'react-native-jw-media-player';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { VolumeIcon } from 'utils/icons';

//@ts-ignore
const VideoPost = React.forwardRef(
    (
        props: ViewProps & {
            post: Posts;
            toggleHeader?: (value: boolean) => void;
            isMuted: boolean;
            setIsMuted: (value: boolean) => void;
            onNavigateToSignUp: () => void;
        },
        ref,
    ) => {
        const navigation = useNavigation();
        const swipeRow = useRef();
        
        const {       
            onNavigateToSignUp
        } = props;
        const {
            _id,
            post_file,
            description,
            created_by,
            post_type,
            jw_media_id = null,
            jw_media_url = null,
            jw_media_thumb = null
        } = props.post;
        // TODO: handle autoplay and muting on mobile web
        const { isMuted, setIsMuted = (value: any) => {
            console.log(value)
        } } = props;
        const [isPause, togglePause] = useState(true);
        const [loading, setLoading] = useState(
            post_type === 'video' ? true : false,
        );
        
        const [isBuffering, setIsBuffering] = useState(false);
        const isFocused = useIsFocused();
        const jwpPlayerRef = useRef<JWPlayer>();
        useImperativeHandle(ref, () => ({
            async play() {
                if (isFocused) {
                    if (props.isMuted) {
                        jwpPlayerRef?.current?.setVolume(0);
                    }
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
        }, [jwpPlayerRef, _id]);
        useEffect(() => {
            return () => {
                jwpPlayerRef.current?.pause();
            };
        }, [isFocused]);

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
        

        const goBack = () => {
            if (swipeRow.current.close) {
                swipeRow.current.close();
            }
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
                >
                <Pressable
                    onPressIn={() => {
                        if (isPause) {
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
                            }}
                            onTime={() => {
                                if (isBuffering) {
                                    setIsBuffering(false);
                                }
                            }}
                            onBuffer={() => {
                                setIsBuffering(true);
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
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('MyProfile', {
                                    user: created_by,
                                    userType: '',
                                });
                            }}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flex: 1,
                                height: 55,
                            }}>
                            <View>
                                <Image
                                    source={
                                        created_by?.cover_image
                                            ? { uri: created_by?.cover_image }
                                            : dummyAvator
                                    }
                                    style={styles.image}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    marginLeft: 10,
                                    justifyContent: 'center',
                                }}>
                                <AppText style={styles.heading}>
                                    {created_by?.full_name}
                                </AppText>
                                <AppText
                                    numberOfLines={1}
                                    style={{ color: textColor, fontSize: 12 }}>
                                    <Entypo
                                        name="location-pin"
                                        size={widthPercentageToDP('3.5')}
                                        color="white"
                                    />
                                    {created_by?.location}
                                </AppText>
                            </View>
                        </TouchableOpacity>

                        <View>
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

                            <View style={styles.iconView}>
                                <TouchableOpacity
                                    onPress={onNavigateToSignUp}
                                    style={[
                                        styles.icon,
                                    ]}>
                                    <GlowIcon
                                        color={"#E5E5E5"}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {description ? (
                        <AppText
                            numberOfLines={2}
                            style={{
                                color: textColor,
                                fontSize: widthPercentageToDP('3'),
                            }}>
                            {description}
                        </AppText>
                    ) : null}
                </LinearGradient>
                <Modal
                    animationInTiming={500}
                    animationOutTiming={1000}
                    transparent={true}
                    visible={onNavigateToSignUp}>
                    <View
                        style={[
                            props.style,
                            {
                                marginTop: heightPercentageToDP(3),
                            },
                        ]}>
                        <Image
                            style={{
                                alignSelf: 'flex-end',
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMode="cover"
                            source={require('../../../../assets/glow/glow.gif')}
                        />
                    </View>
                </Modal>
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
        fontSize: widthPercentageToDP("4.4"),
    },
    imageView: { alignItems: 'flex-end' },
    image: {
        width: 45,
        height: 45,
        borderRadius: 9999,
        marginBottom: -12,
        borderWidth: 1,
        borderColor: textColor,
        alignSelf: 'flex-end',
    },
    bottomView: {
        position: 'absolute',
        width: '100%',
        paddingTop: 15,
        paddingHorizontal: 20,
        paddingBottom: 15,
        bottom: 0,
    },
});
