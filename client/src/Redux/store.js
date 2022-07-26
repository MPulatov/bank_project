import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userLoginReduser } from "../Redux/reducers/userLoginReducers";
import { userRegisterationReduser } from "../Redux/reducers/userRegisterReducers";

const reducer = combineReducers({
  userLogin: userLoginReduser,
  userRegister: userRegisterationReduser,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);
