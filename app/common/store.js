import { applyMiddleware, createStore } from 'redux';

import { addAssign } from '../states/assignState';
import { assignList } from './mockData';
import { createLogger } from 'redux-logger';
import reducers from '../states/index';

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(logger));

// dispatch store to mock data
assignList.assigns.map((assign) => {
  store.dispatch(addAssign(assign));
  console.log('store dispatched');
  console.log(assign);
});

//

export default store;
