import type { RootState } from '@@store/index';
import type { Collection } from '@@types/entities/Collection';
import type { Bid } from '@@types/entities/Bid';
import type { BidFormHelpers, BidFormValues } from '@@components/Forms/BidForm';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '@@hooks';

import { Button, Modal, ToastSuccess, ToastError } from '@@components/Common';
import BidForm from '@@components/Forms/BidForm';

import * as api from '@@api';

export interface CreateBidProps {
    collection: Collection,
    bid: Bid,
    fetchBids: (collectionId: string) => void
};

function CreateBid({ collection, bid, fetchBids }: CreateBidProps) {

    const auth = useAppSelector((state: RootState) => state.auth);
    const [visible, setVisible] = useState(false);

    const onSubmit = async (values: BidFormValues, helpers: BidFormHelpers) => {
        if(!auth.accessToken) {
            return;
        }

        const collectionId = collection.id.toString();
        const bidId = bid.id.toString();

        const [res, err] = await api.bidServices.update(collectionId, bidId, values, auth.accessToken.token);

        helpers.setSubmitting(false);

        if(err || !res) {
            toast((t) => (
                <ToastError toast={t} message="Unable to update Bid" />
            ));
            return console.log(err?.message.toString());
        }

        toast((t) => (
            <ToastSuccess toast={t} message="Bid update successfully!" />
        ));

        setVisible(false);
        fetchBids(collectionId);
    };

    return(
        <React.Fragment>
            <Button className="w-20" size="sm" onClick={() =>  setVisible(true)}>
                <p className="font-semibold">Edit</p>
            </Button>
            <Modal motionKey={`create-bid-modal`} visible={visible} setVisible={setVisible}>
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <BidForm 
                            formType="Update"
                            initialValues={{
                                price: bid.price.toString()
                            }}
                            onSubmit={onSubmit}
                        />
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default CreateBid;