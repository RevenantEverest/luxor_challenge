"use client"

import type { RootState } from '@@store/index';

import { useEffect, useCallback } from 'react';
import { redirect } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@@hooks';
import { authActions } from '@@store/actions';

function AuthVerify() {

    const auth = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    const verify = useCallback(() => {
        if(auth.user && auth.accessToken) {
            const jwtToken = auth.accessToken;
            const decodedJwt = parseJwt(jwtToken.token);

            if(decodedJwt.exp * 1000 < Date.now()) {
                dispatch(authActions.clearAuthUser());
                redirect("/");
            }
        }
    }, [auth.user, auth.accessToken, dispatch]);

    useEffect(() => {
        verify();
    }, [verify]);

    const parseJwt = (token: string) => {
        try {
            return JSON.parse(atob(token.split(".")[1]))
        }
        catch(e) {
            return null;
        }
    };


    return null;
};

export default AuthVerify;