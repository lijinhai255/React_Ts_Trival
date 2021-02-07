// 创建store
import {createStore,combineReducers} from "redux"
import languageReducer from "./language/languageReduces"
import recommendProductsReducer from "./recommendProducts/recommendProducts"
const rootReducer = combineReducers({ 
    language:languageReducer,
    recommendProducts:recommendProductsReducer
})
const store = createStore(rootReducer)
export type RootState = ReturnType<typeof store.getState>

export default store