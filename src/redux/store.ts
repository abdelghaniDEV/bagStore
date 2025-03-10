import { configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./slices/categoriesSlice";

export const store = configureStore({
    reducer: {
        // Your root reducer goes here
        // products: productsReducer,
        categories: categoriesReducer,
        // orders: ordersReducer,
        // users: usersReducer,
        // // Add more reducers here
    }, // Add your reducers here
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(), // Add any middleware you want here
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;