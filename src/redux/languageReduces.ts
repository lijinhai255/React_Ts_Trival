export interface LanguageState {
    language: "zh" | "en";
    languageList: { name: string, code: string }[]
}
const defaultLanguage: LanguageState = {
    language: "zh",
    languageList: [
        { name: "中文", code: "zh" },
        { name: "英文", code: "ch" }
    ]
}
export default (state = defaultLanguage, actions) => {
    console.log(actions);
    switch (actions.type) {
        case "change_language":
            return { ...state, language: actions.payload }
        case "add_language":
            return { ...state, languageList: [...state.languageList, actions.payload] }
        default:
            return state
    }
}