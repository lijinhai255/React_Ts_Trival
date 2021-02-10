import { createSlice, CreateSliceOptions, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
interface shoppingCarState {
    loading: boolean;
    error: string | null;
    items: any;
}

const initialState: shoppingCarState = {
    loading: true,
    error: null,
    items: null,
};
export const getShoppingCar = createAsyncThunk(
    "shoppingCar/getShoppingCar",
    async (jwt: string, thunkAPI) => {
        const { data } = await axios.get(`http://123.56.149.216:8080/api/shoppingCart`,{
            headers: {
                Authorization:`bearer ${jwt}`
            }
        })
        return data.shoppingCartItems
    }
)
export const addShoppingCar = createAsyncThunk(
    "shoppingCar/addShoppingCar",
    async (parameters:{
        jwt:string,
        touristRouteId:string
    }, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/api/shoppingCart/items`,
        {
            touristRouteId:parameters.touristRouteId
        },
        {
            headers: {
                Authorization:`bearer ${parameters.jwt}`
            }
        })
        return data.shoppingCarItems
    }
)
export const clearShoppingCar = createAsyncThunk(
    "shoppingCar/clearShoppingCar",
    async (parameters:{
        jwt:string,
        itemIds:number[]
    }, thunkAPI) => {
        return await axios.delete(
            `http://123.56.149.216:8080/api/shoppingCart/items/(${parameters.itemIds.join(",")})`,
        {
            headers: {
                Authorization:`bearer ${parameters.jwt}`
            }
        })
        // return data.shoppingCarItems
    }
)
export const shoppingCarSlice = createSlice({
    name: "shoppingCar",
    initialState,
    reducers: {
    },
    extraReducers: {
        [getShoppingCar.pending.type]: (state) => {
            state.loading = true;
        },
        [getShoppingCar.fulfilled.type]: (state, action: PayloadAction<string | null>) => {
            console.log(state.items, action, "121-1212")
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getShoppingCar.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addShoppingCar.pending.type]: (state) => {
            state.loading = true;
        },
        [addShoppingCar.fulfilled.type]: (state, action: PayloadAction<string | null>) => {
            console.log(state.items, action, "121-1212")
            state.items = action.payload;
            state.loading = false;
            state.error = null;
        },
        [addShoppingCar.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [clearShoppingCar.pending.type]: (state) => {
            state.loading = true;
        },
        [clearShoppingCar.fulfilled.type]: (state, action: PayloadAction<string | null>) => {
            console.log(state.items, action, "121-1212")
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        [clearShoppingCar.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})