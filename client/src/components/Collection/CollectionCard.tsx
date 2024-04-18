"use client"

import type { Collection } from '@@types/entities/Collection';
import type { RootState } from '@@store/index';

import React, { useState } from 'react';
import { useAppSelector } from '@@hooks';

import { Card, Button, Modal } from '@@components/Common';
import EditCollection from './EditCollection';
import BidsList from '@@components/Bids/BidsList';
import CreateBid from '@@components/Bids/CreateBid';
export interface CollectionCardProps extends React.HTMLProps<HTMLDivElement> {
    collection: Collection,
    fetchCollections: () => void
};

function CollectionCard({ className, collection, fetchCollections }: CollectionCardProps) {

    const auth = useAppSelector((state: RootState) => state.auth);
    const [visible, setVisible] = useState(false);

    const rowClass = "w-full text-sm";

    return(
        <React.Fragment>
            <Card className={`${className}`}>
                <div className="flex gap-6 items-center justify-center text-center">
                    <p className={rowClass}>{collection.id}</p>
                    <p className={rowClass}>{collection.name}</p>
                    <p className={rowClass}>{collection.description}</p>
                    <p className={rowClass}>{collection.stocks.toLocaleString()}</p>
                    <p className={rowClass}>${collection.price.toLocaleString()}</p>
                    <div className="flex gap-2 w-11/12 flex-wrap text-sm items-center justify-center">
                        {
                            auth.user && auth.user.id !== collection.owner.id && 
                            <CreateBid collection={collection} />
                        }
                        {
                            auth.user && auth.user.id === collection.owner.id && 
                            <EditCollection className="w-20" collection={collection} fetchCollections={fetchCollections} />
                        }
                        <Button className="w-20" size="sm" onClick={() => setVisible(true)}>
                            <p className="font-semibold">View</p>
                        </Button>
                    </div>
                </div>
            </Card>
            <Modal motionKey={`${collection.id}-modal`} visible={visible} setVisible={setVisible}>
                <div className="flex flex-col gap-5 items-center justify-center text-center">
                    <h1 className="text-4xl font-semibold">{collection.name}</h1>
                    <p className="font-semibold opacity-50">{collection.description}</p>
                    <div className="flex gap-5">
                        <p className="">
                            <span className="uppercase font-semibold mr-1.5">Stocks:</span> 
                            {collection.stocks.toLocaleString()}
                        </p>
                        <p className="">
                            <span className="uppercase font-semibold mr-1.5">Price:</span> 
                            ${collection.price.toLocaleString()}
                        </p>
                    </div>
                    <BidsList collection={collection} />
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default CollectionCard;