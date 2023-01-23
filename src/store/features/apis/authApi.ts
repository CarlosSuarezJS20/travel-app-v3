import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../../../apiKey/apiKey";
import { RootState } from "../../store";

// Types
export interface UserResponse {
  localId: string;
  idToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

type error = {
  data: { error: { code: number; message: string } };
  status?: string;
};

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://identitytoolkit.googleapis.com/v1/",
    prepareHeaders: (headers, { getState }) => {
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
        url: `accounts:signInWithPassword?key=${API_KEY}`,
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response: unknown) => {
        const error = response as error;
        if (error.status === "FETCH_ERROR") {
          return error.status;
        }
        return error.data.error.message;
      },
    }),
    signUp: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: `accounts:signUp?key=${API_KEY}`,
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response: unknown) => {
        const error = response as error;
        if (error.status === "FETCH_ERROR") {
          return error.status;
        }
        return error.data.error.message;
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
