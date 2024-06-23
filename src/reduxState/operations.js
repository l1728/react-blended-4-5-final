import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "service/opencagedataApi";

export const fetchBaseCurrency = createAsyncThunk('currency/baseCurrency', async (coord, thunkAPI) => {

    const state = thunkAPI.getState();
    const { baseCurrency } = state.currency;

    if (baseCurrency) {
      return thunkAPI.rejectWithValue('We already have base currency!');
    }

    try {
        const response = await getUserInfo(coord);
        return response.results[0].annotations.currency.iso_code;
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

