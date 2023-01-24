import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authenticationState {
  isAuthenticated: boolean;
  authLoading: boolean;
  userInfo: {
    localId: string | null;
    idToken: string | null;
  };
  authenticationReqError: null | string;
}

const initialAuthenticationState: authenticationState = {
  isAuthenticated: false,
  authLoading: false,
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

export const { logIn, logOut, setUserCredentials } = counterSlice.actions;

export default counterSlice.reducer;
