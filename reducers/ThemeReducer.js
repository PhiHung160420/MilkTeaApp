import * as ThemeAction from '../actions/ThemeAction';
import {selectedTheme} from '../constants/index';
import {
  TOOGLE_THEME_BEGIN,
  TOOGLE_THEME_SUCCESS,
  TOOGLE_THEME_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  appTheme: selectedTheme,
  error: null,
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOOGLE_THEME_BEGIN:
      return {
        ...state,
        error: null,
      };
    case TOOGLE_THEME_SUCCESS:
      return {
        ...state,
        appTheme: action.payload,
      };
    case TOOGLE_THEME_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default ThemeReducer;
