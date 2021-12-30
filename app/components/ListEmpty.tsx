import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';

import AppState from '../models/reducers';
import { appFonts } from './text';

interface Props {
    style: ViewStyle;
}
const ListEmpty = (props: Props) => {
    const loading = useSelector(
        (state: AppState) => state.loading.isAppLoading,
    );
    return (
        <View style={[styles.container, props.style]}>
            <Text style={styles.description}>
                {loading ? 'Loading...' : 'No Data Found'}
            </Text>
        </View>
    );
};

export default React.memo(ListEmpty);

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    description: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: appFonts.InterRegular,
    },
});
