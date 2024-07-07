import { createSlice } from '@reduxjs/toolkit';

import { fetchBaseCurrency, fetchExchangeCurrency } from './operations';

const initialState = {
  baseCurrency: '',
   exchangeInfo: null,
    isLoading: false,
    isError: null,
};
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchBaseCurrency.fulfilled, (state, action) => {
      state.baseCurrency = action.payload;
    })
      .addCase(fetchExchangeCurrency.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
      })
    .addCase(fetchExchangeCurrency.fulfilled, (state, action) => {
      state.exchangeInfo = action.payload;
      state.isLoading = false;
      
    })
      .addCase(fetchExchangeCurrency.rejected, (state, action) => {
        state.isError = action.payload;
        state.isLoading = false;
        state.exchangeInfo = null;
    })
    
  },
});

export const { setBaseCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
