import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_RESGISTER_SUCCESS,
} from "../constants/userConstants";

export const userRegisterationReduser = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_RESGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
