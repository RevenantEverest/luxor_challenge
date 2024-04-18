import type { RootState } from '@@store/index';
import type { CreateCollectionFormHelpers, CreateCollectionFormValues } from '@@components/Forms/CreateCollectionForm';

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '@@hooks';

import { Card, Layout, Button, Modal, ToastSuccess, ToastError } from '@@components/Common';
import CreateCollectionForm from '@@components/Forms/CreateCollectionForm';

import * as api from '@@api';

export interface CreateCollectionProps {
    className?: string,
    fetchCollections: () => void
};

function CreateCollection({ className="", fetchCollections }: CreateCollectionProps) {

    const auth = useAppSelector((state: RootState) => state.auth);
    const [visible, setVisible] = useState(false);

    const onSubmit = async (values: CreateCollectionFormValues, helpers: CreateCollectionFormHelpers) => {
        if(!auth.accessToken) {
            return;
        }

        const [res, err] = await api.collectionServices.create(values, auth.accessToken.token);

        helpers.setSubmitting(false);

        if(err || !res) {
            toast((t) => (
                <ToastError toast={t} message="Unable to create Collection" />
            ));
            return console.log(err?.message.toString());
        }

        toast((t) => (
            <ToastSuccess toast={t} message="Collection created successfully!" />
        ));

        fetchCollections();
        setVisible(false);
    };

    return(
        <React.Fragment>
            <Button className={`px-4 ${className}`} size="sm" onClick={() => setVisible(true)}>
                <p className="font-semibold">Create Collection</p>
            </Button>
            <Modal motionKey={`create-collection-modal`} visible={visible} setVisible={setVisible}>
                <div className="flex flex-col gap-5 justify-center">
                    <CreateCollectionForm onSubmit={onSubmit} />
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default CreateCollection;