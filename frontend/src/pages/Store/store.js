import { configureStore } from '@reduxjs/toolkit';
import logger from "redux-logger"
import userReducer from "../Features/userSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from "redux-persist";
import storage from 'redux-persist/lib/storage';
const persistConfig={
  key:"root",
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig,userReducer);

const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:false
  }).concat(logger)
})
const Persistor = persistStore(store);
export {Persistor}
export default store