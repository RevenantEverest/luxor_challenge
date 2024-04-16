import dayjs from 'dayjs';

export interface AuthToken {
    token: string,
    refreshToken: string,
    exp: number
};

export interface StoreTokenParams {
    token: string,
    exp: number,
    refreshToken: string,
};

const LOCAL_STORAGE_TOKEN_KEY = "token";
const LOCAL_STORAGE_TOKEN_EXP_KEY = "tokenExp";
const LOCAL_STORAGE_REFRESH_TOKEN_KEY = "refreshToken";

export function storeToken({ token, exp, refreshToken }: StoreTokenParams) {
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    window.localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, refreshToken);
    window.localStorage.setItem(LOCAL_STORAGE_TOKEN_EXP_KEY, exp.toString());
};

export function clearToken() {
    window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_EXP_KEY);
    window.localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export function getToken(): AuthToken {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ?? "";
    const exp = Number(window.localStorage.getItem(LOCAL_STORAGE_TOKEN_EXP_KEY)) ?? 0;

    const refreshToken = window.localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY) ?? "";

    return { token, refreshToken, exp };
};

export function isValidToken(): boolean {
    const token = getToken();

    const now = dayjs();
    const tokenExpDate = dayjs(token.exp * 1000);

    return now.isAfter(tokenExpDate);
};