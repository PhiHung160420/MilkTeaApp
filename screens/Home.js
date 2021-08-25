import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {HeaderBar, Rewards, Promo} from '../components/index';
import {connect} from 'react-redux';
import {COLORS, SIZES, FONTS, icons, constants} from '../constants/index';

const Home = ({navigation, appTheme}) => {
  return (
    <View style={styles.container}>
      <HeaderBar />

      <ScrollView
        style={[
          styles.contentContainer,
          {backgroundColor: appTheme && appTheme.backgroundColor},
        ]}
        contentContainerStyle={{paddingBottom: 150}}>
        {/* Rewards */}
        <Rewards />
        {/* Rewards */}

        {/* Promo */}
        <Promo />
        {/* Promo */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'red',
    marginTop: -30,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
