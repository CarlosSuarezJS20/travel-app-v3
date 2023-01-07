import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// Types
export interface UserResponse {
  user: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export const authApi: any = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://identitytoolkit.ggleapis.com/v1/",
    prepareHeaders: (headers, { getState }: any) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).autheticationReducer.userInfo
        .idToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "accounts:signInWithPassword?key=AIzaSyAsm2AajbLjNnGdo4cb7pVXXfaxVkt-GKs",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
