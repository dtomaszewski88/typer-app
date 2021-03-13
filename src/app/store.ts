import { configureStore, ThunkAction, Action, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history'
import typerReducer from '../features/typer/typerSlice';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'

const createRootReducer = (history: any) => combineReducers({
  router: connectRouter(history),
  typer: typerReducer,
})
export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const routerMid = routerMiddleware(history)

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: [...getDefaultMiddleware(), sagaMiddleware,routerMid],
  devTools: true
});

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
