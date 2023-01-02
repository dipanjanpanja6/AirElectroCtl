import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Dimensions, Keyboard, Platform, View } from 'react-native';
import { Dialog, Divider, IconButton, Title } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Row from './Row';

const ModalWrapper: FC<PropsWithChildren<{ show: boolean; fullScreen?: boolean; onClose: () => void; title: string }>> = ({ show, onClose, title, children, fullScreen }) => {
  const insets = useSafeAreaInsets();
  const [state, setState] = useState({ bottom: -insets.bottom, maxWidth: Dimensions.get('window').height / 1.5 });

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const onShow = Keyboard.addListener('keyboardWillShow', e => {
        setState({ bottom: e.endCoordinates.height - insets.bottom, maxWidth: Dimensions.get('window').height - (e.endCoordinates.height + insets.bottom + insets.top) });
      });
      const onHide = Keyboard.addListener('keyboardWillHide', () => {
        setState({ bottom: -insets.bottom, maxWidth: Dimensions.get('window').height / 1.5 });
      });

      return () => {
        onHide.remove();
        onShow.remove();
      };
    }
  }, []);

  return (
    <Dialog
      visible={Boolean(show)}
      onDismiss={onClose}
      dismissable
      style={{ margin: 0, bottom: Platform.OS === 'ios' ? state.bottom : -46, left: -30, right: -30, position: 'absolute', padding: 0 }}>
      <Dialog.Content>
        <Row style={{ marginBottom: 17, marginTop: -9, alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
          <Title>{title}</Title>
          <IconButton style={{ margin: 0, position: 'absolute', right: 0 }} icon="close-circle" onPress={onClose} />
        </Row>
        <Divider />
        {fullScreen ? children : <View style={{ maxHeight: state.maxWidth }}>{children}</View>}
      </Dialog.Content>
    </Dialog>
  );
};

export default ModalWrapper;
