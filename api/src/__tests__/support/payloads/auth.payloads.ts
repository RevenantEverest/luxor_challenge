import { User } from '@@entities/index.js';

export const VALID_CREATE: Record<keyof Pick<User, "email" | "password">, string> = {
    email: "test@example.com",
    password: "myPassword"
};

export const INVALID_CREATE: Record<keyof Pick<User, "email" | "password">, string | number> = {
    email: "notAnEmail",
    password: 1234567890
};