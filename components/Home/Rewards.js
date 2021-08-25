import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, icons, SIZES} from '../../constants';

const Rewards = () => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.rewardStyle}
        onPress={() => navigation.navigate('Rewards')}>
        {/* Rewards Cup */}
        <View style={styles.cupContainer}>
          <ImageBackground
            source={icons.reward_cup}
            resizeMode="contain"
            style={styles.cupStyle}>
            <View style={styles.cupSizeStyle}>
              <Text style={styles.cupSizeText}>280</Text>
            </View>
          </ImageBackground>
        </View>

        {/* Rewards Detail */}
        <View style={styles.RDContainer}>
          <Text style={styles.RDTextTop}>Available Rewards</Text>
          <View style={styles.RDTextBottom}>
            <Text style={styles.RDTextBottomContent}>
              150 points - $2.50 off
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  //Cup style
  rewardStyle: {
    flexDirection: 'row',
    marginTop: SIZES.padding,
    marginHorizontal: SIZES.padding,
    height: 100,
  },
  cupContainer: {
    width: 100,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pink,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  cupStyle: {
    width: 85,
    height: 85,
    marginLeft: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cupSizeStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.transparentBlack,
  },
  cupSizeText: {
    color: COLORS.white,
    ...FONTS.h4,
  },

  //Reward detail style
  RDContainer: {
    flex: 1,
    marginLeft: -10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightPink,
  },
  RDTextTop: {
    color: COLORS.primary,
    ...FONTS.h2,
  },
  RDTextBottom: {
    marginTop: 5,
    padding: SIZES.base,
    borderRadius: SIZES.radius * 2,
    backgroundColor: COLORS.primary,
  },
  RDTextBottomContent: {
    color: COLORS.white,
    ...FONTS.body3,
  },
});

export default Rewards;
