import type { ZodString } from 'zod';

import { z } from 'zod';
import User from '@@entities/User.js';
import { validation } from '@@utils/index.js';

type UserProperties = keyof Pick<User, (
    "email" |
    "password"
)>;

type CreateSchema = Record<UserProperties, ZodString>;

const errorMessages = validation.basicErrorMessages<UserProperties>;

const create = z.object<CreateSchema>({
    email: z.string(errorMessages("email", "string")).email({
        message: "Not a valid email"
    }),
    password: z.string(errorMessages("password", "string")),
});

export default create;