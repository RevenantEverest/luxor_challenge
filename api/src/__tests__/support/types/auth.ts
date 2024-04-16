import { AuthPayload } from '@@types/auth.js';

export interface AuthTestingPayload extends AuthPayload {
    bearerToken: string
};