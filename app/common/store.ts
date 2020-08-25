import { applyMiddleware, createStore } from 'redux';
import { addTag } from '../states/tagState';
import { addAssign } from '../states/assignState';
import { assignList, tagList } from './mockData';
import { TagType } from '../types/root';
import { createLogger } from 'redux-logger';
import reducers from '../states/index';

// const logger = createLogger();
const logger = createLogger();

const store = createStore(reducers);
// dispatch store to mock data

tagList.forEach((tag: TagType) => {
  store.dispatch(addTag(tag));
});

for (let [key, assign] of assignList.assignMap) {
  store.dispatch(addAssign(assign));
}

export default store;
