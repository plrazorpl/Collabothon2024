import { createSlice } from "@reduxjs/toolkit";

const defaultAlertConfiguration = {
    name: "",
    type: "",
    subtype: "",
    frequency: "",
    clent: "",
    description: "",
    url: "",
  };


const alertConfigurationSlice = createSlice({
    name: "alertConfiguration",
    initialState: {
      user_id: 1,
      alerts: [defaultAlertConfiguration],
    },

    reducers: {
      addAlertConfiguration: (state, action) => {
        state.alerts = action.payload;
      },

      removeAlertConfiguration: (state, action) => {
        state.alerts.splice(action.payload, 1);
      },
    },
  });


export const { addAlertConfiguration, removeAlertConfiguration } = alertConfigurationSlice.actions;

export default alertConfigurationSlice.reducer;