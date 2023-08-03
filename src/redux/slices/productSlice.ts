import { createSlice, PayloadAction } from  '@reduxjs/toolkit'

export type Product = {
    id: number,
    title:string,
    description:string,
    price:number,
    discountPercentage:number,
    rating:number,
    stock:number,
    brand:string,
    category:string,
    thumbnail:string,
    images:string[]
}

type InitialState = {
    products: Product[]
}

const initialState: InitialState = {
    products: []
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        setProducts: (state,action: PayloadAction<Product[]>) => {state.products = action.payload},
        deleteProduct: (state, action: PayloadAction<number>) => {
            const productIndex = state.products.findIndex(i => action.payload === i.id)
            state.products.splice(productIndex,1)
        },
    }
})

export default productSlice.reducer;

