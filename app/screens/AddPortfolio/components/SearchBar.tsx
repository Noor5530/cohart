import { SearchIcon } from 'components/Icons';
import { appFonts } from 'components/text';
import { TouchAble } from 'components/workAround';
import { iconColor, neonYellow } from 'config/colors';
import React from 'react';
import { Keyboard, StyleSheet, TextInput, View, ViewStyle } from 'react-native';

let timeOut;
interface Props {
    value: string;
    handleSearchInput: (value: string) => void;
    onSubmit: () => {};
    containerStyle: ViewStyle;
}

export default function SearchAble(props: Props) {
    const { onSubmit = () => {} } = props;
    const handleSearchInput = data => {
        props.handleSearchInput(data);
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {
            Keyboard.dismiss();
        }, 3000);
    };
    return (
        <View style={[styles.container, props.containerStyle]}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.input}
                    onChangeText={handleSearchInput}
                    onSubmitEditing={onSubmit}
                />
                <TouchAble style={{ padding: 5 }} onPress={onSubmit}>
                    <SearchIcon />
                </TouchAble>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 22,
        height: 40,
        paddingHorizontal: 29,
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
