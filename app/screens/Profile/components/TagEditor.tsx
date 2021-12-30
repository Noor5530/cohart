import { appFonts, AppText } from "components/text";
import { iconColor, placeHolderColor, textColor } from "config/colors";
import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import {
  FlatList,
  TouchableOpacity as RNGHTouchableOpacity,
} from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import { enableSnackBar } from "store/actions/snackBarAction";

import SearchBar from "./SearchBar";
import { TouchableOpacityProps } from "react-native";

interface IProps {
  title: string;
  tagsList: any;
  interests: string[];
  label: string;
  toggleTagView: () => void;
  onChangeInterests: (interests: string[]) => void;
  onFocus: () => void;
  required: number;
}

const TagEditor: FC<IProps> = (props: IProps) => {
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const [tagsList, setTagsList] = useState();

  useEffect(() => {
    if (searchString == "") {
      setTagsList(props.tagsList);
    }
  }, [props.tagsList, searchString]);

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const onSearch = useCallback(
    (value) => {
      // Keyboard.dismiss();
      const data = props.tagsList.filter((item: string) => {
        if (item.includes(value)) {
          return item;
        }
      });
      setTagsList(data);
    },
    [props.tagsList]
  );
  const renderTag = useCallback(
    ({ item }) => {
      let index = -1;
      index = props.interests.findIndex((tag) => {
        return tag == item;
      });
      return (
        <Tag
          color={index == -1 ? placeHolderColor : iconColor}
          index={index}
          interests={props.interests}
          item={item}
          onChangeInterests={props.onChangeInterests}
        />
      );
    },
    [props.interests, props.onChangeInterests]
  );
  const save = () => {
    if (props.interests.length < props?.required) {
      dispatch(enableSnackBar(props.title));
    } else {
      props.toggleTagView();
    }
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 25,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: "black",
              fontSize: wp("11"),
              fontWeight: "700",
              width: wp("80"),
              fontFamily: appFonts.InterRegular,
            }}
          >
            {props.label}
          </Text>
          <TouchAble
            onPress={() => {
              save();
            }}
          >
            <AntDesign
              onPress={() => {
                save();
              }}
              name="plus"
              color={iconColor}
              size={wp(10)}
            />
          </TouchAble>
        </View>
        <Text style={styles.requiredText}>{"(" + props.title + ")"}</Text>

        <SearchBar
          value={searchString}
          handleSearchInput={(text) => {
            setSearchString(text);
            onSearch(text);
          }}
          //  onSubmit={onSearch}
          onFocus={props.onFocus}
        />
        <FlatList
          keyboardShouldPersistTaps="always"
          data={tagsList}
          keyExtractor={(item, index) => `id_${index}`}
          renderItem={renderTag}
        />
      </View>
      <TouchAble
        onPress={() => {
          save();
        }}
        style={{
          width: "100%",
          backgroundColor: iconColor,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          // position: 'absolute',
          // bottom: 0,
          // zIndex: 20,
        }}
      >
        <AppText
          medium
          style={{
            color: textColor,
            textTransform: "uppercase",
            fontSize: 16,
          }}
        >
          Save
        </AppText>
      </TouchAble>
    </View>
  );
};

export default TagEditor;

interface ITagProps {
  index: number;
  item: string;
  onChangeInterests: (data: string[]) => {};
  interests: string[];
}

export function Tag(props: ITagProps) {
  const { index, item } = props;
  const animation = useRef(new Animated.Value(0));
  useEffect(() => {
    if (index !== -1) {
      handleAnimation();
    }
  }, [index]);
  const handleAnimation = () => {
    Animated.timing(animation.current, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animation.current, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const textAnimation = animation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [placeHolderColor, "#000000"],
  });
  return (
    <View
      style={{
        flexDirection: "row",
        paddingTop: 10,
        alignItems: "center",
      }}
    >
      <TouchAble
        onPress={() => {
          if (index !== -1) {
            const temp = [...props.interests];
            const data = temp.filter((tag) => {
              return tag !== item;
            });
            fadeOut();

            props.onChangeInterests(data);
          } else {
            handleAnimation();
            const temp = [...props.interests, item];
            props.onChangeInterests(temp);
          }
        }}
      >
        <Animated.Text
          style={{
            color: textAnimation,
            fontSize: wp(6.5),
            fontWeight: "400",
            fontFamily: appFonts.InterRegular,
          }}
        >
          {item}
        </Animated.Text>
      </TouchAble>
    </View>
  );
}

// TODO need define the Interface prop for touchable
interface TouchProps extends TouchableOpacityProps {
  children: ReactNode;
}
function TouchAble(props: TouchProps) {
  if (Platform.OS == "android") {
    return (
      <RNGHTouchableOpacity {...props}>{props.children}</RNGHTouchableOpacity>
    );
  } else {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  feildHeader: {
    textTransform: "uppercase",
    fontSize: wp(""),
    marginBottom: 8,
    marginLeft: 8,
  },
  requiredText: {
    fontWeight: "normal",
    fontSize: wp("5"),
  },
});
