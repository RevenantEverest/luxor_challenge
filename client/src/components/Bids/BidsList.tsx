import type { Collection } from '@@types/entities/Collection';
import type { Bid } from '@@types/entities/Bid';

import { useCallback, useState, useEffect } from 'react';
import { Card, Spinner } from '@@components/Common';
import BidCard from './BidCard';

import * as api from '@@api';
import BidsListHeaders from './BidsListHeaders';

export interface BidsListProps {
    collection: Collection
};

function BidsList({ collection }: BidsListProps) {

    const rowClass = "w-full text-sm";

    const [loading, setLoading] = useState(true);
    const [bids, setBids] = useState<Bid[]>([]);

    const fetchInitialBids = useCallback(() => {
        fetchBids(collection.id.toString());
    }, [collection.id]);

    useEffect(() => {
        fetchInitialBids();
    }, [fetchInitialBids]);

    const fetchBids = async (collectionId: string, page = 1) => {
        const [res, err] = await api.bidServices.getByCollectionId(collectionId, {
            page
        });

        if(err || !res) {
            return console.error("Unable to fetch Collections");
        }

        setLoading(false);
        setBids(res.results);
    };

    const renderBids = () => {
        return bids.map((bid, index) => {
            const key = `${bid.id}-${index}`;
            const bgColor = index % 2 === 0 ? "bg-card" : "bg-card-light";
            return(
                <BidCard 
                    key={key} 
                    className={bgColor} 
                    collection={collection} 
                    bid={bid}
                    fetchBids={fetchBids}
                />
            );
        });
    };

    return(
        <div className="flex flex-col gap-5 items-center justify-center text-center w-full">
            <Card className="w-full shadow-none">
                <div className="flex flex-col items-center justify-center text-center">
                    <BidsListHeaders />
                    {loading ? <Spinner /> : renderBids()}
                </div>
            </Card>
        </div>
    );
};

export default BidsList;