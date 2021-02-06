// 创建store
import {createStore} from "redux"
import languageReducer from "./language/languageReduces"
const store = createStore(languageReducer)
export type RootState = ReturnType<typeof store.getState>

export default store