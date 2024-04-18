"use client"

import type { Collection } from '@@types/entities/Collection';
import type { RootState } from '@@store/index';

import { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';

import { useAppSelector } from '@@hooks';
import { Layout, Spinner, Button } from '@@components/Common';
import BidsList from '@@components/Bids/BidsList';
import EditCollection from '@@components/Collection/EditCollection';

import * as api from '@@api';

export interface SingleCollectionProps {
    params: {
        id: string
    }
}

function SingleCollection({ params }: SingleCollectionProps) {

    const auth = useAppSelector((state: RootState) => state.auth);

    const [loading, setLoading] = useState(true);
    const [collection, setCollection] = useState<Collection | null>(null);

    const fetchInitialCollection = useCallback(() => {
        fetchCollection(params.id);
    }, [params.id]);

    useEffect(() => {
        fetchInitialCollection();
    }, [fetchInitialCollection]);

    const fetchCollection = async (collectionId: string) => {
        const [res, err] = await api.collectionServices.getOne(collectionId);

        if(err || !res) {
            return console.error("Unable to fetch Collection");
        }

        setLoading(false);
        setCollection(res.results);
    };

    return(
        <Layout>
            {
                loading || !collection ?
                <Spinner className="text-center w-full pt-10" size="lg" />
                :
                <div className="flex flex-col gap-5 items-center justify-center text-center w-full">
                    <div className="flex gap-5 items-center justify-center">
                        <h1 className="text-4xl font-semibold">{collection.name}</h1>
                        {
                            auth.user && auth.user.id === collection.owner.id && 
                            <EditCollection 
                                className="w-20" 
                                collection={collection} 
                                fetchCollections={() => fetchCollection(params.id)}
                            />
                        }
                    </div>
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
                    <div className="flex w-full">
                        <div className="w-1/2">
                            <Link className="self-start" href="/">
                                <Button className="flex w-44 items-center justify-center" size="sm">
                                    <FaArrowLeft className="pr-2 font-semibold text-xl" />
                                    <p className="font-semibold">
                                        Back To All Collections
                                    </p>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <BidsList collection={collection} />
                </div>
            }
        </Layout>
    );
};

export default SingleCollection;