import { configureStore } from '@reduxjs/toolkit';
import { errorSuppressionApi } from './api/errorSuppressionApi';

export const store = configureStore({
  reducer: {
    [errorSuppressionApi.reducerPath]: errorSuppressionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorSuppressionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
