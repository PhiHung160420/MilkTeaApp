import {darkTheme, lightTheme} from '../constants';
import {
  TOOGLE_THEME_BEGIN,
  TOOGLE_THEME_SUCCESS,
  TOOGLE_THEME_FAILURE,
} from './actionTypes';

export const toggleThemeBegin = () => {
  return {
    type: TOOGLE_THEME_BEGIN,
  };
};

export const toggleThemeSuccess = selectedTheme => {
  return {
    type: TOOGLE_THEME_SUCCESS,
    payload: selectedTheme,
  };
};

export const toggleThemeFailure = error => {
  return {
    type: TOOGLE_THEME_FAILURE,
    payload: error,
  };
};

export const toogleTheme = themeType => {
  return dispatch => {
    dispatch(toggleThemeBegin());
    switch (themeType) {
      case 'dark':
        dispatch(toggleThemeSuccess(darkTheme));
        break;
      case 'light':
        dispatch(toggleThemeSuccess(lightTheme));
        break;
      default:
        dispatch(toggleThemeFailure('invalid theme style'));
        break;
    }
  };
};
