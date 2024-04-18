"use client"

import type { SignUpFormValues, SignUpFormHelpers } from '@@components/Forms/SignUpForm';

import { redirect } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { Layout, Card, ToastError, ToastSuccess } from '@@components/Common';
import SignUpForm from '@@components/Forms/SignUpForm';

import * as api from '../../api';

function SignUpPage() {
    
    const onSubmit = async (values: SignUpFormValues, helpers: SignUpFormHelpers) => {
        const [res, err] = await api.authServices.signup(values.email, values.password);

        helpers.setSubmitting(false);

        if(err || !res) {
            toast((t) => (
                <ToastError toast={t} message="Unable to sign up" />
            ));
            return console.error(err);
        }

        toast((t) => (
            <ToastSuccess toast={t} message="Successfully signed up!" />
        ));

        redirect("/login");
    };
    
    return(
        <Layout className="h-[100vh]">
            <div className="flex h-full w-full items-center justify-center">
                <div className="w-full md:w-2/6">
                    <Card className="w-full">
                        <SignUpForm onSubmit={onSubmit} />
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default SignUpPage;