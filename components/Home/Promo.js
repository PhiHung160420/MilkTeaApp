import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Image,
} from 'react-native';
import FlatList from 'react-native-gesture-handler';
import {COLORS, constants, dummyData, FONTS, SIZES} from '../../constants';
import {connect} from 'react-redux';
import {CustomButton} from '../index';
import {useNavigation} from '@react-navigation/native';

const promoTabs = constants.promoTabs.map(promoTab => ({
  ...promoTab,
  ref: createRef(),
}));

const TabIndicator = ({measure, scrollX}) => {
  const inputRange = measure.map((_, i) => i * SIZES.width);
  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measure.map(item => item.width),
  });

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measure.map(item => item.x),
  });

  return (
    <Animated.View
      style={[
        styles.indicatorStyle,
        {width: tabIndicatorWidth, transform: [{translateX}]},
      ]}
    />
  );
};

const Tabs = ({appTheme, scrollX, onPromoTabPress}) => {
  const [measure, setMeasure] = useState([]);
  const containerRef = useRef();
  const tabPosition = Animated.divide(scrollX, SIZES.width);

  useEffect(() => {
    let ml = [];

    promoTabs.forEach(promo => {
      promo.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          if (width > 0) {
            ml.push({x, y, width, height});
          }

          if (ml.length === promoTabs.length) {
            setMeasure(ml);
          } else {
            setMeasure([]);
          }
        },
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={[
        styles.tabStyle,
        {backgroundColor: appTheme && appTheme.tabBackgroundColor},
      ]}>
      {/* Tab Indicator */}
      {measure.length > 0 && (
        <TabIndicator measure={measure} scrollX={scrollX} />
      )}
      {/* Tab Indicator */}

      {/* Tab */}
      {promoTabs.map((item, index) => {
        const textColor = tabPosition.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [COLORS.lightGreen2, COLORS.white, COLORS.lightGreen2],
          extrapolate: 'clamp',
        });

        return (
          <TouchableOpacity
            key={`promoTab-${index}`}
            style={styles.tabBtnStyle}
            onPress={() => onPromoTabPress(index)}>
            <View ref={item.ref} style={styles.tabContentStyle}>
              <Animated.Text style={[styles.tabContent, {color: textColor}]}>
                {item.title}
              </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      })}
      {/* Tab */}
    </View>
  );
};

const Promo = ({appTheme}) => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;

  const promoScrollViewRef = useRef();

  const onPromoTabPress = useCallback(promoTabIndex => {
    promoScrollViewRef?.current?.scrollToOffset({
      offset: promoTabIndex * SIZES.width,
    });
  });

  return (
    <View style={styles.promoContainer}>
      {/* Header Tabs */}
      <Tabs
        appTheme={appTheme}
        scrollX={scrollX}
        onPromoTabPress={onPromoTabPress}
      />

      {/* Details */}
      <Animated.FlatList
        ref={promoScrollViewRef}
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
        renderItem={({item, index}) => (
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
        )}
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
    ...FONTS.h3,
  },
  indicatorStyle: {
    position: 'absolute',
    height: '100%',
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
