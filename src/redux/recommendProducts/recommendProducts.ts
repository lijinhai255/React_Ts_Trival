import {
    FETCH_RECOMMEND_PRODUCTS_START,
    FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    FETCH_RECOMMEND_PRODUCTS_FAIL,
    RecommendProductAction
} from "./recommendProductsActions"

interface RecommendProductsState {
    productList: any[];
    loading: boolean;
    error: string | null;
}

const defaultState: RecommendProductsState = {
    loading: true,
    error: null,
    productList: []
}


export default (state = defaultState, actions) => {
    switch (actions.type) {
        case FETCH_RECOMMEND_PRODUCTS_START:
            return { ...state,loading:true };
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
            return { ...state,loading:false,productList:actions.payload };
        case FETCH_RECOMMEND_PRODUCTS_FAIL:
            return { ...state,loading:false,error:actions.payload };
        default:
            return state    

    }
}