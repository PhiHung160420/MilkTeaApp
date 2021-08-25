import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {COLORS, FONTS} from '../constants';

const TabButton = ({containerStyle, label, selected, onPress}) => {
  return (
    <TouchableOpacity
      style={{alginItem: 'center', ...containerStyle}}
      onPress={onPress}>
      {/* Text */}
      <Text
        style={{
          color: selected ? COLORS.primary : COLORS.gray,
          ...FONTS.body2,
          fontSize: 18,
        }}>
        {label}
      </Text>
      {/* Text */}

      {/* Line */}
      <View
        style={{
          marginTop: selected ? 3 : 4,
          height: selected ? 4 : 2,
          width: '100%',
          backgroundColor: selected ? COLORS.primary : COLORS.gray,
        }}
      />
      {/* Line */}
    </TouchableOpacity>
  );
};

export default TabButton;
