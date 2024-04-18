import type { ApiPaginatedResponse, ApiResponse, ApiPaginationParams } from '@@types/api';
import type { HandleAxiosReturn } from '@@types/promises';
import type { Collection, CollectionCreate } from '@@types/entities/Collection';

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

export function create(data: CollectionCreate, authToken: string): Promise<HandleAxiosReturn<ApiResponse<Collection>>> {
    const endpoint = baseEndpoint;
    return apiRequests.request<Collection, CollectionCreate>({
        endpoint,
        method: "post",
        authToken,
        data
    });
};

export function update(collectionId: string, data: CollectionCreate, authToken: string): Promise<HandleAxiosReturn<ApiResponse<Collection>>> {
    const endpoint = `${baseEndpoint}/id/${collectionId}`;
    return apiRequests.request<Collection, CollectionCreate>({
        endpoint,
        method: "put",
        authToken,
        data
    });
};