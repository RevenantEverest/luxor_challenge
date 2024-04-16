export interface Bid {
    id: number,
    price: number,
    status: string,
    created_at: Date,
    user: {
        id: string,
        email: string
    }
};