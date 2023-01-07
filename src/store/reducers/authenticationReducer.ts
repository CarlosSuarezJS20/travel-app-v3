import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authenticationState {
  isAuthenticated: boolean;
  userInfo: {
    localId: string | null;
    idToken: string | null;
  };
  authenticationReqError: null | string;
}

const initialAuthenticationState: authenticationState = {
  isAuthenticated: false,
  userInfo: {
    localId: null,
    idToken: null,
  },
  authenticationReqError: null,
};

export const counterSlice = createSlice({
  name: "authentication",
  initialState: initialAuthenticationState,
  reducers: {
    logIn: (state) => {
      state.isAuthenticated = true;
    },
    // created this to help deal with error from logIn call
    autheticationReqError: (state, action) => {
      console.log(action.payload.error);
      state.authenticationReqError = action.payload.error;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
    },
    setUserCredentials: (
      state,
      {
        payload: { localId, idToken },
      }: PayloadAction<{ localId: string | null; idToken: string | null }>
    ) => {
      state.userInfo.localId = localId;
      state.userInfo.idToken = idToken;
    },
  },
});

export const { logIn, logOut, setUserCredentials, autheticationReqError } =
  counterSlice.actions;

export default counterSlice.reducer;
