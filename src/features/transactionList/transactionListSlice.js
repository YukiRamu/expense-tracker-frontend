import { createSlice } from '@reduxjs/toolkit';

export const transactionListSlice = createSlice({
  name: 'transactionList',
  initialState: {},
  reducers: {
    getAllTransaction: (state, action) => {
      return action.payload;
    },
    checkTransaction: (state, action) => {
      console.log("I'm in transaction Slice", action.payload);//id
      state.map((elem, index) => elem._id == action.payload.id ? state.splice(index, 1, action.payload) : elem);
    }
  }
});

//export reducer, actions,and state(selector)
export default transactionListSlice.reducer;
export const { getAllTransaction, checkTransaction } = transactionListSlice.actions;
export const transactionListSelector = (state) => state.transactionList;

