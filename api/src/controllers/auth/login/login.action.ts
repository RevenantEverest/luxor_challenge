import type { Request, Response } from '@@types/express.js';
import bcrypt from 'bcrypt';

import { z } from 'zod';
import { User } from '@@entities/index.js';
import { userSchemas } from '@@schemas/index.js';
import { issueToken } from '@@middleware/index.js';

import { entities, errors } from '@@utils/index.js';

export type Body = z.infer<typeof userSchemas.create>;

async function login(req: Request<Body>, res: Response) {

    const validatedBody = userSchemas.create.safeParse(req.body);

    if(!validatedBody.success) {
        return errors.sendInvalidBody(res, validatedBody.error);
    }

    const [user, err] = await entities.findOne<User>(User, {
        where: {
            email: req.body.email.toLowerCase()
        },

    });

    if(err || !user) {
        return errors.sendEntitiesResponse<User>({
            res,
            err,
            message: "Invalid Email or Password", // Ambiguous message intentional for security
            entity: user,
            missingEntityMessage: "Invalid Email or Password" // Ambiguous message intentional for security
        });
    }

    const hasCorrectPassword = await bcrypt.compare(req.body.password, user.password);

    if(!hasCorrectPassword) {
        return errors.sendResponse({ res, status: 401, message: "Invalid Email or Password" });
    }

    /* 
        Don't send hashed user password as payload
    */
    return issueToken(res, {
        id: user.id,
        email: user.email,
        permissions: "USER"
    });
};

export default login;