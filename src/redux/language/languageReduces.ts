import i18n from "i18next";
import {CHANGE_LANGUAGE,ADD_LANGUAGE,LanguageActionType} from "./languageAction"
export interface LanguageState {
    language: "zh" | "en";
    languageList: { name: string, code: string }[]
}
const defaultState: LanguageState = {
    language: "zh",
    languageList: [
        { name: "中文", code: "zh" },
        { name: "英文", code: "ch" }
    ]
}
export default (state = defaultState, actions:LanguageActionType) => {
    switch (actions.type) {
        case CHANGE_LANGUAGE:
            i18n.changeLanguage(actions.payload); // 这样处理是不标准的，有副作用
            return { ...state, language: actions.payload }
        case ADD_LANGUAGE:
            return { ...state, languageList: [...state.languageList, actions.payload] }
        default:
            return state
    }
}