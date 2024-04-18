import type { ApiPaginatedResponse, ApiResponse, ApiPaginationParams } from '@@types/api';
import type { HandleAxiosReturn } from '@@types/promises';
import type { Bid, BidCreate } from '@@types/entities/Bid';

import { ENV } from '@@constants';
import { apiRequests } from '@@utils';

type PaginatedResponse = HandleAxiosReturn<ApiPaginatedResponse<Bid>>;

const baseEndpoint = ENV.API_URL + "/collections";

export function getByCollectionId(collectionId: string, params: ApiPaginationParams): Promise<PaginatedResponse> {
    const endpoint = `${baseEndpoint}/id/${collectionId}/bids?page=${params.page ?? 1}`;
    return apiRequests.paginatedRequest<Bid>({
        endpoint,
        method: "get"
    });
};

export function create(collectionId: string, data: BidCreate, authToken: string): Promise<HandleAxiosReturn<ApiResponse<Bid>>> {
    const endpoint = `${baseEndpoint}/id/${collectionId}/bids`;
    return apiRequests.request<Bid, BidCreate>({
        endpoint,
        method: "post",
        authToken,
        data
    });
};

export function update(collectionId: string, bidId: string, data: BidCreate, authToken: string): Promise<HandleAxiosReturn<ApiResponse<Bid>>> {
    const endpoint = `${baseEndpoint}/id/${collectionId}/bids/id/${bidId}`;
    return apiRequests.request<Bid, BidCreate>({
        endpoint,
        method: "put",
        authToken,
        data
    });
};

export function acceptBid(collectionId: string, bidId: string, authToken: string): Promise<HandleAxiosReturn<ApiResponse<Bid>>> {
    const endpoint = `${baseEndpoint}/id/${collectionId}/bids/id/${bidId}/${bidId}/accept`;
    return apiRequests.request<Bid, BidCreate>({
        endpoint,
        method: "post",
        authToken
    });
};