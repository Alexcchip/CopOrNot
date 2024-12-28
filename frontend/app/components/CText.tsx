import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export default function CustomText({ style, fontType = 'bold nonitalic', ...props }: any) {
  const fontFamily = (() => {
    switch (fontType) {
      case 'regular italic':
        return 'Helvetica-Oblique';
      case 'light italic':
        return 'Helvetica-Light-Oblique';
      case 'bold italic':
        return 'Helvetica-Bold-Oblique';
      case 'regular nonitalic':
        return 'Helvetica';
      case 'light nonitalic':
        return 'Helvetica-Light';
      default: // Default to bold nonitalic
        return 'Helvetica-Bold';
    }
  })();

  return <Text style={[{ fontFamily }, style]} {...props} />;
}
