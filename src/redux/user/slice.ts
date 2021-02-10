import { createSlice, CreateSliceOptions, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
interface userState {
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: userState = {
    loading: false,
    error: null,
    token: null,
};
export const singIn = createAsyncThunk(
    "user/singIn",
    async (paramaters: {
        email: string,
        password: string,
    }, thunkAPI) => {
        const { data } = await axios.post(`http://123.56.149.216:8080/auth/login`,
            {
                email: paramaters.email,
                password: paramaters.password
            }
        )
        return data.token
    }
)
export const UserlSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut:(state)=>{
            state.token = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: {
        [singIn.pending.type]: (state) => {
            state.loading = true;
        },
        [singIn.fulfilled.type]: (state, action: PayloadAction<string | null>) => {
            // console.log(state.token, action, "121-1212")
            state.token = action.payload;
            state.loading = false;
            state.error = null
        },
        [singIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload
        }
    }
})