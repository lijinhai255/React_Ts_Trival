import { createSlice, CreateSliceOptions, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
interface ProductDetailState {
    loading: boolean;
    error: string | null;
    data: any;
}

const initialState: ProductDetailState = {
    loading: true,
    error: null,
    data: null,
};
export const getProductDetail = createAsyncThunk(
    "ProductDetail/getProductDetail",
    async (touristRouteId: string, thunkAPI) => {
    //   console.log(12121)
        // try {
        //     // setLoading(true)
        //     thunkAPI.dispatch(ProductDetailSlice.actions.fetchStart())
            const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
            // console.log(data, "data")
            // setProduct(data)
            // thunkAPI.dispatch(ProductDetailSlice.actions.fetchSuccess(data))
            // setLoading(false)
        // } catch (error) {
            // thunkAPI.dispatch(ProductDetailSlice.actions.fetchFail(error.message))
            // serError(error.message)
            // setLoading(false)
        // }
        return data
    }
)
export const ProductDetailSlice = createSlice({
    name: "ProductDetail",
    initialState,
    reducers: {
        // fetchStart: (state) => {
        //     state.loading = true;
        // },
        // fetchSuccess: (state, action: PayloadAction<string | null>) => {
        //     console.log(state.data, action, "121-1212")
        //     state.data = action.payload;
        //     state.loading = false;
        //     state.error = null
        // },
        // fetchFail: (state, action: PayloadAction<string | null>) => {
        //     state.loading = false;
        //     state.error = action.payload
        // }
    },
    extraReducers:{
        [getProductDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [getProductDetail.fulfilled.type]: (state, action: PayloadAction<string | null>) => {
            console.log(state.data, action, "121-1212")
            state.data = action.payload;
            state.loading = false;
            state.error = null
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})