import { ArticlesApi } from "../redux/apis/ArticlesAPI";
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { AuthApi } from "../redux/apis/AuthAPI";
import { userSlice } from "../redux/slices/UserSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

const reducers = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [ArticlesApi.reducerPath]: ArticlesApi.reducer,
  user: userSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: "test-key",
    }),
  ],
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(ArticlesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
