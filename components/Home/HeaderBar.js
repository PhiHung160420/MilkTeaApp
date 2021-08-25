import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {toogleTheme} from '../../actions/ThemeAction';
import {SIZES, COLORS, FONTS, icons} from '../../constants';

const HeaderBar = ({appTheme, toogleTheme}) => {
  const toogleThemeHandler = () => {
    if (appTheme.name === 'dark') {
      toogleTheme('light');
    } else {
      toogleTheme('dark');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingStyle}>
        <Text style={styles.textName}>Wendy,</Text>
        <Text style={styles.textTitle}>Welcome back,</Text>
      </View>

      <TouchableOpacity
        style={styles.btnTheme}
        onPress={() => toogleThemeHandler()}>
        {/* Sun */}
        <View
          style={[
            styles.sunnyIconStyle,
            appTheme.name === 'light' ? styles.selectedLightModeStyled : {},
          ]}>
          <Image style={styles.sunnyIcon} source={icons.sunny} />
        </View>

        {/* Dark */}
        <View
          style={[
            styles.nightIconStyle,
            appTheme.name === 'dark' ? styles.selectedNightModeStyled : {},
          ]}>
          <Image style={styles.nightIcon} source={icons.night} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.purple,
    flexDirection: 'row',
  },
  greetingStyle: {
    flex: 1,
    paddingLeft: SIZES.padding,
  },
  textName: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  textTitle: {
    color: COLORS.white,
    ...FONTS.h2,
  },
  btnTheme: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPurple,
  },
  sunnyIconStyle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nightIconStyle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunnyIcon: {
    width: 30,
    height: 30,
    tintColor: COLORS.white,
  },
  nightIcon: {
    width: 30,
    height: 30,
    tintColor: COLORS.white,
  },
  selectedNightModeStyled: {
    borderRadius: 20,
    backgroundColor: COLORS.black,
  },
  selectedLightModeStyled: {
    borderRadius: 20,
    backgroundColor: COLORS.yellow,
  },
});

const mapStateToProps = state => {
  return {
    appTheme: state.ThemeReducer.appTheme,
    error: state.ThemeReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toogleTheme: ThemeType => {
      dispatch(toogleTheme(ThemeType));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderBar);
