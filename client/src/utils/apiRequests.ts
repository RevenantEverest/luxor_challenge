import axios from 'axios';
import type { AxiosResponse } from 'axios';

import type { HandleAxiosReturn } from '@@types/promises';
import type { 
    AxiosApiResponse, 
    RequestMethods, 
    RequestParams, 
    CommonRequestParams, 
    AxiosPaginatedApiResponse,
    ApiPaginatedResponse
} from '@@types/api';

import * as promises from './promises';
import * as authTokenUtils from './authToken';

export type ApiResponse<T> = AxiosApiResponse<T>;

export function generateRequest<T>(method: RequestMethods, endpoint: string, data?: T, authToken?: string) {
    const token = authTokenUtils.getToken();
    const authHeaders = {
        Authorization: `Bearer ${authToken ?? token.token}`
    };

    const headers = {
        ...((token || authToken) && authHeaders),
        ...((data && data instanceof FormData) && { "Content-Type": "multipart/form-data" })
    };

    const request = axios({ url: endpoint, method, data, headers });

    return request;
};

export async function noResponseRequest<T>({ method, endpoint, data }: RequestParams<T>): Promise<HandleAxiosReturn<boolean>> {
    const request = generateRequest(method, endpoint, data);

    const [_, err] = await promises.handleApi<AxiosResponse<unknown>>(request);

    if(err) {
        return [undefined, err];
    }

    return [true, undefined];
};

export async function paginatedRequest<T>({ method, endpoint }: CommonRequestParams): Promise<HandleAxiosReturn<ApiPaginatedResponse<T>>> {
    const request = generateRequest(method, endpoint);

    const [res, err] = await promises.handleApi<AxiosPaginatedApiResponse<T>>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data, undefined];
};

export async function request<T, D = void>({ method, endpoint, data, authToken }: RequestParams<D>): Promise<HandleAxiosReturn<T>> {
    const request = generateRequest(method, endpoint, data, authToken);

    const [res, err] = await promises.handleApi<ApiResponse<T>>(request);

    if(err) {
        /* Attempt to refresh token */
        // if(err.status === 401) {
        //     return;
        // }
        return [undefined, err];
    }

    return [res?.data, undefined];
};