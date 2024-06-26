import { Request, Response } from '@@types/express.js';
import bcrypt from 'bcrypt';

import { z } from 'zod';
import { User } from '@@entities/index.js';
import { userSchemas } from '@@schemas/index.js';

import { entities, errors } from '@@utils/index.js';

export type Body = z.infer<typeof userSchemas.create>;

async function signup(req: Request<Body>, res: Response) {

    const validatedBody = userSchemas.create.safeParse(req.body);

    if(!validatedBody.success) {
        return errors.sendInvalidBody(res, validatedBody.error);
    }

    const [userFind, findErr] = await entities.findOne<User>(User, {
        where: {
            email: req.body.email.toLowerCase()
        }
    });

    if(findErr) {
        return errors.sendResponse({ 
            res, 
            err: findErr, 
            status: 500, 
            message: "Error checking for existing user"
        });
    }

    if(userFind && userFind.email === req.body.email) {
        return errors.sendResponse({
            res, 
            err: findErr, 
            status: 400, 
            message: "User already exists with that email"
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const [user, err] = await entities.insert<User>(User, {
        email: req.body.email.toLowerCase(),
        password: hashedPassword
    });

    if(err || !user) {
        return errors.sendEntitiesResponse<User>({
            res,
            err,
            message: "Unable to register user",
            entity: user,
            missingEntityMessage: "No User Returned"
        });
    }

    return res.sendStatus(200);
};

export default signup;