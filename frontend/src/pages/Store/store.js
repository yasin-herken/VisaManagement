import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from "../Features/userSlice.js";
import postReducer from "../Features/postSlice.js";
import priceReducer from "../Features/singleMultiple.js";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: "root",
  version: 1,
  storage,
}
const combinedReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  price: priceReducer
})
const persistedReducer = persistReducer(persistConfig, combinedReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
const Persistor = persistStore(store);
export { Persistor }
export default store