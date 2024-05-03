import { Category } from "src/helpers/enums-type.enum"

export interface IProduct {
    idProduct: number,
    codeProduct: string,
    product: string,
    description: string,
    price: number,
    category: Category,
    amount: number,
    images: string
}