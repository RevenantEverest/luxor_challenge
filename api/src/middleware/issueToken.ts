import type { Response } from '@@types/express.js';
import type { AuthPayload } from '@@types/auth.js';

import JWT from 'jsonwebtoken';
import { ENV } from '@@constants/index.js';

async function issueToken(res: Response, payload: AuthPayload) {

    const options = {
        expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) // Current time in seconds + 1 hour
    };

    const token = JWT.sign(payload, ENV.TOKEN_SECRET, options);

    payload.token = token;
    payload.exp = options.expiresIn;

    return res.json({ results: payload });
};

export default issueToken;