import { RefreshControl, ScrollView, View } from "react-native";
import React, { memo, useState } from "react";
const isCloseToBottom = (
  { layoutMeasurement, contentOffset, contentSize },
  onEndReachedThreshold
) => {
  const paddingToBottom = contentSize.height * onEndReachedThreshold;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
function MasonryList(props) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    keyPrefix,
    refreshing,
    data,
    innerRef,
    ListHeaderComponent,
    ListEmptyComponent,
    ListFooterComponent,
    renderItem,
    onEndReachedThreshold,
    onEndReached,
    onRefresh,
    loading,
    LoadingView,
    numColumns = 2,
    style,
    horizontal,
  } = props;
  return (
    <ScrollView
      {...props}
      ref={innerRef}
      style={[{ flex: 1, alignSelf: "stretch" }, style]}
      removeClippedSubviews={true}
      refreshControl={
        <RefreshControl
          refreshing={!!(refreshing || isRefreshing)}
          onRefresh={() => {
            setIsRefreshing(true);
            onRefresh === null || onRefresh === void 0 ? void 0 : onRefresh();
            setIsRefreshing(false);
          }}
        />
      }
      scrollEventThrottle={16}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent, onEndReachedThreshold || 0.1))
          onEndReached === null || onEndReached === void 0
            ? void 0
            : onEndReached();
      }}
    >
      {ListHeaderComponent()}
      {data.length === 0 && ListEmptyComponent ? (
        React.isValidElement(ListEmptyComponent) ? (
          ListEmptyComponent
        ) : (
          <ListEmptyComponent />
        )
      ) : (
        <View style={{ flex: 1, flexDirection: horizontal ? "column" : "row" }}>
          {Array.from(Array(numColumns), (_, num) => {
            return (
              <View
                key={`${keyPrefix}-${num.toString()}`}
                style={{
                  flex: 1 / numColumns,
                  flexDirection: horizontal ? "row" : "column",
                }}
              >
                {data
                  .map((el, i) => {
                    if (i % numColumns === num)
                      return renderItem({ item: el, i });
                    return null;
                  })
                  .filter((e) => !!e)}
              </View>
            );
          })}
        </View>
      )}
      {loading && LoadingView}
      {ListFooterComponent}
    </ScrollView>
  );
}
export default memo(MasonryList);
