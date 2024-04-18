import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthPayload, AccessToken } from '@@types/auth';

export type UserState = Record<keyof Pick<AuthPayload, "id" | "email" | "permissions">, string>;
export interface AuthState {
    user?: UserState,
    accessToken?: AccessToken
};

const initialState: AuthState = {};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action: PayloadAction<AuthPayload>) => {
            state.user = {
                id: action.payload.id,
                email: action.payload.email,
                permissions: action.payload.permissions
            };
            state.accessToken = {
                token: action.payload.token,
                exp: action.payload.exp
            };
        },
        clearAuthUser: (state) => {
            state.user = undefined;
            state.accessToken = undefined;
        }
    }
});

export const { actions } = authSlice;
export default authSlice.reducer;