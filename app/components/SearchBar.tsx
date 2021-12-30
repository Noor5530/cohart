import { SearchIcon } from 'components/Icons';
import { appFonts } from 'components/text';
import { iconColor, neonYellow } from 'config/colors';
import React from 'react';
import { Keyboard, StyleSheet, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
    value?: string;
    handleSearchInput?: (value?: string) => void;
    onPressDone?: (value?: string) => void;
    showPressButton?: boolean;
    placeholder?: string;
    containerStyle?: ViewStyle;
    searchBarStyle?: ViewStyle;
    searchIconColor?: string;
    searchInputStyle?: TextStyle;
    buttonStyle?: ViewStyle;
    onFocus: () => void;
    onSubmit: () => void;
}
let timeOut = () => {};
const SearchBar = (props: Props) => {
    const {
        searchIconColor = '#E5E5E5',
        onFocus = () => {},
        onPressDone = () => {},
        onSubmit = () => {},
        buttonStyle,
    } = props;
    const handleSearchInput = data => {
        props.handleSearchInput(data);
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            Keyboard.dismiss();
        }, 4000);
    };

    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={[styles.searchBar, props.searchBarStyle]}>
                <TextInput
                    onSubmitEditing={onSubmit}
                    onFocus={onFocus}
                    style={[styles.input, props.searchInputStyle]}
                    value={props.value}
                    onChangeText={handleSearchInput}
                    placeholder={props.placeholder ? props.placeholder : ''}
                />
                <TouchableOpacity style={{ padding: 5 }} onPress={onSubmit}>
                    <SearchIcon color={searchIconColor} />
                </TouchableOpacity>
            </View>
            {props.showPressButton && (
                <TouchableOpacity
                    style={[styles.button, buttonStyle]}
                    onPress={onPressDone}>
                    <AntDesign name="plus" color={iconColor} size={15} />
                </TouchableOpacity>
            )}
        </View>
    );
};
export default React.memo(SearchBar);
const styles = StyleSheet.create({
    container: {
        marginTop: 22,
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
        height: 40,
        flexDirection: 'row',
    },
    searchBar: {
        borderRadius: 6,
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 0.960092,
        borderColor: '#e6e6e6',
    },
    input: {
        fontFamily: appFonts.InterRegular,
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 12,
        color: iconColor,
        height: 40,
        flex: 1,
    },
    button: {
        alignSelf: 'center',
        width: 32,
        height: 32,
        backgroundColor: neonYellow,
        borderRadius: 18,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.48,
        borderColor: iconColor,
    },
});
