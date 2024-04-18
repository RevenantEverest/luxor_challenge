"use client"

import type { Collection } from '@@types/entities/Collection';

import { useState, useEffect, useCallback } from 'react';
import { Card, Layout } from '@@components/Common';

import CollectionListHeaders from '@@components/Collection/CollectionListHeaders';
import CollectionCard from '@@components/Collection/CollectionCard';

import * as api from '../api';

function Home() {

    const [loading, setLoading] = useState(false);
    const [collections, setCollections] = useState<Collection[]>([]);

    const fetchInitialCollections = useCallback(() => {
        fetchCollections();
    }, []);

    useEffect(() => {
        fetchInitialCollections();
    }, [fetchInitialCollections]);

    const fetchCollections = async (page = 1) => {
        setLoading(true);
        const [res, err] = await api.collectionServices.index({
            page
        });

        if(err || !res) {
            return console.error("Unable to fetch Collections");
        }

        setLoading(false);
        setCollections(res.results);
    };

    const renderCollections = () => {
        return collections.map((collection, index) => {
            const key = `${collection.id}-${index}`;
            const bgColor = index % 2 === 0 ? "bg-card" : "bg-card-light";
            return(
                <CollectionCard key={key} className={bgColor} collection={collection} />
            );
        });
    };

    return (
        <Layout className="flex-col gap-10">
            <h1 className="font-semibold text-4xl">Collections</h1>
            <Card className="w-full min-h-[70vh]">
                <CollectionListHeaders />
                {loading ? "" : renderCollections()}
            </Card>
        </Layout>  
    );
};

export default Home;
