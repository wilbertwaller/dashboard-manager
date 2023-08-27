import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../reducers/dashboardReducer";
import notificationReducer from "../reducers/notificationReducer";
import footerReducer from "../reducers/footerReducer";

export default configureStore({
  reducer: {
    dashboard: dashboardReducer,
    footer: footerReducer,
    notification: notificationReducer
  }
})