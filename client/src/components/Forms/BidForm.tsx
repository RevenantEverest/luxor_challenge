"use client"

import type { FormikHelpers } from 'formik';

import { useFormik } from 'formik';
import { FaDollarSign } from 'react-icons/fa6';
import validator from 'validator';

import { TextInput, Button } from '@@components/Common';

export interface BidFormValues {
    price: string
};

export type BidFormHelpers = FormikHelpers<BidFormValues>;

export interface BidFormProps {
    formType: "Create" | "Update",
    initialValues?: BidFormValues,
    onSubmit: (values: BidFormValues, helpers: BidFormHelpers) => void
};

function BidForm(props: BidFormProps) {

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldError,
        isSubmitting,
        values,
        errors
    } = useFormik({
        initialValues: props.initialValues ?? {
            price: ""
        },
        onSubmit: (values: BidFormValues, helpers: BidFormHelpers) => {
            let hasErrors = false;     

            if(!validator.isNumeric(values.price)) {
                hasErrors = true;
                setFieldError("price", "Please enter a valid number");
            }

            if(hasErrors) {
                return helpers.setSubmitting(false);
            }

            return props.onSubmit(values, helpers);
        }
    });

    return(
        <div className="flex w-full">
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="pb-6">
                    <h1 className="text-center font-bold text-3xl">{props.formType} Bid</h1>
                </div>
                <div className="pb-12">
                    <TextInput
                        id="price"
                        name="price"
                        type="text"
                        icon={FaDollarSign}
                        placeholder=""
                        label="Price"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.price}
                        errorMessage={errors.price}
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
                        <p className="font-semibold">{props.formType} Bid</p>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BidForm;