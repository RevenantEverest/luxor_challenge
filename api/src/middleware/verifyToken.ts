import type { Request, Response, NextFunction } from '@@types/express.js';
import type { AuthPayload } from '@@types/auth.js';

import JWT from 'jsonwebtoken';

import { ENV } from '@@constants/index.js';
import { errors } from '@@utils/index.js';

async function verifyToken(req: Request, res: Response<"auth">, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader === 'undefined') {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const bearer: Array<string> = bearerHeader.split(" ");
    const bearerToken: string = bearer[1];

    JWT.verify(bearerToken, ENV.TOKEN_SECRET, (err, authData) => {
        if(err) {
            switch(err.toString()) {
                case "TokenExpiredError: jwt expired":
                    return errors.sendResponse({ 
                        res, 
                        status: 401, 
                        message: "Token Expired"
                    });
                default:
                    return errors.sendResponse({ 
                        res, 
                        err, 
                        status: 401, 
                        message: "Invalid Token" 
                    });
            };
        }

        res.locals.auth = authData as AuthPayload;

        return next();
    });
};

export default verifyToken;