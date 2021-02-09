// 创建store
import {createStore,applyMiddleware} from "redux"
import languageReducer from "./language/languageReduces"
import recommendProductsReducer from "./recommendProducts/recommendProducts"
import thunk from "redux-thunk"
import {actionLog} from "./middleware/actionLog"
//引入产品 详情 slice
import {ProductDetailSlice} from "./productDetail/slice"
import {combineReducers,configureStore} from "@reduxjs/toolkit"
const rootReducer = combineReducers({ 
    language:languageReducer,
    recommendProducts:recommendProductsReducer,
    productsDetail:ProductDetailSlice.reducer
})
// const store = createStore(rootReducer,applyMiddleware(thunk,actionLog))
const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware(),actionLog],
    devTools: process.env.NODE_ENV !== 'production',

})
export type RootState = ReturnType<typeof store.getState>

export default store