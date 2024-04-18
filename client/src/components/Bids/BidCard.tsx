"use client"

import type { Collection } from '@@types/entities/Collection';
import type { Bid } from '@@types/entities/Bid';
import type { RootState } from '@@store/index';

import React from 'react';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '@@hooks';

import { Card, Button, Tooltip, ToastError, ToastSuccess } from '@@components/Common';
import EditBid from './EditBid';

import * as api from '@@api';

export interface BidCardProps extends React.HTMLProps<HTMLDivElement> {
    collection: Collection,
    bid: Bid,
    fetchBids: (collectionId: string) => void
};

function BidCard({ className, collection, bid, fetchBids }: BidCardProps) {

    const auth = useAppSelector((state: RootState) => state.auth);
    const rowClass = "w-full text-sm";

    const acceptBid = async () => {
        if(!auth.accessToken) {
            return;
        }

        const collectionId = collection.id.toString();
        const bidId = bid.id.toString();

        const [res, err] = await api.bidServices.acceptBid(collectionId, bidId, auth.accessToken.token);

        if(err || !res) {
            toast((t) => (
                <ToastError toast={t} message="Unable to create Bid" />
            ));
            return console.log(err?.message.toString());
        }

        toast((t) => (
            <ToastSuccess toast={t} message="Bid created successfully!" />
        ));

        fetchBids(collectionId);
    };

    const getStatusColor = () => {
        switch(bid.status) {
            case "accepted":
                return "bg-green-500";
            case "rejected":
                return "bg-red-500";
            default: 
                return "bg-amber-500";
        };
    };

    return(
        <React.Fragment>
            <Card className={`${className} w-full`}>
                <div className="flex gap-6 items-center justify-center text-center">
                    <p className={rowClass}>{bid.id}</p>
                    <p className={rowClass}>${bid.price.toLocaleString()}</p>
                    <div className={`${rowClass} flex justify-center items-center w-full relative -left-2`}>
                        <Tooltip
                            content={bid.status.charAt(0).toUpperCase() + bid.status.substring(1)}
                        >
                            <div 
                                className={`
                                    h-6 w-6
                                    rounded-full
                                    ${getStatusColor()}
                                `}
                            />
                        </Tooltip>
                    </div>
                    <div className="flex gap-2 w-11/12 flex-wrap text-sm items-center justify-center">
                        {
                            auth.user && auth.user.id === collection.owner.id && 
                            <Button color="gradient" className="w-20" size="sm" onClick={() => acceptBid()}>
                                <p className="font-semibold">Accept Bid</p>
                            </Button>
                        }
                        {
                            auth.user && auth.user.id === bid.user.id && 
                            <EditBid collection={collection} bid={bid} fetchBids={fetchBids} />
                        }
                    </div>
                </div>
            </Card>
        </React.Fragment>
    );
};

export default BidCard;