"use client"

import type { FormikHelpers } from 'formik';

import { useFormik } from 'formik';
import { FaUser, FaLock } from 'react-icons/fa6';

import { TextInput, Button } from '@@components/Common';
import Link from 'next/link';

export interface SignUpFormValues {
    email: string,
    password: string
};

export type SignUpFormHelpers = FormikHelpers<SignUpFormValues>;

export interface SignUpFormProps {
    onSubmit: (values: SignUpFormValues, helpers: SignUpFormHelpers) => void
};

function SignUpForm(props: SignUpFormProps) {

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
        onSubmit: (values: SignUpFormValues, helpers: SignUpFormHelpers) => {
            return props.onSubmit(values, helpers);
        }
    });

    return(
        <div className="flex">
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="pb-6">
                    <h1 className="text-center font-bold text-3xl">Sign Up</h1>
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
                        <p className="font-semibold">Sign Up</p>
                    </Button>
                </div>
                <div>
                    <div className="flex gap-2 text-muted">
                        <p>Already have an account?</p>
                        <Link href="/login" className="text-primary">
                            Login
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;