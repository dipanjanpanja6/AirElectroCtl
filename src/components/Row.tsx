import React, { PropsWithChildren } from 'react';
import { View, ViewProps } from 'react-native';

const Row: React.FC<PropsWithChildren<ViewProps & { center?: boolean }>> = ({ children, style, center, ...props }) => {
  return (
    <View style={[{ flexDirection: 'row' }, center && { alignItems: 'center', justifyContent: 'center' }, style]} {...props}>
      {children}
    </View>
  );
};
export default Row;
