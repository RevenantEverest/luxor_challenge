import type { AxiosError, AxiosResponse } from 'axios';

export type RequestMethods = "get" | "post" | "put" | "patch" | "delete";

export interface CommonRequestParams {
    endpoint: string,
    method: RequestMethods,
    authToken?: string
};

export interface RequestParams<T> extends CommonRequestParams {
    data?: T
};

export type ApiRequestOptions = Partial<CommonRequestParams>;

export interface ApiPaginatedResponse<T> {
    count: number,
    next: string | null,
    previous: string | null,
    results: T[]
};

export interface ApiPaginationParams {
    page?: number
};

export interface ApiErrorResponse {
    error: boolean,
    message: string
};

export interface ApiResponse<T> {
    results: T
};

export type AxiosApiResponse<T> = AxiosResponse<T>;
export type AxiosApiError = AxiosError<ApiErrorResponse>;
export type AxiosPaginatedApiResponse<T> = AxiosResponse<ApiPaginatedResponse<T>>;
