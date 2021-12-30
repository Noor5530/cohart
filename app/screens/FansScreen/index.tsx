import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import styles from "./styles";
import FansHeader from "components/BackHeadingHeader";
import SearchBar from "components/SearchBar";
import { iconColor } from "config/colors";
import {
  useRoute,
} from "@react-navigation/native";
import Friend from "./components/Friend";
import { MyFansScreenRouteProps } from "navigation/types";
import { getFansList } from "services/getFansList";
import { useIsFocused } from "@react-navigation/core";
const FansScreen = () => {
  const [searchString, setSearchString] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationError, setPaginationError] = useState(false);
  const route = useRoute<MyFansScreenRouteProps>();
  const userId = route?.params?._id;
  const isFocused = useIsFocused();
  const [pageLoading, setPageLoading] = useState(false);
  const onRefresh = () => {
    setLoading(true);
    setAllUser([]);
    setPageNumber(1);
    getFans(searchString);
  };
  const getFans = async (value: string) => {
    try {
      let response = await getFansList({
        user_id: userId,
        search_key: value,
        page: 1,
        page_size: 20,
      });

      let searchKey = response.config.params.search_key;
      if (searchKey == searchString) {
        setAllUser(response?.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const loadMoreFans = async () => {
    try {
      if (allUser.length > 18 && !paginationError) {
        setPageLoading(true);
        let response = await getFansList({
          user_id: userId,
          search_key: searchString,
          page: pageNumber,
          page_size: 20,
        });
        let searchKey = response.config.params.search_key;

        if (searchKey == searchString && response?.data.length != 0) {
          setAllUser((prv) => prv.concat(response?.data));
          setPageNumber((prv) => prv + 1);
        }
        setPageLoading(false);
      }
    } catch (error) {
      setPaginationError(true);
      setPageLoading(false);
    }
  };
  useEffect(() => {
    return () => {
      setLoading(false);
      setAllUser([]);
      setPageNumber(1);
      setAllUser([]);
      setSearchString("");
    };
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      setAllUser([]);
      setPageNumber(1);
      getFans(searchString);
    }
  }, [searchString, isFocused]);
  const renderItem = ({ item }) => {
    return <Friend item={item} />;
  };
  useEffect(() => {
    if (searchString == "") {
      setAllUser([]);
      onRefresh();
    }
  }, [searchString]);

  return (
    <>
      <View style={styles.container}>
        <FansHeader headerTitle="Your Fans" />
        <SearchBar
          placeholder="Search"
          onFocus={() => { }}
          searchIconColor={iconColor}
          searchBarStyle={styles.searchBarStyle}
          searchInputStyle={styles.searchInputStyle}
          value={searchString}
          handleSearchInput={(data) => {
            setSearchString(data);
          }}
          onSubmit={() => { }}
        />

        <FlatList
          refreshing={loading}
          onRefresh={onRefresh}
          contentContainerStyle={styles.contentStyle}
          onEndReached={loadMoreFans}
          onEndThreshold={0.3}
          style={styles.container}
          ListEmptyComponent={() => {
            return (
              <View style={styles.listComponent}>
                {allUser?.length == 0 && loading ? null : (
                  <Text style={styles.emptyText}>
                    you do not have any connection
                  </Text>
                )}
              </View>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View style={styles.listComponent}>
                {allUser?.length > 19 && !paginationError && pageLoading ? (
                  <ActivityIndicator color="black" size="large" />
                ) : (
                  <View />
                )}
              </View>
            );
          }}
          data={allUser}
          renderItem={renderItem}
          numColumns={4}
          keyExtractor={(item, index) => `id_${index}`}
        />
      </View>
    </>
  );
};

export default React.memo(FansScreen);
