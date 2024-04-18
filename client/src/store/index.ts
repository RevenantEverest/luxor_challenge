import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { 
    persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from './storage';

import { authSlice } from './auth';

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer
});

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: {
                /* https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist */
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
            thunk: {
                extraArgument: {
                    
                }
            }
        })
    )
});

export const makeStore = () => configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: {
                /* https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist */
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
            thunk: {
                extraArgument: {
                    
                }
            }
        })
    )
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];


