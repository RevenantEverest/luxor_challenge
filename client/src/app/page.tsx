"use client"

import type { Collection } from '@@types/entities/Collection';
import type { RootState } from '@@store/index';
import type { ApiPaginatedResponse } from '@@types/api';

import React, { useState, useEffect, useCallback } from 'react';

import { useAppSelector } from '@@hooks';

import { Card, Layout, PaginationNavigator, Spinner } from '@@components/Common';

import CollectionListHeaders from '@@components/Collection/CollectionListHeaders';
import CollectionCard from '@@components/Collection/CollectionCard';
import CreateCollection from '@@components/Collection/CreateCollection';

import * as api from '@@api';

function Home() {

    const auth = useAppSelector((state: RootState) => state.auth);

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [collections, setCollections] = useState<ApiPaginatedResponse<Collection>>();

    const fetchInitialCollections = useCallback(() => {
        fetchCollections(page);
    }, [page]);

    useEffect(() => {
        fetchInitialCollections();
    }, [fetchInitialCollections]);

    const fetchCollections = async (page = 1) => {
        const [res, err] = await api.collectionServices.index({
            page
        });

        if(err || !res) {
            return console.error("Unable to fetch Collections");
        }

        setLoading(false);
        setCollections(res);
    };

    const renderCollections = () => {
        if(!collections) return;

        const Collections = collections.results.map((collection, index) => {
            const key = `${collection.id}-${index}`;
            const bgColor = index % 2 === 0 ? "bg-card" : "bg-card-light";
            return(
                <CollectionCard 
                    key={key} 
                    className={bgColor} 
                    collection={collection}
                    fetchCollections={fetchCollections}
                />
            );
        });

        return(
            <React.Fragment>
                {Collections}
                <PaginationNavigator count={collections.count} currentPage={page} setPage={setPage} />
            </React.Fragment>
        );
    };

    return (
        <Layout className="flex-col gap-5">
            <h1 className="font-semibold text-4xl">Collections</h1>
            {
                auth.user &&
                <CreateCollection className="self-center md:self-end" fetchCollections={fetchCollections} />
            }
            <Card className="w-full min-h-[70vh] mb-20">
                <CollectionListHeaders />
                {
                    loading ?
                    <Spinner className="text-center w-full pt-10" size="lg" /> :
                    renderCollections()
                }
            </Card>
        </Layout>  
    );
};

export default Home;
