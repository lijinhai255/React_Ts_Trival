// 创建store
import {createStore,applyMiddleware} from "redux"
import languageReducer from "./language/languageReduces"
import recommendProductsReducer from "./recommendProducts/recommendProducts"
import thunk from "redux-thunk"
import {actionLog} from "./middleware/actionLog"
//引入产品 详情 slice
import {ProductDetailSlice} from "./productDetail/slice"
import {productSearchSlice} from "./productSearch/slice"
import {shoppingCarSlice} from './shoppingCart/slice'
import {UserlSlice} from "./user/slice"
import {combineReducers,configureStore} from "@reduxjs/toolkit"
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
const persistConfig ={
    key:"root",
    storage,
    whitelist:["user"],
}
interface languageType {
    language: "zh" | "ch";
    languageList: {}[];
}

const rootReducer = combineReducers({ 
    language:languageReducer,
    recommendProducts:recommendProductsReducer,
    productsDetail:ProductDetailSlice.reducer,
    productSearch:productSearchSlice.reducer,
    user:UserlSlice.reducer,
    shoppingCart:shoppingCarSlice.reducer
})
const persistedReducer = persistReducer(persistConfig,rootReducer) 

// const store = createStore(rootReducer,applyMiddleware(thunk,actionLog))
const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware(),actionLog],
    devTools: process.env.NODE_ENV !== 'production',

})
const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>

export default {store,persistor}