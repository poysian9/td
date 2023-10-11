import { configureStore } from "@reduxjs/toolkit";
import { nomicsApi } from "../services/nomicsApi";

export default configureStore({
  reducer: {
    [nomicsApi.reducerPath]: nomicsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nomicsApi.middleware),
});
