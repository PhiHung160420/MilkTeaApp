import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Image,
} from 'react-native';
import {COLORS, constants, dummyData, FONTS, SIZES} from '../../constants';
import {connect} from 'react-redux';
import {CustomButton} from '../index';
import {useNavigation} from '@react-navigation/native';

const promoTabs = constants.promoTabs;

const Tabs = ({appTheme}) => {
  return (
    <View
      style={[
        styles.tabStyle,
        {backgroundColor: appTheme && appTheme.tabBackgroundColor},
      ]}>
      {/* Tab Indicator */}
      <View style={styles.indicatorStyle} />

      {/* Tab */}
      {promoTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`promoTab-${index}`}
            style={styles.tabBtnStyle}>
            <View style={styles.tabContentStyle}>
              <Text style={styles.tabContent}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Promo = ({appTheme}) => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.promoContainer}>
      {/* Header Tabs */}
      <Tabs appTheme={appTheme} scrollX={scrollX} />

      {/* Details */}
      <Animated.FlatList
        data={dummyData.promos}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        keyExtractor={item => `${item.id}`}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({item, index}) => {
          return (
            <View style={styles.itemDetailStyle}>
              {/* Image */}
              <Image
                source={item.image}
                resizeMode="contain"
                style={styles.imageItem}
              />

              {/* Name */}
              <Text style={styles.itemName}>{item.name}</Text>

              {/* Description */}
              <Text
                style={[
                  styles.itemDescript,
                  {color: appTheme && appTheme.textColor},
                ]}>
                {item.description}
              </Text>

              {/* Calories */}
              <Text
                style={[
                  styles.itemColories,
                  {color: appTheme && appTheme.textColor},
                ]}>
                {item.calories}
              </Text>

              {/* Button */}
              <CustomButton
                label="Order Now"
                isPrimaryButton={true}
                containerStyle={{
                  marginTop: 10,
                  marginHorizontal: SIZES.padding,
                  paddingHorizontal: SIZES.padding,
                  paddingVertical: SIZES.base,
                  borderRadius: SIZES.radius * 4,
                }}
                labelStyle={{...FONTS.h3}}
                onPress={() => navigation.navigate('Location')}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  promoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  tabStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.padding,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.padding,
  },
  tabBtnStyle: {},
  tabContentStyle: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  tabContent: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  indicatorStyle: {
    position: 'absolute',
    height: '100%',
    width: 100,
    left: 0,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  //flatlist item styles
  itemDetailStyle: {
    flex: 1,
    alignItems: 'center',
    width: SIZES.width,
    paddingTop: SIZES.padding,
  },
  imageItem: {
    width: '100%',
  },
  itemName: {
    color: COLORS.red,
    ...FONTS.h1,
    fontSize: 27,
  },
  itemDescript: {
    marginTop: 3,
    ...FONTS.body4,
  },
  itemColories: {
    marginTop: 3,
    ...FONTS.body4,
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

export default connect(mapStateToProps, mapDispatchToProps)(Promo);
