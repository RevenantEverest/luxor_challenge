import axios from 'axios';
import type { AxiosResponse } from 'axios';

import type { HandleAxiosReturn } from '@@types/promises';
import type { 
    AxiosApiResponse, 
    RequestMethods, 
    RequestParams, 
    CommonRequestParams, 
    AxiosPaginatedApiResponse,
    ApiPaginatedResponse,
    ApiResponse
} from '@@types/api';

import * as promises from './promises';

export type RequestReturn<T> = HandleAxiosReturn<ApiResponse<T>>;
export type PaginatedRequestReturn<T> = HandleAxiosReturn<ApiPaginatedResponse<T>>;

export function generateRequest<T>(method: RequestMethods, endpoint: string, data?: T, authToken?: string) {
    const authHeaders = {
        Authorization: `Bearer ${authToken}`
    };

    const headers = {
        ...((authToken) && authHeaders),
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

export async function paginatedRequest<T>({ method, endpoint }: CommonRequestParams): Promise<PaginatedRequestReturn<T>> {
    const request = generateRequest(method, endpoint);

    const [res, err] = await promises.handleApi<AxiosPaginatedApiResponse<T>>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data, undefined];
};

export async function request<T, D = void>({ method, endpoint, data, authToken }: RequestParams<D>): Promise<RequestReturn<T>> {
    const request = generateRequest(method, endpoint, data, authToken);

    const [res, err] = await promises.handleApi<AxiosApiResponse<T>>(request);

    if(err) {
        return [undefined, err];
    }

    return [res?.data, undefined];
};