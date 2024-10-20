import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import notificationsListReducer from "./slices/notificationsList";
import alertReducer from "./slices/alertConfigurationSlice";
import actualAlertReducer from "./actualAlert/actualAlertSlice";

export default configureStore({
  reducer: {
    filter: filterReducer,
    notificationsList: notificationsListReducer,
    alertConfiguration: alertReducer,
    actualAlert: actualAlertReducer,
  },
});
