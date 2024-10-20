import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filters: {
      type: "active", // active - archived
      sort: {
        type: "",
        dueDate: true,
        category: "",
      },
    },
  },

  reducers: {
    updateFilterActiveType: (state, action) => {
      state.filters.type = action.payload.type;
    },
    updateFiltersSortBy: (state, action) => {
      state.filters.sort = action.payload;
    },
  },
});

export const { updateFilterActiveType, updateFiltersSortBy } =
  filterSlice.actions;

export default filterSlice.reducer;
