import analytics from '@segment/analytics-react-native';
import StatusBar from 'components/CustomStatusBar';
import Header from 'components/Header';
import ListEmpty from 'components/ListEmpty';
import { appFonts } from 'components/text';
import { Posts } from 'models/types';
import React, {
    FC,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    ActivityIndicator,
    FlatList,
    NativeModules,
    Platform,
    useWindowDimensions,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AllUserBottomSheet from 'screens/AllUser';
import WelcomePage from 'screens/Welcome/components/WelcomePage';
import getAllPosts from 'services/getAllPosts';
import { getAllPostsRequest } from 'store/actions/appAction';

import { iconColor, textColor } from '../../config/colors';
import { isIphone, isIphoneX } from '../../lib/isIphone';
import AppState from '../../models/reducers';
import Community from './components/Community';
import VideoPost from './components/Post';
import ReferYourFriend from './components/ReferYourFriend';
import Tutorial from './components/Tutorial';

const { StatusBarManager } = NativeModules;

enum FirstTimeComponents {
    WELCOME = "WELCOME",
    COMMUNITY_GUIDELINE = "COMMUNITY_GUIDELINE",
    REFER_FRIEND = "REFER_FRIEND",
  }

const CreateStaticPost = (post_type: string) : Posts => {
    return {
        _id: post_type,
        title: '',
        description: '',
        tags: [],
        post_file: '',
        created_by: new Date(),
        mediaUrl: '',
        post_type: '' 
    }
}

const ManipulatePost = (posts: Posts[],indexCommunity = 8, isDeepLinkingNavigate = false) => {
    const WelcomePost = CreateStaticPost(FirstTimeComponents.WELCOME);
    const CommunityPost = CreateStaticPost(FirstTimeComponents.COMMUNITY_GUIDELINE);
    const ReferFriendPost = CreateStaticPost(FirstTimeComponents.REFER_FRIEND);

    let manipulatedPost = [...posts];
    if (posts.length > 0) {
        if(isDeepLinkingNavigate) {
            manipulatedPost = [ ...manipulatedPost];
        }else {
            manipulatedPost = [WelcomePost, ...manipulatedPost];
        }  
    }
    if (posts.length >= 7) {
        const listPost1 = manipulatedPost.splice(0, indexCommunity);
        const listPost2 = manipulatedPost.splice(indexCommunity, manipulatedPost.length);
        manipulatedPost = [...listPost1, CommunityPost, ...listPost2]
    }
    if (posts.length >=16) {
        const listPost1 = manipulatedPost.splice(0, indexCommunity + 8);
        const listPost2 = manipulatedPost.splice(indexCommunity + 8, manipulatedPost.length);
        manipulatedPost = [...listPost1, ReferFriendPost, ...listPost2]
    }
    return manipulatedPost;
};

const ManipulateVideoPostsWithNoCommunity = (posts: Posts[]) => {
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]._id === FirstTimeComponents.COMMUNITY_GUIDELINE) {
            posts.splice(i, 1);
        }
    }
    return posts;
}

interface IProps {
    route?: { params: { postId: string } };
  }

export const DiscoverFeedFirstTime: FC<IProps> = ({route}: IProps) => {
    const { height, width } = useWindowDimensions();
    const posts = useSelector((state: AppState) => state.app.posts);

    const [allPosts, setAllPosts] = useState([]);
    const viewTutorial = useSelector(
        (state: AppState) => state.user.tutorial_view,
    );
    const userId = useSelector((state: AppState) => state.user._id);
    const [index, setIndex] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const user = useSelector((state: AppState) => state.user);
    const firstTimeLogin = !useSelector((state: AppState) => state.user.signup_complete);
    const videoComponentRef = useRef({});
    const [isAcceptGuideLines, setAcceptGuideLines] = useState(
        user.isAcceptGuideLines,
    );
    
    const [isMuted, setIsMuted] = useState(false);
    const bottomSheetRef = useRef();
    const [showAllUserBottomSheet, setAllUserBottomSheet] = useState(false);
    const [sowTutorial, setSowTutorial] = useState(false);
    const flatListRef = useRef()
    
    useLayoutEffect(() => {
        if (userId != 0) {
            onRefresh(route?.params?.postId);
        }
    }, [userId, route]);

    useEffect(() => {
        if(user.isAcceptGuideLines) {
            setAcceptGuideLines(true)
            const newPostsList = ManipulateVideoPostsWithNoCommunity(allPosts)
            setAllPosts(newPostsList);
        }
    }, [user.isAcceptGuideLines])

    useEffect(() => {
        if (!viewTutorial && index === 1) {
            setSowTutorial(true);
            
        }
    }, [index])

    const viewConfigRef = React.useRef({
        viewAreaCoveragePercentThreshold: 95,
    });

    useEffect(() => {
        if (pageNumber === 1) {
            const welcomePosts = ManipulatePost(posts, undefined, Boolean(route?.params?.postId));
            setAllPosts(welcomePosts);
        } else {
            setAllPosts(posts);
        }
        
    }, [posts, route]);
    

    useEffect(() => {
        if(!firstTimeLogin) {
            setAllPosts(ManipulatePost(posts, index + 7, Boolean(route?.params?.postId)))
        }
    }, [firstTimeLogin, route])

    useEffect(() => {
        if (pageNumber === 1 && index === 0) return;

        if (Math.floor(allPosts.length / 2) == index) {
            onEndReach();
        }
    }, [index, allPosts]);
    const onViewRef = React.useRef((props: any) => {
        // TODO will come back and review for update
        // eslint-disable-next-line react/prop-types
        const changed = props.changed;
        if (Platform.OS == 'android') {
            // eslint-disable-next-line react/prop-types
            changed.forEach((item: { key: string, index: number }) => {
                const cell = videoComponentRef[item.key];
                const prevCell = videoComponentRef[`id_${item.index - 1}`];
                setIndex(item.index);
                if (cell) {
                    if (item.isViewable) {
                        prevCell?.pause();
                        cell.play();
                        item.startedViewing = new Date();
                        analytics.screen('Post', {
                            index: item.index,
                            user_id: item.item.user_id,
                            username: item.item.created_by.username,
                            user_location: item.item.created_by.location,
                            user_state: item.item.created_by.state,
                            user_country: item.item.created_by.country,
                            user_tags: item.item.created_by.tags,
                            user_last_active: item.item.created_by.last_active,
                            user_is_admin: item.item.created_by.is_admin,
                            user_accepted_guidelines:
                                item.item.created_by.accepted_guideline,
                            post_id: item.item._id,
                            post_type: item.item.post_type,
                            title: item.item.title,
                            tags: item.item.tags,
                            description: item.item.description,
                        });
                    } else {
                        cell.pause();
                        cell.back();
                        if (item.startedViewing) {
                            const stoppedViewing = new Date();
                            const duration =
                                stoppedViewing.getTime() -
                                item.startedViewing.getTime();
                            analytics.track('Viewed_post', {
                                index: item.index,
                                user_id: item.item.user_id,
                                username: item.item.created_by.username,
                                user_location: item.item.created_by.location,
                                user_state: item.item.created_by.state,
                                user_country: item.item.created_by.country,
                                user_last_active:
                                    item.item.created_by.last_active,
                                user_is_admin: item.item.created_by.is_admin,
                                user_accepted_guidelines:
                                    item.item.created_by.accepted_guideline,
                                post_id: item.item._id,
                                post_type: item.item.post_type,
                                title: item.item.title,
                                tags: item.item.tags,
                                description: item.item.description,
                                viewing_duration: duration,
                            });
                        }
                    }
                }
            });
        }
    });

    const getVideoHeight = () => {
        return Platform.OS == "ios"
          ? height + StatusBarManager.HEIGHT - 66 - 80 - (isIphoneX() ? 36 : 13)
          : height - 60 - 80;
      };

    const flatListHeight = useMemo(() => getVideoHeight, []);

    const onRefresh = useCallback((postId?: string) => {
        if (userId && userId != 0) {
            dispatch(
                getAllPostsRequest({
                    page: 1,
                    user_id: userId,
                    postId
                }),
            );
            setPageNumber(1);
            setError(false);
         
            if(postId && posts.length > 0 && index > 0) {
                (flatListRef as any).current.scrollToIndex({index: 0})
            }
        }
    }, [pageNumber, setPageNumber, userId, posts, index]);

    const onEndReach = () => {
        try {
            if (error == false) {
                setLoader(true);
                getAllPosts({
                    page: pageNumber + 1,
                    user_id: userId,
                })
                    .then(response => {
                        if (
                            response.data.statusCode === 200 &&
                            Array.isArray(response.data.data) &&
                            response.data.data.length > 0
                        ) {

                            setAllPosts(prv => prv.concat(response.data.data));

                            setLoader(  false);
                            if (response.data.data.length == 0) {
                                setError(true);
                            }
                        } else {
                            setError(true);
                        }
                        setPageNumber(prv => prv + 1);
                    })
                    .catch(() => {
                        setLoader(false);
                    });
            }
        } catch (error) {
            setLoader(false);
        }
    };

    const renderVideo = useCallback(
        ({ item, index: currentIndex }) => {
            if (item._id === FirstTimeComponents.WELCOME) {
                return <WelcomePage height={flatListHeight()} />
            }
            if (item._id === FirstTimeComponents.COMMUNITY_GUIDELINE) {
                return <Community height={flatListHeight()} />
            }
            if (item._id === FirstTimeComponents.REFER_FRIEND) {
                return <ReferYourFriend  height={flatListHeight()} />
            }
            if (item.jw_media_url) {
                return (
                    <VideoPost
                        ref={ref => {
                            videoComponentRef[`id_${currentIndex}`] = ref;
                        }}
                        setIsMuted={setIsMuted}
                        isMuted={isMuted}
                        isPreview={false}
                        allPosts={allPosts}
                        currentIndex={0}
                        index={0}
                        setAcceptGuideLines={setAcceptGuideLines}
                        flatListHeight={flatListHeight()}
                        isAcceptGuideLines={isAcceptGuideLines}
                        onSearch={() => {
                            bottomSheetRef?.current?.snapTo(0);
                            setAllUserBottomSheet(true);
                        }}
                        key={item._id}
                        style={{
                            width: width,
                            height: flatListHeight(),
                        }}
                        post={item}
                        isFirstLogin={firstTimeLogin}
                    />
                );
            }
        },

        [
            bottomSheetRef,
            setAllUserBottomSheet,
            loader,
            allPosts,
            isAcceptGuideLines,
            setAcceptGuideLines,
            isMuted,
            setIsMuted,
        ],
    );

    const onScrollEndDrag = useCallback(
        ({ nativeEvent }) => {
            let index =
                Platform.OS == 'android'
                    ? Math.ceil(nativeEvent.contentOffset.y / flatListHeight())
                    : Math.ceil(
                          nativeEvent.targetContentOffset.y / flatListHeight(),
                      );
            setIndex(index);
            const cell = videoComponentRef[`id_${index}`];
            const preCell = videoComponentRef[`id_${index - 1}`];
            preCell?.back();

            preCell?.pause();
            cell?.play();
            cell?.back();

            analytics.screen('Post', {
                post: allPosts[index],
            });
        },
        [setIndex, videoComponentRef, flatListHeight],
    );

    const onScrollBeginDrag = useCallback(
        ({ nativeEvent }) => {
            const cell = videoComponentRef[`id_${index}`];
            cell?.pause();
            console.log(nativeEvent)
        },
        [index, videoComponentRef],
    );

    const getIndexCommunity = () => {
        const index = allPosts.findIndex(item => item._id === FirstTimeComponents.COMMUNITY_GUIDELINE)

        return index
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBar
                    backgroundColor={textColor}
                    barStyle="dark-content"
                />

                <Header
                    style={{
                        paddingHorizontal: 20,
                        height: 80,
                        paddingTop: isIphone(),
                    }}
                    textStyle={{ fontFamily: appFonts.AktivGroteskEx_Trial_Bd }}
                    color={iconColor}
                    textColor={iconColor}
                    renderLeft={<></>}
                    renderRight={<></>}
                />
                <FlatList
                    scrollEnabled={index !== getIndexCommunity() || isAcceptGuideLines }
                    disableScrollViewPanResponder
                    refreshing={false}
                    onRefresh={onRefresh}
                    onScrollBeginDrag={onScrollBeginDrag}
                    onScrollEndDrag={event => {
                        if (Platform.OS == 'ios') {
                            onScrollEndDrag(event);
                        }
                    }}
                    style={[
                        {
                            height: flatListHeight(),
                        },
                    ]}
                    ListEmptyComponent={() => {
                        return (
                            <ListEmpty
                                style={{
                                    height: flatListHeight(),
                                }}
                            />
                        );
                    }}
                    getItemLayout={(data, index) => ({
                        length: flatListHeight(),
                        offset: flatListHeight() * index,
                        index,
                    })}
                    disableIntervalMomentum
                    data={allPosts}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    pagingEnabled={true}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    renderItem={renderVideo}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={flatListHeight()}
                    ref={flatListRef as any}
                    ListFooterComponent={() => {
                        return (
                            <View
                                style={{
                                    height: 50,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                {loader || allPosts.length != index - 1 ? (
                                    <ActivityIndicator
                                        color="black"
                                        size="large"
                                    />
                                ) : (
                                    <View />
                                )}
                            </View>
                        );
                    }}
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => `id_${index}`}
                    extraData={posts}
                    decelerationRate="fast"
                    disableVirtualization={true}
                    snapToAlignment="start"
                    scrollsToTop={false}
                    snapToOffsets={[...Array(allPosts?.length)].map(
                        (x, i) => flatListHeight() * i,
                    )}
                    updateCellsBatchingPeriod={5}
                    initialNumToRender={3}
                    maxToRenderPerBatch={5}
                    windowSize={10}
                />
                <Tutorial
                    isModalVisible={sowTutorial}
                    toggleModal={setSowTutorial}
                />
            </View>
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

export default DiscoverFeedFirstTime;