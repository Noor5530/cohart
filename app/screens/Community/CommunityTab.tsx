import { useIsFocused, useNavigation } from '@react-navigation/native';
import StatusBar from 'components/CustomStatusBar';
import MainHeader from 'components/Header';
import { SearchIcon } from 'components/Icons';
import { Container } from 'components/workAround';
import { UserState } from 'models/reducers/user';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import AllUserBottomSheet from 'screens/AllUser';
import {
    getPendingRequestRequest,
    getSuggestionConnectionCategoriesRequest,
    getYourConnectionRequest,
    getYourConnectionResponse,
} from 'store/actions/appAction';

import { iconColor, profileColor, textColor } from '../../config/colors';
import AppState from '../../models/reducers';
import { getAllUserGroupRequest } from '../../store/actions/appAction';
import AddGroupBottomSheet from './AddGroup';
import Friend from './components/Friend';
import SuggestedFriends from './components/SuggestedFriends';
import GroupUserBottomSheet from './GroupUser';
import PendingRequestBottomSheet from './PendingRequests';
import styles from './style';
import SuggestionConnectionBottomSheet from './SuggestionConnections';
import YourConnectionBottomSheet from './YourConnections';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
interface IState {
    loginReducer: UserState;
}

const CommunityTab: React.FC = () => {
    const navigation = useNavigation();
    const [selectCategory, setSelectCategories] = useState('');
    const friendsGroup = useSelector(
        (state: AppState) => state.app.friendsGroup,
    );
    const live_data = useSelector((state: AppState) => state.app.live_data);
    const dispatch = useDispatch();
    const currentUser = useSelector((state: AppStateTypes) => state.user);

    const yourConnections = useSelector(
        (state: AppState) => state.app.yourConnections,
    );
    const [isVisibleSuggestionModel, setIsVisibleSuggestionModel] =
        useState(false);
    const [isVisibleConnectedModel, setIsVisibleConnectedModel] =
        useState(false);
    const [isVisiblePendingModel, setIsVisiblePendingModel] = useState(false);
    const [isVisibleGroupUserModel, setIsVisibleGroupUserModel] =
        useState(false);
    const [showAllUserBottomSheet, setAllUserBottomSheet] = useState(false);
    const [showAddGroupBottomSheet, setAddGroupBottomSheet] = useState(false);

    const isFocused = useIsFocused();

    const userId = useSelector((state: AppState) => state.user._id);
    const suggestionConnectionRef = useRef(BottomSheet);
    const pendingConnectionRef = useRef(BottomSheet);
    const yourConnectionRef = useRef(BottomSheet);
    const groupUserRef = useRef(BottomSheet);
    const allUserRef = useRef(BottomSheet);
    const addNewGroupRef = useRef(BottomSheet);

    const isAppLoading = useSelector(
        (state: AppState) => state.loading.isAppLoading,
    );
    const pendingRequest = useSelector(
        (state: AppState) => state.app.pendingRequest,
    );
    const suggestedConnectionsCategories = useSelector(
        (state: AppState) => state.app.suggestedConnectionsCategories,
    );

    useEffect(() => {
        if (live_data !== null) {
            const data = [...yourConnections];
            const index = data.findIndex(item => {
                return (
                    item?.sender_id == live_data?.user_id ||
                    item?.recipient_id == live_data?.user_id
                );
            });
            if (index !== -1) {
                const temp = { ...data[index] };

                if (temp.sender_id == live_data?.user_id) {
                    temp.sender.is_live = live_data?.is_live;
                } else {
                    temp.recipient.is_live = live_data?.is_live;
                }
                data[index] = temp;
                dispatch(getYourConnectionResponse(data));
            }
        }
    }, [live_data]);

    useEffect(() => {
        if (isFocused) {
            onRefresh();
        }
    }, [isFocused]);

    const onRefresh = () => {
        dispatch(
            getAllUserGroupRequest({
                user_id: userId,
                page: 1,
                search_key: '',
            }),
        );
        dispatch(
            getPendingRequestRequest({
                recipient_id: userId,
                page: 1,
                search_key: '',
            }),
        );
        dispatch(
            getYourConnectionRequest({
                sender_id: userId,
                page: 1,
                search_key: '',
            }),
        );
        dispatch(
            getSuggestionConnectionCategoriesRequest({
                recipient_id: userId,
                page: 1,
            }),
        );
    };

    const renderTag = useCallback(
        ({ item }) => {
            return (
                <TouchableOpacity
                    style={styles.tagView}
                    onPress={() => {
                        setSelectCategories(item);
                        setIsVisibleGroupUserModel(true);
                        groupUserRef.current.snapTo(0);
                    }}>
                    <Text style={styles.tag}>{item?.group_name}</Text>
                </TouchableOpacity>
            );
        },
        [setSelectCategories, yourConnections],
    );

    const ListHeader = useCallback(() => {
        return (
            <TouchableOpacity
                style={styles.tagHeaderView}
                onPress={() => {
                    setAddGroupBottomSheet(true);
                    addNewGroupRef.current?.snapTo(0);
                    //     actionSheetRef.current.setModalVisible();
                }}>
                <AntDesign name="plus" size={15} color={iconColor} />
                <Text style={styles.tag}>{'  '}Create new circle</Text>
            </TouchableOpacity>
        );
    }, []);
    const renderSuggestedFriends = useCallback(
        ({ item }) => {
            return (
                <SuggestedFriends
                    item={item}
                    toggleModel={() => {
                        setIsVisibleSuggestionModel(true);
                        suggestionConnectionRef?.current?.snapTo(0);
                    }}
                    setSelectCategories={setSelectCategories}
                    setFriendListModel={() => {}}
                    setModelHeaderText={() => {}}
                    setModalType={() => {}}
                />
            );
        },
        [suggestionConnectionRef],
    );

    return (
        <Container>
            <StatusBar backgroundColor={textColor} barStyle="dark-content" />
            <MainHeader
                color={'black'}
                textColor={'black'}
                onPressMenu={() => {}}
            />
            <View key="communityTab" style={styles.container}>
                <ScrollView
                    nestedScrollEnabled={true}
                    keyboardDismissMode="none"
                    refreshControl={
                        <RefreshControl
                            refreshing={isAppLoading}
                            onRefresh={onRefresh}
                        />
                    }>
                    <View style={styles.communityHeader}>
                        <Text style={styles.mainHeading}>Community</Text>
                        <TouchableOpacity
                            onPress={() => {
                                allUserRef.current.snapTo(0);
                                setAllUserBottomSheet(true);
                            }}
                            style={styles.searchIcon}>
                            <SearchIcon
                                color={iconColor}
                                width={'30'}
                                height={'30'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.connectionContainer}>
                        <Text style={styles.connectionHeading}>
                            {'Your\nConnections'}
                        </Text>
                        <FlatList
                            contentContainerStyle={{
                                paddingHorizontal: wp(4),
                            }}
                            showsHorizontalScrollIndicator={false}
                            ListHeaderComponent={ListHeader}
                            data={friendsGroup}
                            horizontal
                            renderItem={renderTag}
                            keyExtractor={(item, index) =>
                                `id_${index}_${Math.random()}`
                            }
                        />
                        <View style={styles.friendListView}>
                            {yourConnections?.slice(0, 9)?.map(item => (
                                <Friend
                                    key={item?._id}
                                    headingStyle={{ color: 'black' }}
                                    isNotification={
                                        item?.unread_msgs &&
                                        item?.unread_msgs !== 0
                                            ? true
                                            : false
                                    }
                                    notificationCounter={
                                        item?.unread_msgs
                                            ? item?.unread_msgs
                                            : 0
                                    }
                                    onPress={() => {
                                        if (item?.unread_msgs) {
                                            const data = [...yourConnections];
                                            const index = data.findIndex(
                                                current => {
                                                    return (
                                                        current._id == item._id
                                                    );
                                                },
                                            );
                                            const temp = { ...data[index] };
                                            temp.unread_msgs = 0;
                                            data[index] = temp;
                                            dispatch(
                                                getYourConnectionResponse(data),
                                            );

                                            const friend = item?.recipient;

                                            navigation.navigate('Chat', {
                                                friend: friend,
                                                user: currentUser,
                                            });
                                        } else {
                                            navigation.navigate("MyProfile", {
                                              currentUser: false,
                                              user: item?.recipient,
                                              userType: "",
                                              back: true,
                                            });
                                        }
                                    }}
                                    userType="yourConnections"
                                    item={item?.recipient}
                                    // style={{ marginLeft: 10 }}
                                />
                            ))}
                            {yourConnections?.length > 10 && (
                                <TouchableOpacity
                                    onPress={() => {
                                        yourConnectionRef.current.snapTo(0);
                                        setIsVisibleConnectedModel(true);
                                    }}
                                    style={[
                                        styles.friendAvatarView,
                                        { marginLeft: 12, marginTop: 10 },
                                    ]}>
                                    <Text style={styles.friendHeading}>
                                        SEE MORE
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    {suggestedConnectionsCategories?.length !== 0 && (
                        <Text
                            style={[
                                styles.connectionHeading,
                                { paddingTop: 8 },
                            ]}>
                            {'Suggested\nConnections'}
                        </Text>
                    )}
                    <FlatList
                        contentContainerStyle={{
                            paddingHorizontal: wp(4),
                        }}
                        keyExtractor={(item, index) =>
                            `id_${index}_${Math.random()}`
                        }
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={suggestedConnectionsCategories}
                        renderItem={renderSuggestedFriends}
                    />
                    <View
                        style={[
                            styles.connectionContainer,
                            { marginTop: 35, backgroundColor: profileColor },
                        ]}>
                        <Text
                            style={[
                                styles.connectionHeading,
                                { color: textColor, paddingBottom: 0 },
                            ]}>
                            {'Pending\nRequests'}
                        </Text>
                        <View style={styles.friendListView}>
                            {pendingRequest?.slice(0, 9)?.map(item => (
                                <Friend
                                    key={item?._id}
                                    userType="pendingRequest"
                                    avatarStyle={{ borderColor: textColor }}
                                    avatar={item?.sender?.cover_image}
                                    name={item?.sender?.first_name}
                                    //   style={{ marginRight: 5 }}
                                    headingStyle={{ color: textColor }}
                                    item={item.sender}
                                    onPress={() => {
                                        navigation.navigate('MyProfile', {
                                            user: item?.sender,
                                            userType: 'pendingRequest',
                                            user_connection_id: item._id,
                                        });
                                    }}
                                />
                            ))}

                            {pendingRequest?.length > 10 && (
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsVisiblePendingModel(true);
                                        pendingConnectionRef?.current?.snapTo(
                                            0,
                                        );
                                    }}
                                    style={[
                                        styles.friendAvatarView,
                                        {
                                            marginLeft: 12,
                                            marginTop: 10,
                                            borderColor: textColor,
                                        },
                                    ]}>
                                    <Text
                                        style={[
                                            styles.friendHeading,
                                            { color: textColor },
                                        ]}>
                                        SEE MORE
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>

            <SuggestionConnectionBottomSheet
                isVisible={isVisibleSuggestionModel}
                bottomSheetRef={suggestionConnectionRef}
                toggleButtonSheet={() => {
                    setIsVisibleSuggestionModel(prv => !prv);
                }}
                suggestionCategory={selectCategory}
            />
            <PendingRequestBottomSheet
                isVisible={isVisiblePendingModel}
                bottomSheetRef={pendingConnectionRef}
                toggleButtonSheet={() => {
                    setIsVisiblePendingModel(prv => !prv);
                }}
                pendingRequests={pendingRequest}
            />
            <YourConnectionBottomSheet
                isVisible={isVisibleConnectedModel}
                bottomSheetRef={yourConnectionRef}
                toggleButtonSheet={() => {
                    setIsVisibleConnectedModel(false);
                }}
                connectionList={yourConnections}
            />
            <GroupUserBottomSheet
                isVisible={isVisibleGroupUserModel}
                bottomSheetRef={groupUserRef}
                toggleButtonSheet={() => {
                    setIsVisibleGroupUserModel(prv => !prv);
                }}
                connectionList={yourConnections}
                suggestionCategory={selectCategory}
            />
            <AllUserBottomSheet
                toggleButtonSheet={() => {
                    setAllUserBottomSheet(false);
                }}
                isVisible={showAllUserBottomSheet}
                bottomSheetRef={allUserRef}
            />
            <AddGroupBottomSheet
                toggleButtonSheet={() => {
                    setAddGroupBottomSheet(false);
                }}
                connectionList={yourConnections}
                isVisible={showAddGroupBottomSheet}
                bottomSheetRef={addNewGroupRef}
            />
        </Container>
    );
};

const CommunityScreen = React.memo(CommunityTab);
export default CommunityScreen;
