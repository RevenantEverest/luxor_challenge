export interface Collection {
    id: number,
    name: string,
    description: string,
    stocks: number,
    price: number,
    created_at: Date,
    owner: {
        id: string,
        email: string
    }
};