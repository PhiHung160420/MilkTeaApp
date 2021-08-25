import React from 'react';
import {View, Text, StyleSheet, FlatList, ImageBackground} from 'react-native';
import HeaderBar from '../components/Home/HeaderBar';
import CustomButton from '../components/CustomComponents/CustomButton';
import {connect} from 'react-redux';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../constants';

const renderItem = ({item, index}) => {
  return (
    <View
      style={[
        styles.flatlistItem,
        {backgroundColor: item.eligible ? COLORS.yellow : COLORS.gray2},
      ]}>
      <Text
        style={[
          styles.titleItem,
          {color: item.eligible ? COLORS.black : COLORS.lightGray3},
        ]}>
        {item.title}
      </Text>
    </View>
  );
};

const Rewards = ({appTheme, navigation}) => {
  const renderRewardPointSection = () => {
    return (
      <View style={styles.rewardPoint}>
        {/* Text */}
        <Text style={styles.rewardText}>Rewards</Text>
        <Text style={[styles.rewardContent, {color: appTheme.textColor}]}>
          You are 60 points away from your next reward
        </Text>
        {/* Text */}

        {/* Image */}
        <ImageBackground
          source={icons.reward_cup}
          resizeMode="contain"
          style={styles.rewardImage}>
          <View style={styles.rewardIcon}>
            <Text style={{...FONTS.h1}}>280</Text>
          </View>
        </ImageBackground>
        {/* Image */}
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.button}>
        {/* Scan */}
        <CustomButton
          isPrimaryButton={true}
          label="Scan in store"
          containerStyle={{
            width: 130,
            paddingVertical: 5,
            borderRadius: SIZES.radius * 2,
            marginRight: SIZES.radius,
          }}
          labelStyle={{
            ...FONTS.h3,
          }}
          onPress={() => navigation.navigate('Location')}
        />
        {/* Scan */}

        {/* Redeen */}
        <CustomButton
          isSecondaryButton={true}
          label="Redeem"
          containerStyle={{
            width: 130,
            paddingVertical: 5,
            borderRadius: SIZES.radius * 2,
          }}
          labelStyle={{
            ...FONTS.h3,
          }}
          onPress={() => navigation.navigate('Location')}
        />
        {/* Redeen */}
      </View>
    );
  };

  const renderAvailableRewardsHeader = () => {
    return (
      <View style={styles.availableReward}>
        <Text style={[styles.availableText, {color: appTheme.textColor}]}>
          Available Rewards
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderBar />
      {/* Header */}

      {/* Detail */}
      <FlatList
        style={[
          styles.flatlist,
          {backgroundColor: appTheme && appTheme.backgroundColor},
        ]}
        data={dummyData.availableRewards}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 120}}
        ListHeaderComponent={
          <View>
            {/* Rewards Point */}
            {renderRewardPointSection()}
            {/* Rewards Point */}

            {/* Button */}
            {renderButtons()}
            {/* Button */}

            {/* Header Label */}
            {renderAvailableRewardsHeader()}
            {/* Header Label */}
          </View>
        }
        renderItem={renderItem}
      />
      {/* Detail */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    marginTop: -30,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  flatlistItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.base,
    paddingVertical: SIZES.base,
    borderRadius: 20,
  },
  titleItem: {
    ...FONTS.body3,
  },
  rewardPoint: {
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },
  rewardText: {
    color: COLORS.primary,
    ...FONTS.h1,
    fontSize: 39,
  },
  rewardContent: {
    width: SIZES.width * 0.6,
    textAlign: 'center',
    ...FONTS.h3,
    lineHeight: 18,
    marginTop: 10,
  },
  rewardImage: {
    marginTop: SIZES.padding,
    width: SIZES.width * 0.8,
    height: SIZES.width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  availableReward: {
    marginTop: SIZES.padding,
    marginBottom: SIZES.radius,
    paddingHorizontal: SIZES.padding,
  },
  availableText: {
    ...FONTS.h2,
  },
});

const mapStateToProps = state => {
  return {
    appTheme: state.ThemeReducer.appTheme,
    error: state.ThemeReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Rewards);
