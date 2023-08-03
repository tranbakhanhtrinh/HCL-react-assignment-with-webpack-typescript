import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "../slices/productSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
    },
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
    product: productReducer,
});

export const setupStore = (preloadedState: any) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};
