import { ThunkAction } from "redux-thunk";
import { RootState } from "../store"
import axios from "axios"
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


export const giveMeDataActionCreator = (): ThunkAction<void,
    RootState,
    unknown,
    RecommendProductAction> => async (dispatch, getState) => {
        dispatch(fetchRecommendProductStartAction())
        try {
            const { data } = await axios.get(
                "http://123.56.149.216:8080/api/productCollections"
            );
            dispatch(fetchRecommendProductSuccessAction(data))
        } catch (error) {
            //   this.props.fetchFail(error.message)
            dispatch(fetchRecommendProductFailAction(error))
        }
    }