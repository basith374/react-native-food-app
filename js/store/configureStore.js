import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from './promise';
import array from './array';
import reducers from '../reducers';
import {createLogger} from 'redux-logger';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

var createFAStore = applyMiddleware(thunk, promise, array, logger)(createStore);

export default configureStore = (onComplete) => {
  const store = autoRehydrate()(createFAStore)(reducers);
  persistStore(store, {storage: AsyncStorage}, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}
