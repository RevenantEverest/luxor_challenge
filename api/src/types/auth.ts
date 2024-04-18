export type AuthPermissions = "ADMINISTRATOR" | "USER";

export interface AuthPayload {
    id: string,
    email: string,
    token?: string,
    exp?: number,
    permissions: AuthPermissions
};