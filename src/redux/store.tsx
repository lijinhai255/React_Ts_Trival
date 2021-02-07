// 创建store
import {createStore,combineReducers,applyMiddleware} from "redux"
import languageReducer from "./language/languageReduces"
import recommendProductsReducer from "./recommendProducts/recommendProducts"
import thunk from "redux-thunk"
import {actionLog} from "./middleware/actionLog"
const rootReducer = combineReducers({ 
    language:languageReducer,
    recommendProducts:recommendProductsReducer
})
const store = createStore(rootReducer,applyMiddleware(thunk,actionLog))
export type RootState = ReturnType<typeof store.getState>

export default store