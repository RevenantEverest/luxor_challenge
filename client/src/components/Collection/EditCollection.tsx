import type { RootState } from '@@store/index';
import type { Collection } from '@@types/entities/Collection';
import type { CollectionFormHelpers, CollectionFormValues } from '@@components/Forms/CollectionForm';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '@@hooks';

import { Button, Modal, ToastSuccess, ToastError } from '@@components/Common';
import CollectionForm from '@@components/Forms/CollectionForm';

import * as api from '@@api';

export interface UpdateCollectionProps {
    className?: string,
    collection: Collection, 
    fetchCollections: () => void
};

function EditCollection({ className="", collection, fetchCollections }: UpdateCollectionProps) {

    const auth = useAppSelector((state: RootState) => state.auth);
    const [visible, setVisible] = useState(false);

    const onSubmit = async (values: CollectionFormValues, helpers: CollectionFormHelpers) => {
        if(!auth.accessToken) {
            return;
        }

        const [res, err] = await api.collectionServices.update(collection.id.toString(), values, auth.accessToken.token);

        helpers.setSubmitting(false);

        if(err || !res) {
            toast((t) => (
                <ToastError toast={t} message="Unable to update Collection" />
            ));
            return console.log(err?.message.toString());
        }

        toast((t) => (
            <ToastSuccess toast={t} message="Collection updated successfully!" />
        ));

        fetchCollections();
        setVisible(false);
    };

    return(
        <React.Fragment>
            <Button className={`px-4 ${className}`} size="sm" onClick={() => setVisible(true)}>
                <p className="font-semibold">Edit</p>
            </Button>
            <Modal motionKey={`create-collection-modal`} visible={visible} setVisible={setVisible}>
                <div className="flex flex-col gap-5 justify-center">
                    <CollectionForm 
                        formType="Update" 
                        initialValues={{
                            name: collection.name,
                            description: collection.description,
                            stocks: collection.stocks.toString(),
                            price: collection.stocks.toString()
                        }}
                        onSubmit={onSubmit}
                    />
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default EditCollection;