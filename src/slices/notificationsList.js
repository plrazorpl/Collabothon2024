import { createSlice } from "@reduxjs/toolkit";
import list from "../data/notification.json";

const initialList = list;

export const notificationsListSlice = createSlice({
  name: "notificationsList",
  initialState: {
    allNotifications: [...initialList],
    filteredNotifications: [],

    //selectedID
    selectedNotification: {},
  },

  reducers: {
    markAllAsRead: (state) => {
      // Iterate through every object in the array and update the "one" field
      state.allNotifications.forEach((item) => {
        item.read = true;
      });
    },
    getFilteredNotifications: (state, action) => {
      const filters = action.payload;

      const activeFilter = filters.type === "active" ? true : false;

      state.filteredNotifications = state.allNotifications.filter(
        (not) => not.archived === !activeFilter
      );

      if (filters.sort.dueDate === false) {
        state.filteredNotifications = state.filteredNotifications.filter(
          (not) => not.type === filters.sort.type
        );
      }
    },
    loadSelectedNotification: (state, action) => {
      const selectedId = action.payload.id;

      if (selectedId !== "" && selectedId !== null) {
        state.selectedNotification = state.filteredNotifications
          .filter((n) => n.id === selectedId)
          .at(0);
      }
    },
    archiveSelectedNotification: (state, action) => {
      const selectedId = action.payload.id;

      if (selectedId !== "" && selectedId !== null) {
        // Find the object by id and update it immutably
        const index = state.allNotifications.findIndex(
          (n) => n.id === selectedId
        );
        if (index !== -1) {
          state.allNotifications[index] = {
            ...state.allNotifications[index],
            archived: true,
          };
        }
      }
    },
    markNotificationAsRead: (state, action) => {
      const selectedId = action.payload.id;

      if (selectedId !== "" && selectedId !== null) {
        // Find the object by id and update it immutably
        const index = state.allNotifications.findIndex(
          (n) => n.id === selectedId
        );
        if (index !== -1) {
          state.allNotifications[index] = {
            ...state.allNotifications[index],
            read: true,
          };
        }
      }
    },
  },
});

export const {
  markAllAsRead,
  getFilteredNotifications,
  loadSelectedNotification,
  archiveSelectedNotification,
  markNotificationAsRead,
} = notificationsListSlice.actions;

export default notificationsListSlice.reducer;
