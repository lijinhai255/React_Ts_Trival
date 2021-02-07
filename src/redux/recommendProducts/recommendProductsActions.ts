export const FETCH_RECOMMEND_PRODUCTS_START =
    "FETCH_RECOMMEND_PRODUCTS_START";
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
    "FETCH_RECOMMEND_PRODUCTS_SUCCESS";
export const FETCH_RECOMMEND_PRODUCTS_FAIL =
    "FETCH_RECOMMEND_PRODUCTS_FAIL";
//定义接口
interface FetchRecommendProductStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any,
}

interface FetchRecommendProductFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: any
}

export type RecommendProductAction =
    FetchRecommendProductStartAction |
    FetchRecommendProductFailAction |
    FetchRecommendProductSuccessAction

export const fetchRecommendProductStartAction = (): FetchRecommendProductStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}

export const fetchRecommendProductSuccessAction = (data): FetchRecommendProductSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}

export const fetchRecommendProductFailAction = (error): FetchRecommendProductFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    }
}

