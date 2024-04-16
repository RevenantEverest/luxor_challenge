import type { ZodString } from 'zod';

import { z } from 'zod';
import User from '@@entities/User.js';
import { validation } from '@@utils/index.js';

type UserProperties = keyof Pick<User, (
    "password"
)>;

type UpdatePasswordSchema = Record<UserProperties, ZodString>;

const errorMessages = validation.basicErrorMessages<UserProperties>;

const updatePassword = z.object<UpdatePasswordSchema>({
    password: z.string(errorMessages("password", "string"))
});

export default updatePassword;