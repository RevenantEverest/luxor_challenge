import type { HandleAxiosReturn } from '@@types/promises';
import type { AuthPayload } from '@@types/auth';
import type { ApiResponse } from '@@types/api';

import { ENV } from '@@constants';
import { apiRequests } from '@@utils';

const baseEndpoint = ENV.API_URL + "/auth";

export function login(email: string, password: string): Promise<HandleAxiosReturn<ApiResponse<AuthPayload>>> {
    const endpoint = `${baseEndpoint}/login`;
    return apiRequests.request({
        endpoint,
        method: "post",
        data: {
            email, password
        }
    });
};

export function signup(email: string, password: string): Promise<HandleAxiosReturn<unknown>> {
    const endpoint = `${baseEndpoint}/signup`;
    return apiRequests.request({
        endpoint,
        method: "post",
        data: {
            email, password
        }
    });
};