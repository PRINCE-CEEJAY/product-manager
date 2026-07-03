"use server"
import type {ProductType} from "../libs/schema"

export async function createProduct(product: ProductType){
try {
    
} catch (error) {
    return {error: `an error occured, ${error}`}
}
}