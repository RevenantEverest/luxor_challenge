import type { ZodString } from 'zod';

import { z } from 'zod';
import User from '@@entities/User.js';
import { validation } from '@@utils/index.js';

type UserProperties = keyof Pick<User, (
    "email"
)>;

type UpdateEmailSchema = Record<UserProperties, ZodString>;

const errorMessages = validation.basicErrorMessages<UserProperties>;

const updateEmail = z.object<UpdateEmailSchema>({
    email: z.string(errorMessages("email", "string")).email({
        message: "Not a valid email"
    })
});

export default updateEmail;