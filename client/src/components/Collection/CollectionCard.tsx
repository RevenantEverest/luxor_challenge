"use client"

import type { Collection } from '@@types/entities/Collection';

import React, { useState } from 'react';
import { Card, Button, Modal } from '@@components/Common';

export interface CollectionCardProps extends React.HTMLProps<HTMLDivElement> {
    collection: Collection
};

function CollectionCard({ className, collection }: CollectionCardProps) {

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
                    <div className="flex  gap-2 w-11/12 text-sm items-center justify-center">
                        <Button color="gradient" className="w-20" size="sm">
                            <p className="font-semibold">Bid</p>
                        </Button>
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
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default CollectionCard;