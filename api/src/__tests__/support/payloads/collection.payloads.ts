import { Collection } from '@@entities/index.js';

type CollectionProperties = keyof Pick<Collection, (
    "name" | 
    "description" | 
    "stocks" | 
    "price"
)>;

export const VALID_CREATE: Record<CollectionProperties, string> = {
    name: "Collection #1",
    description: "This is a sample description",
    stocks: "56789",
    price: "22.45"
};

export const INVALID_CREATE: Record<CollectionProperties, string | number> = {
    name: 192882734,
    description: "This should work as a description",
    stocks: "This is NaN",
    price: "This is also NaN"
};