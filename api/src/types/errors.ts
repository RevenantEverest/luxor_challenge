import type { Response, NextFunction } from 'express';
import type { ZodIssue } from 'zod';

export interface SendResponseOptions {
    res: Response,
    next?: NextFunction,
    err?: Error,
    status?: 400 | 401 | 403 | 404 | 500,
    message?: string,
    issues?: ZodIssue[]
};

export interface ErrorLogOptions {
    color: string | number,
    message?: string,
    err?: Error 
};

export interface HandleTupleOptions<T> {
    res: T | undefined,
    err: Error | undefined,
    errMsg: string
};

export interface SendEntitiesResponseParams<T> {
    res: Response,
    err?: Error,
    message: string,
    entity?: T | null,
    missingEntityMessage: string
};