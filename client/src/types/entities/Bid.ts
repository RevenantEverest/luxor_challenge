
export type BidStatus = "pending" | "accepted" | "rejected";

export interface Bid {
    id: number,
    price: number,
    status: BidStatus,
    created_at: Date,
    user: {
        id: string,
        email: string
    }
};

export interface BidCreate {
    price: string
};