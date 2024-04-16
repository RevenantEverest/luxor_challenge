import type { AuthPayload } from '@@types/auth.js';
import type {
    User,
    Collection
} from '@@entities/index.js';


/**
 * @param T - entity used in route spec setup
 * @param D - optional array of entities that may be needed for specific test scenarios
 */
export interface ExtraParams<T, D, E> {
    entity?: T,
    altAuthPayload?: AuthPayload,
    supportEntities?: D[],
    extras?: E
};

export type AuthExtraParams<T = unknown, D = unknown> = (
    ExtraParams<User, T, D>
);

export type CollectionExtraParams<T = unknown, D = unknown> = (
    ExtraParams<Collection, T, D>
);