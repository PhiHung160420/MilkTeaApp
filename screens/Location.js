import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {IconButton} from '../components/index';
import HeaderBar from '../components/Home/HeaderBar';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../constants';
import {TabButton} from '../components/index';

const Location = ({navigation, appTheme}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const renderHeader = () => {
    return (
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.headerView}>
          {/* Back Button */}
          <IconButton
            icon={icons.leftArrow}
            onPress={() => navigation.goBack()}
          />
          {/* Back Button */}

          {/* Title */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{color: COLORS.white, ...FONTS.h1, fontSize: 28}}>
              Locations
            </Text>
          </View>
          {/* Title */}

          {/* Empty */}
          <View style={{width: 25}}></View>
          {/* Empty */}
        </View>
      </SafeAreaView>
    );
  };

  const renderTopBarSection = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {/* Nearby */}
        <TabButton
          containerStyle={{width: 80}}
          label="Nearby"
          selected={selectedTab == 0}
          onPress={() => setSelectedTab(0)}
        />
        {/* Nearby */}

        {/* Previous */}
        <TabButton
          containerStyle={{width: 100}}
          label="Previous"
          selected={selectedTab == 1}
          onPress={() => setSelectedTab(1)}
        />
        {/* Previous */}

        {/* Favourite */}
        <TabButton
          containerStyle={{width: 100}}
          label="Favourite"
          selected={selectedTab == 2}
          onPress={() => setSelectedTab(2)}
        />
        {/* Favourite */}
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: SIZES.radius,
          height: 50,
          paddingHorizontal: SIZES.padding,
          borderRadius: 25,
          backgroundColor: COLORS.lightGreen2,
          alignItems: 'center',
        }}>
        <TextInput
          style={{flex: 1, height: 50, color: COLORS.black, fontSize: SIZES.h3}}
          placeholder="enter your city, state or zip code"
          placeholderTextColor={COLORS.lightGray2}
        />
        <Image
          source={icons.search}
          style={{width: 30, height: 30, tintColor: COLORS.lightGray2}}
        />
      </View>
    );
  };

  const renderLocationList = () => {
    return (
      <FlatList
        style={{marginTop: SIZES.radius, paddingHorizontal: SIZES.radius}}
        data={dummyData.locations}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              marginBottom: SIZES.radius,
              borderRadius: SIZES.radius * 2,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              backgroundColor: appTheme.cardBackgroundColor,
            }}
            onPress={() =>
              navigation.navigate('Order', {selectedLocation: item})
            }>
            {/*  Name & Bookmark */}
            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 1, color: appTheme.textColor, ...FONTS.h2}}>
                {item.title}
              </Text>
              <Image
                source={item.bookmarked ? icons.bookmarkFilled : icons.bookmark}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: item.bookmarked ? COLORS.red2 : COLORS.white,
                }}
              />
            </View>
            {/*  Name & Bookmark */}

            {/* Address */}
            <View style={{marginTop: SIZES.base, width: '80%'}}>
              <Text
                style={{
                  color: appTheme.textColor,
                  ...FONTS.body3,
                  lineHeight: 21,
                }}>
                {item.address}
              </Text>
            </View>
            {/* Address */}

            {/* Operation Hour */}
            <View style={{marginTop: SIZES.base}}>
              <Text
                style={{
                  color: appTheme.textColor,
                  ...FONTS.body5,
                  lineHeight: 16,
                }}>
                {item.operation_hours}
              </Text>
            </View>
            {/* Operation Hour */}

            {/* Services */}
            <View style={{flexDirection: 'row', marginTop: SIZES.base}}>
              {/* Pick Up */}
              <View
                style={{
                  borderColor: appTheme.textColor,
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingHorizontal: SIZES.radius,
                  paddingVertical: 5,
                }}>
                <Text style={{color: appTheme.textColor, ...FONTS.body3}}>
                  Pick-up
                </Text>
              </View>
              {/* Pick Up */}

              {/* Delivery */}
              <View
                style={{
                  borderColor: appTheme.textColor,
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingHorizontal: SIZES.radius,
                  paddingVertical: 5,
                  marginLeft: 10,
                }}>
                <Text style={{color: appTheme.textColor, ...FONTS.body3}}>
                  Delivery
                </Text>
              </View>
              {/* Delivery */}
            </View>
            {/* Services */}
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      {/* Header */}

      {/* Detail */}
      <View
        style={{
          flex: 1,
          marginTop: -20,
          backgroundColor: appTheme.backgroundColor,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
          padding: SIZES.padding,
        }}>
        {renderTopBarSection()}
        {renderSearchBar()}
        {renderLocationList()}
      </View>
      {/* Detail */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 120,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.radius,
    alignItems: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(Location);
