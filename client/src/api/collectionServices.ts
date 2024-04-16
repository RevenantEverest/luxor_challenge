import type { ApiPaginatedResponse, ApiRequestOptions, ApiPaginationParams } from '@@types/api';
import type { HandleAxiosReturn } from '@@types/promises';
import type { Collection } from '@@types/entities/Collection';

import { ENV } from '@@constants';
import { apiRequests } from '@@utils';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<Collection>>;

const baseEndpoint = ENV.API_URL + "/collections";

export function index(params: ApiPaginationParams): Promise<PaginatedResponse> {
    const endpoint = `${baseEndpoint}?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest<Collection>({
        endpoint,
        method: "get"
    });
};