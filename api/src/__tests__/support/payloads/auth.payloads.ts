import type { AuthPayload } from '@@types/auth.js';
import { User } from '@@entities/index.js';

export const VALID_CREATE: Record<keyof Pick<User, "email" | "password">, string> = {
    email: "test@example.com",
    password: "myPassword"
};

export const INVALID_CREATE: Record<keyof Pick<User, "email" | "password">, string | number> = {
    email: "notAnEmail",
    password: 1234567890
};

export const MAIN: AuthPayload = {
    id: "2c00407c-6f8b-40c1-801d-818f847f99ad",
    email: "fake@example.com",
    permissions: "USER"
};

export const ALT: AuthPayload = {
    id: "fa89adf7-9c42-43a8-9bd3-27943a57d0e2",
    email: "alt@example.com",
    permissions: "USER"
};