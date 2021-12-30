import AppState from 'models/reducers';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';

import { textColor } from '../config/colors';

interface ILoadProps {
  shouldLoading: boolean;
}

export default function Loader({ shouldLoading = false }: ILoadProps) {

  const isLoginLoading = useSelector(
    (state: AppState) => state.loading.isLoginLoading,
  );
  return (
    <Modal
      animationInTiming={1000}
      animationOutTiming={1000}
      isVisible={shouldLoading || isLoginLoading}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={textColor} size={'large'} />
      </View>
    </Modal>
  );
}
