import type { RootState } from '@@store/index';
import type { CollectionFormHelpers, CollectionFormValues } from '@@components/Forms/CollectionForm';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '@@hooks';

import { Button, Modal, ToastSuccess, ToastError } from '@@components/Common';
import CollectionForm from '@@components/Forms/CollectionForm';

import * as api from '@@api';

export interface CreateCollectionProps {
    className?: string,
    fetchCollections: () => void
};

function CreateCollection({ className="", fetchCollections }: CreateCollectionProps) {

    const auth = useAppSelector((state: RootState) => state.auth);
    const [visible, setVisible] = useState(false);

    const onSubmit = async (values: CollectionFormValues, helpers: CollectionFormHelpers) => {
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
                    <CollectionForm formType="Create" onSubmit={onSubmit} />
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default CreateCollection;