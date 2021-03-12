import { configureStore, ThunkAction, Action, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history'
import counterReducer from '../features/counter/counterSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
})

export const history = createBrowserHistory()

const middlewares = [routerMiddleware(history)];

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: [...getDefaultMiddleware(), ...middlewares],
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
