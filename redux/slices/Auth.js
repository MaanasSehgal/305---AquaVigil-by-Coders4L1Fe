import { loginUser } from "@/app/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  type: "",
  user: null,
  open: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(state, actions) {
      state.isLoggedIn = actions.payload.isLoggedIn;
      state.token = actions.payload.token;
      state.type = actions.payload.type;
      state.user = actions.payload.user;
    },
    signOut(state, actions) {
      state.isLoggedIn = false;
      state.token = "";
      state.type = "";
      state.user = null;
    },
    toggleOpen(state, actions) {
      state.open = !state.open
    }
  },
});

export default slice.reducer;

export function UserLogin(formValues) {
  return async (dispatch, getState) => {
    try {
      const { success, user, token, type } = await loginUser(formValues);

      console.log("Auth Reducer Response: ", success, user, token, user.type)

      if (success) {
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: token,
            type: type,
            user: user,
          })
        );

        return { success: true, type: type, token: token, user: user };
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function LogoutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.signOut());
  };
}

export function ToggleOpen() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleOpen())
  }
}
