// 创建store
import {createStore} from "redux"
import languageReducer from "./languageReduces"
const store = createStore(languageReducer)

export default store