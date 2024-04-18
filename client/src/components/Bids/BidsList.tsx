import type { Collection } from '@@types/entities/Collection';
import type { Bid } from '@@types/entities/Bid';
import type { RootState } from '@@store/index';

import { useCallback, useState, useEffect } from 'react';
import { useAppSelector } from '@@hooks';
import { Card, Spinner } from '@@components/Common';
import BidCard from './BidCard';
import CreateBid from './CreateBid';

import * as api from '@@api';
import BidsListHeaders from './BidsListHeaders';

export interface BidsListProps {
    className?: string,
    collection: Collection
};

function BidsList({ className="", collection }: BidsListProps) {

    const auth = useAppSelector((state: RootState) => state.auth);

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
        <div className={`flex flex-col gap-5 items-center justify-center text-center w-full ${className}`}>
            <Card className="w-full shadow-none">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="pb-6 flex gap-5 items-center w-full justify-center">
                        <h1 className="text-2xl font-semibold">Current Bids</h1>
                        {
                            auth.user && auth.user.id !== collection.owner.id && 
                            <CreateBid collection={collection} fetchBids={fetchBids} />
                        }
                    </div>
                    <BidsListHeaders />
                    {loading ? <Spinner /> : renderBids()}
                </div>
            </Card>
        </div>
    );
};

export default BidsList;