import React, { useEffect, useState, useCallback } from "react";

import { useDispatch } from "react-redux";
import { getFeaturedPosts } from "services/getFeaturedPosts";
import { enableSnackBar } from "../../store/actions/snackBarAction";
import { useIsFocused } from "@react-navigation/native";
import FeatureSnapshot from "./components/FeatureSnapshot";
import { FlatList, View, Text } from "react-native";
import Header from "components/Header";
import styles from "./styles";
import { Post } from "./types";
const FeatureSnapshotList = () => {
  const [featureSnapShort, setFeatureSnapShort] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isFocused) {
      fetchFeatureSnapShort();
    }
  }, [isFocused]);
  const fetchFeatureSnapShort = useCallback(async () => {
    try {
      setLoading(true);
      let response = await getFeaturedPosts({ admin_view: true });
      setFeatureSnapShort(response?.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      dispatch(enableSnackBar());
      setLoading(false);
    }
  }, [setLoading, setFeatureSnapShort]);
  const renderItem = ({ item }: { item: Post }) => {
    return <FeatureSnapshot item={item} />;
  };
  const ListEmptyComponent = () => {
    return (
      <View style={styles.listComponent}>
        {loading ? null : <Text style={styles.emptyText}>No post found</Text>}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header back />
      <FlatList
        testID={"SnapShotList"}
        onRefresh={fetchFeatureSnapShort}
        refreshing={loading}
        style={styles.container}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item, index) => `id_${index}`}
        data={featureSnapShort}
        numColumns={3}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FeatureSnapshotList;
