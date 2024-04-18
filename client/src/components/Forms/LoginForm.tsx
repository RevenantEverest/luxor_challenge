"use client"

import type { FormikHelpers } from 'formik';

import { useFormik } from 'formik';
import { FaUser, FaLock } from 'react-icons/fa6';

import { TextInput, Button } from '@@components/Common';
import Link from 'next/link';

export interface LoginFormValues {
    email: string,
    password: string
};

export type LoginFormHelpers = FormikHelpers<LoginFormValues>;

export interface LoginFormProps {
    onSubmit: (values: LoginFormValues, helpers: LoginFormHelpers) => void
};

function LoginForm(props: LoginFormProps) {

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        errors
    } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values: LoginFormValues, helpers: LoginFormHelpers) => {
            return props.onSubmit(values, helpers);
        }
    });

    return(
        <div className="flex">
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="pb-6">
                    <h1 className="text-center font-bold text-3xl">Login</h1>
                </div>
                <div className="pb-6">
                    <TextInput
                        id="email"
                        name="email"
                        type="text"
                        icon={FaUser}
                        placeholder="example@example.com"
                        label="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        errorMessage={errors.email}
                        required={true}
                    />
                </div>
                <div className="pb-12">
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        icon={FaLock}
                        placeholder="●●●●●●●●●●"
                        label="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        errorMessage={errors.password}
                        required={true}
                    />
                </div>
                <div className="pb-4">
                    <Button
                        className="w-full"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        onClick={() => handleSubmit}
                    >
                        <p className="font-semibold">Login</p>
                    </Button>
                </div>
                <div>
                    <div className="flex gap-2 text-muted">
                        <p>Don&apos;t have an account?</p>
                        <Link href="/signup" className="text-primary">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;