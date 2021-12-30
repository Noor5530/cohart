import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducers from 'store/reducers';
import sagas from 'store/sagas';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loading', 'app', 'snackBar'],
};

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

const reducers = persistReducer(config, rootReducers);
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);

sagaMiddleware.run(sagas);

export { store, persistor };
