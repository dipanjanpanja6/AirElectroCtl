import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Platform } from 'react-native';
import * as rp from 'redux-persist';
import { rtkQueryErrorLogger } from './middleware/errorHandler';
import { api } from './services/api';
import userAuthSlice from './slices/auth';
import deviceSlice from './slices/devices';

const middlewares = [api.middleware, rtkQueryErrorLogger];
const rootReducer = combineReducers({
  // Add the generated reducer as a specific top-level slice
  [api.reducerPath]: api.reducer,
  auth: userAuthSlice.reducer,
  devices: deviceSlice.reducer,
});
if (__DEV__ && Platform.OS === 'android') {
  // install redux-flipper and react-native-flipper
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

// type CombinedState = typeof rootReducer extends Reducer<infer U, any> ? U : never;
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['api'] /*stateReconciles: hardSet as (inboundState: CombinedState) => CombinedState*/,
};
const persistedReducer = rp.persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: gDM => gDM({ serializableCheck: { ignoredActions: [rp.FLUSH, rp.REHYDRATE, rp.PAUSE, rp.PERSIST, rp.PURGE, rp.REGISTER] } }).concat(...middlewares),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export const persistor = rp.persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
