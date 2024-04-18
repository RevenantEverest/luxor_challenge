"use client"

import type { RootState } from '@@store/index';
import type { LoginFormValues, LoginFormHelpers } from '@@components/Forms/LoginForm';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@@hooks';
import { authActions } from '@@store/actions';
import { Layout, Card, ToastError, ToastSuccess } from '@@components/Common';
import LoginForm from '@@components/Forms/LoginForm';

import * as api from '@@api';

function LoginPage() {

    const auth = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(auth.user) {
            redirect("/");
        }
    }, [auth]);
    
    const onSubmit = async (values: LoginFormValues, helpers: LoginFormHelpers) => {
        const [res, err] = await api.authServices.login(values.email, values.password);

        helpers.setSubmitting(false);

        if(err || !res) {
            toast((t) => (
                <ToastError toast={t} message="Invalid username or password" />
            ));
            helpers.setFieldError("email", "\n");
            helpers.setFieldError("password", "Invalid username or password");
            return console.log(err?.message.toString());
        }

        dispatch(authActions.setAuthUser(res.results));

        toast((t) => (
            <ToastSuccess toast={t} message="Logged in successfully!" />
        ));

        redirect("/");
    };
    
    return(
        <Layout className="h-[100vh]">
            <div className="flex h-full w-full items-center justify-center">
                <div className="w-full md:w-2/6">
                    <Card className="w-full">
                        <LoginForm onSubmit={onSubmit} />
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;