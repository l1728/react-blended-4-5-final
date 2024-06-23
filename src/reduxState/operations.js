import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "service/opencagedataApi";

export const fetchBaseCurrency = createAsyncThunk('currency/baseCurrency', async (coord, thunkAPI) => {
    try {
        const response = await getUserInfo(coord);
        return response.results[0].annotations.currency.iso_code;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

