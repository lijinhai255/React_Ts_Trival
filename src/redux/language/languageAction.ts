export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
    type: typeof CHANGE_LANGUAGE;
    payload: "zh" | "ch"
}
interface AddLanguageAction {
    type: typeof ADD_LANGUAGE;
    payload: { name: string, code: string }
}

export type LanguageActionType = ChangeLanguageAction | AddLanguageAction;
export const changeLanguageActionCreator = (language: "zh" | "ch"): ChangeLanguageAction => {
    return {
        type: CHANGE_LANGUAGE,
        payload: language
    }
}

export const addLanguageActionCreator = (name: string, code: string): AddLanguageAction => {
    return {
        type: ADD_LANGUAGE,
        payload: { name, code }
    }
}