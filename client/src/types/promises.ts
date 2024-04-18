import type { AxiosApiError } from './api';

export type HandleReturn<T> = [T | null | undefined, Error | undefined];
export type HandleAxiosReturn<T> = [T | undefined, AxiosApiError | undefined];