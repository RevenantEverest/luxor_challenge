import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@@types/api';
import type { HandleReturn, HandleAxiosReturn } from '@@types/promises';

export async function handle<T>(promise: Promise<T>): Promise<HandleReturn<T>> {
    return promise
    .then((results: T) => {
        return [results, undefined] as [T, undefined];
    })
    .catch((err: Error) => {
        return [undefined, err]
    });
};

export async function handleApi<T>(promise: Promise<T>): Promise<HandleAxiosReturn<T>> {
    try {
        const results = await promise;
        return [results, undefined];
    }
    catch(err) {
        const error = err as AxiosError<ApiErrorResponse>;
        return [undefined, error];
    }
};