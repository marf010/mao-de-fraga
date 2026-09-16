export type ProductType = 'soap' | 'candle' | 'arrangement'; 

export interface Product{
    id: string;
    name: string;
    image: string;
    about: string;
    composition: string[];
    benefits: string[];
}