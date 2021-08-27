import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {IconButton, TabButton, VerticalTextButton} from '../components';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../constants';
import Svg, {Circle} from 'react-native-svg';

const Order = ({navigation, appTheme, route}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [selectedTab, setSelecTedtab] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState('Milk Tea');

  const [menu, setMenu] = useState(null);

  useEffect(() => {
    let {selectedLocation} = route.params;
    setSelectedLocation(selectedLocation);
  }, []);

  useEffect(() => {
    let menuList = dummyData.menuList.filter(
      menuItem => menuItem.category == selectedCategory,
    );
    setMenu(menuList);
  }, [selectedCategory]);

  const renderHeaderSection = () => {
    return (
      <SafeAreaView
        style={{
          height: 200,
          backgroundColor: COLORS.primary,
          alignItems: 'center',
        }}>
        {/* Nav Bar */}
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            alignItems: 'center',
          }}>
          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{color: COLORS.white, ...FONTS.h1, fontSize: 25}}>
              Pick-up Order
            </Text>
          </View>

          <View style={{width: 25}} />
        </View>
        {/* Nav Bar */}

        {/* Location */}
        <View
          style={{
            marginTop: SIZES.radius,
            backgroundColor: COLORS.white1,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.padding,
          }}>
          <Text style={{color: COLORS.primary, ...FONTS.body3}}>
            {selectedLocation?.title}
          </Text>
        </View>
        {/* Location */}
      </SafeAreaView>
    );
  };

  const renderTopTabBarSection = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          marginTop: SIZES.radius,
          justifyContent: 'center',
          paddingLeft: SIZES.padding * 2,
          paddingRight: SIZES.padding,
        }}>
        {/* Tab buttons */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TabButton
            containerStyle={{width: 55}}
            label="Menu"
            selected={selectedTab == 0}
            onPress={() => setSelecTedtab(0)}
          />
          <TabButton
            containerStyle={{width: 80}}
            label="Previous"
            selected={selectedTab == 1}
            onPress={() => setSelecTedtab(1)}
          />
          <TabButton
            containerStyle={{width: 80}}
            label="Favourite"
            selected={selectedTab == 2}
            onPress={() => setSelecTedtab(2)}
          />
        </View>
        {/* Tab buttons */}

        {/* Order Number */}
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
          }}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>0</Text>
        </View>
        {/* Order Number */}
      </View>
    );
  };

  const renderSideBar = () => {
    return (
      <View>
        <Svg height="65" width="65" viewBox="0 0 65 65">
          <Circle cx="5" cy="60" r="60" fill={COLORS.primary} />
        </Svg>
        <View
          style={{
            marginTop: -10,
            width: 65,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}>
          <VerticalTextButton
            label="Snack"
            selected={selectedCategory == 'Snack'}
            onPress={() => setSelectedCategory('Snack')}
          />
          <VerticalTextButton
            label="Coffee"
            containerStyle={{marginTop: 50}}
            selected={selectedCategory == 'Coffee'}
            onPress={() => setSelectedCategory('Coffee')}
          />
          <VerticalTextButton
            label="Smoothie"
            containerStyle={{marginTop: 70, width: 100}}
            selected={selectedCategory == 'Smoothie'}
            onPress={() => setSelectedCategory('Smoothie')}
          />
          <VerticalTextButton
            label="Specialtea"
            containerStyle={{marginTop: 70, width: 100}}
            selected={selectedCategory == 'Specialtea'}
            onPress={() => setSelectedCategory('Specialtea')}
          />
          <VerticalTextButton
            label="Milk Tea"
            containerStyle={{marginTop: 80, width: 80}}
            selected={selectedCategory == 'Milk Tea'}
            onPress={() => setSelectedCategory('Milk Tea')}
          />
        </View>
        <Svg height="65" width="65" viewBox="0 0 65 65">
          <Circle cx="5" cy="0" r="60" fill={COLORS.primary} />
        </Svg>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeaderSection()}
      {/* Header */}

      {/* Detail */}
      <View
        style={{
          flex: 1,
          backgroundColor: appTheme.backgroundColor,
          marginTop: -45,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        {/* TabBar */}
        {renderTopTabBarSection()}
        {/* TabBar */}

        {/* SideBar & Listing */}
        <View style={{flex: 1, flexDirection: 'row'}}>
          {/* SideBar */}
          {renderSideBar()}
          {/* SideBar */}

          {/* Listing */}
          <FlatList
            data={menu}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              marginTop: SIZES.padding,
              paddingBottom: 50,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate('OrderDetail', {selectedItem: item})
                  }>
                  <View
                    style={{
                      height: 150,
                      paddingHorizontal: SIZES.padding,
                      marginTop: index > 0 ? SIZES.padding : 0,
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}>
                    {/* Thumbnail */}
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: SIZES.padding,
                        width: 130,
                        height: 140,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightYellow,
                        zIndex: 1,
                      }}>
                      <Image
                        source={item.thumbnail}
                        resizeMode="contain"
                        style={{width: 100, height: 100}}
                      />
                    </View>
                    {/* Thumbnail */}

                    {/* Details */}
                    <View
                      style={{
                        width: '70%',
                        height: '85%',
                        paddingLeft: '22%',
                        paddingRight: SIZES.base,
                        paddingVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.primary,
                      }}>
                      <Text
                        style={{
                          color: COLORS.white,
                          ...FONTS.h2,
                          fontSize: 18,
                          lineHeight: 25,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: COLORS.lightYellow,
                          ...FONTS.h2,
                          fontSize: 18,
                        }}>
                        {item.price}
                      </Text>
                    </View>
                    {/* Details */}
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
          />
          {/* Listing */}
        </View>
        {/* SideBar & Listing */}
      </View>
      {/* Detail */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(Order);
