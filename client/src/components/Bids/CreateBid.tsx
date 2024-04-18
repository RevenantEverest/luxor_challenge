import type { RootState } from '@@store/index';
import type { Collection } from '@@types/entities/Collection';
import type { BidFormHelpers, BidFormValues } from '@@components/Forms/BidForm';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '@@hooks';

import { Button, Modal, ToastSuccess, ToastError } from '@@components/Common';
import BidForm from '@@components/Forms/BidForm';

import * as api from '@@api';

export interface CreateBidProps {
    collection: Collection
};

function CreateBid({ collection }: CreateBidProps) {

    const auth = useAppSelector((state: RootState) => state.auth);
    const [visible, setVisible] = useState(false);

    const onSubmit = async (values: BidFormValues, helpers: BidFormHelpers) => {
        if(!auth.accessToken) {
            return;
        }

        const [res, err] = await api.bidServices.create(collection.id.toString(), values, auth.accessToken.token);

        helpers.setSubmitting(false);

        if(err || !res) {
            toast((t) => (
                <ToastError toast={t} message="Unable to create Bid" />
            ));
            return console.log(err?.message.toString());
        }

        toast((t) => (
            <ToastSuccess toast={t} message="Bid created successfully!" />
        ));

        setVisible(false);
    };

    return(
        <React.Fragment>
            <Button color="gradient" className="w-20" size="sm" onClick={() =>  setVisible(true)}>
                <p className="font-semibold">Bid</p>
            </Button>
            <Modal motionKey={`create-bid-modal`} visible={visible} setVisible={setVisible}>
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <BidForm formType="Create" onSubmit={onSubmit} />
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default CreateBid;