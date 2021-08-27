import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS, FONTS} from '../constants';

const VerticalTextButton = ({containerStyle, label, selected, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        transform: [
          {
            rotate: '-90deg',
          },
        ],
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text
        style={{
          color: selected ? COLORS.white1 : COLORS.lightGreen,
          ...FONTS.body2,
          fontSize: 20,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default VerticalTextButton;
