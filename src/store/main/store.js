import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../reducers/dashboardReducer";
import notificationReducer from "../reducers/notificationReducer";

export default configureStore({
  reducer: {
    dashboard: dashboardReducer,
    notification: notificationReducer,
  }
})