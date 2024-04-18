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

export interface ApiErrorResponse {
    error: boolean,
    message: string,
    issues: unknown
};

export interface ApiResponse<T> {
    results: T
};

export interface ApiPaginatedResponse<T> {
    count: number,
    next: string | null,
    previous: string | null,
    results: T[]
};

export interface ApiPaginationParams {
    page?: number
};

export type AxiosApiResponse<T> = AxiosResponse<ApiResponse<T>>;
export type AxiosPaginatedApiResponse<T> = AxiosResponse<ApiPaginatedResponse<T>>;
export type AxiosApiError = AxiosError<ApiErrorResponse>;
