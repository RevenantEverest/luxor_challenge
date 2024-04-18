import { User } from '@@entities/index.js';
import { faker } from '@faker-js/faker';

export type UserFactory = Record<keyof Pick<User, (
    "email" |
    "password"
)>, string>;

function UserFactory(): UserFactory {
    const user: UserFactory = {
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    return user;
};

export default UserFactory;