"use client"

import type { Collection } from '@@types/entities/Collection';
import type { RootState } from '@@store/index';

import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import { useAppSelector } from '@@hooks';

import { Card, Button } from '@@components/Common';
import EditCollection from './EditCollection';
import CreateBid from '@@components/Bids/CreateBid';
export interface CollectionCardProps extends React.HTMLProps<HTMLDivElement> {
    collection: Collection,
    fetchCollections: () => void
};

function CollectionCard({ className, collection, fetchCollections }: CollectionCardProps) {

    const auth = useAppSelector((state: RootState) => state.auth);

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
                        <Link href={`/collections/${collection.id}`}>
                            <Button className="w-20 flex" size="sm">
                                <p className="font-semibold pr-2">View</p>
                                <FaArrowRight />
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </React.Fragment>
    );
};

export default CollectionCard;