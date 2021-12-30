import { useIsFocused, useNavigation } from '@react-navigation/native';
import saveStarIcon from 'assets/saveStarIcon.png';
import Image from 'components/AnimatedImage';
import StatusBar from 'components/CustomStatusBar';
import Header from 'components/Header';
import HeaderHeading from 'components/HeaderHeading';
import ListEmpty from 'components/ListEmpty';
import { appFonts } from 'components/text';
import { Container } from 'components/workAround';
import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import {
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSavedWork } from 'services/getSavedWork';
import { getSavedWorkRequest } from 'store/actions/appAction';

import { iconColor, textColor } from '../../config/colors';
import { isIphone } from '../../lib/isIphone';
import AppState from '../../models/reducers';
import styles from './style';
import { logOutRequest } from "store/actions/userActions";
import { LogOutRequestEnum } from "models/actions/user";

export default function SavedArtWorks() {
  const dispatch = useDispatch();
  const [pagingError, setPagingError] = useState(false);
  const loading = useSelector((state: AppState) => state.loading.isAppLoading);
  const [pageNumber, setPageNumber] = useState(1);
  const userId = useSelector((state: AppState) => state.user._id);
  const savedWork = useSelector((state: AppState) => state.app.savedWork);
  const focused = useIsFocused();
  const navigation = useNavigation();
  const [pageLoading, setPageLoading] = useState(false);
  const [savedWorkData, setSavedWorkData] = useState(savedWork);

  const onEndReach = async () => {
    if (savedWorkData.length > 20 && !pagingError) {
      setPageLoading(true);
      try {
        let response = await getSavedWork({
          page: pageNumber + 1,
          user_id: userId,
        });
        if (Array.isArray(response.data.data)) {
          setPagingError(true);

          if (response.data.data.length > 0) {
            setSavedWorkData((prv) => prv.concat(response.data.data));
          } else {
            setPageLoading(false);
          }
        }
      } catch (error: any) {
        if (error?.response?.status == 401) {
          dispatch(logOutRequest(LogOutRequestEnum.tokenExpire));
        }

        setPageLoading(false);

        setPagingError(true);
      }
    }
  };

  const onRefresh = useCallback(() => {
    dispatch(
      getSavedWorkRequest({
        page: 1,
        user_id: userId,
      })
    );
    setPageNumber(1);
    setPagingError(false);
  }, [setPageNumber, dispatch, userId]);
  useLayoutEffect(() => {
    if (focused) {
      onRefresh();
    }
  }, [focused]);
  useEffect(() => {
    setSavedWorkData(savedWork);
    setPageNumber(1);
    setPagingError(false);
  }, [savedWork]);
  const renderWork = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddPortfolio", {
            mediaUrl: item?.post_image,
            data: item,
            isPreView: true,
            userWork: false,
            stopRefresh: true,
            userData: {
              cover_image: item?.user_cover_image,
              username: item?.username,
              full_name: item?.full_name,
            },
          });
        }}
        style={styles.renderWork}
      >
        {item?.ready_for_sale && (
          <View style={styles.renderView}>
            <Text style={styles.text}>FOR SALE</Text>
          </View>
        )}
        <Image
          thumbnail={
            item?.resized_image_path
              ? item?.resized_image_path
              : item?.post_image
          }
          uri={item?.post_image}
          style={styles.image}
        />
      </TouchableOpacity>
    );
  };
  return (
    <Container>
      <View key="savedArtWork" style={styles.container}>
        <StatusBar backgroundColor={textColor} barStyle="dark-content" />

        <Header
          style={{
            paddingTop: isIphone(),
            borderBottomColor: iconColor,
            borderBottomWidth: 1.5,
          }}
          textStyle={{
            color: iconColor,
            fontFamily: appFonts.AktivGroteskEx_Trial_Bd,
          }}
          back
          color={iconColor}
        />
        <HeaderHeading
          title={"Saved Artworks"}
          style={{ paddingBottom: 21 }}
          icon={saveStarIcon}
        />

        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item, index) => `id_${index}`}
          ListEmptyComponent={() => {
            return <ListEmpty style={{ paddingVertical: 20 }} />;
          }}
          ListFooterComponent={() => {
            return (
              <View style={styles.listFooterComponent}>
                {pageLoading ? (
                  <ActivityIndicator color="black" size="large" />
                ) : (
                  <View />
                )}
              </View>
            );
          }}
          onEndReached={onEndReach}
          refreshing={loading}
          onRefresh={onRefresh}
          data={savedWorkData}
          numColumns={3}
          renderItem={renderWork}
        />
      </View>
    </Container>
  );
}
