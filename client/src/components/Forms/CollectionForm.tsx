"use client"

import type { FormikHelpers } from 'formik';

import { useFormik } from 'formik';
import { FaDollarSign } from 'react-icons/fa6';
import validator from 'validator';

import { TextInput, TextArea, Button } from '@@components/Common';

export interface CollectionFormValues {
    name: string,
    description: string,
    stocks: string,
    price: string
};

export type CollectionFormHelpers = FormikHelpers<CollectionFormValues>;

export interface CollectionFormProps {
    formType: "Create" | "Update",
    initialValues?: CollectionFormValues,
    onSubmit: (values: CollectionFormValues, helpers: CollectionFormHelpers) => void
};

function CollectionForm(props: CollectionFormProps) {

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
            name: "",
            description: "",
            stocks: "",
            price: ""
        },
        onSubmit: (values: CollectionFormValues, helpers: CollectionFormHelpers) => {
            let hasErrors = false;     
            
            if(values.description.length < 10) {
                hasErrors = true;
                setFieldError("description", "Please add more content to your description");
            }

            if(!validator.isNumeric(values.stocks)) {
                hasErrors = true;
                setFieldError("stocks", "Please enter a valid number");
            }

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
                    <h1 className="text-center font-bold text-3xl">{props.formType} Collection</h1>
                </div>
                <div className="pb-6">
                    <TextInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder="My New Collection"
                        label="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        errorMessage={errors.name}
                        required={true}
                    />
                </div>
                <div className="pb-12">
                    <TextArea
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Collection description..."
                        label="Description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        errorMessage={errors.description}
                        required={true}
                    />
                </div>
                <div className="pb-12 flex gap-6">
                    <div className="flex-1">
                        <TextInput
                            id="stocks"
                            name="stocks"
                            type="text"
                            placeholder="0"
                            label="Stock Amount"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.stocks}
                            errorMessage={errors.stocks}
                            required={true}
                        />
                    </div>
                    <div className="flex-1">
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
                        <p className="font-semibold">{props.formType} Collection</p>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CollectionForm;