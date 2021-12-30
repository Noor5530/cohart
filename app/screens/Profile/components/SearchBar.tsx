import { SearchIcon } from 'components/Icons';
import { appFonts } from 'components/text';
import { TouchAble } from 'components/workAround';
import { iconColor } from 'config/colors';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { neonYellow } from '../../../config/colors';

interface Props {
  value: string;
  handleSearchInput: (value: string) => void;
  onFocus: () => void;
  onSubmit: () => void;
}

export default function SearchAble(props: Props) {
  const { onSubmit = () => {} } = props;
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          onFocus={() => {
            if (props.onFocus()) {
              props.onFocus();
            }
          }}
          onSubmitEditing={onSubmit}
          style={styles.input}
          value={props.value}
          onChangeText={props.handleSearchInput}
          placeholder="Search Keyword"
        />
        <TouchAble onPress={onSubmit} style={{ padding: 5 }}>
          <SearchIcon />
        </TouchAble>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
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
    borderColor: '#000000',
  },
  input: {
    fontFamily: appFonts.InterRegular,
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
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
