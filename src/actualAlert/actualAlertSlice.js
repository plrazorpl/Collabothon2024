import { createSlice } from "@reduxjs/toolkit";

export const actualAlertSlice = createSlice({
  name: "actualAlert",
  initialState: {
    snackPack: [],
    open: false,
    messageInfo: undefined,
  },
  reducers: {
    notifySuccess: (state, action) => {
      state.snackPack.push({
        message: action.payload,
        key: new Date().getTime(),
        severity: "success",
      });
    },
    notifyWarn: (state, action) => {
      state.snackPack.push({
        message: action.payload,
        key: new Date().getTime(),
        severity: "warning",
      });
    },
    notifyError: (state, action) => {
      state.snackPack.push({
        message: action.payload,
        key: new Date().getTime(),
        severity: "error",
      });
    },
    notifyInfo: (state, action) => {
      state.snackPack.push({
        message: action.payload,
        key: new Date().getTime(),
        severity: "info",
      });
    },
    nextSnack: (state) => {
      state.messageInfo = { ...state.snackPack[0] };
      state.snackPack.splice(0, 1);
      state.open = true;
    },
    closeSnack: (state) => {
      state.open = false;
    },
    resetMessageInfo: (state) => {
      state.messageInfo = undefined;
    },
  },
});

export const {
  notifySuccess,
  notifyWarn,
  notifyError,
  notifyInfo,
  nextSnack,
  closeSnack,
  resetMessageInfo,
} = actualAlertSlice.actions;

export default actualAlertSlice.reducer;
