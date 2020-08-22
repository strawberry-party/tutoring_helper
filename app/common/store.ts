import { applyMiddleware, createStore } from 'redux';
import { assignList, tagList } from './mockData';

import { AssignType } from '../types/homework';
import { TagType } from '../types/root';
import { addAssign } from '../states/assignState';
import { addTag } from '../states/tagState';
import { createLogger } from 'redux-logger';
import reducers from '../states/index';

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(logger));
// dispatch store to mock data

tagList.forEach((tag: TagType) => {
  store.dispatch(addTag(tag));
});

for (let [key, assign] of assignList.assignMap) {
  store.dispatch(addAssign(assign));
}

// TODO: firebase 도입한 다음에는 전체 data를 import 하고 dispatch



export default store;
