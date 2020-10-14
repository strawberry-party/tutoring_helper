import { applyMiddleware, createStore } from 'redux';
import { assignList, tagList } from './mockData';

import { TagType } from '../types/root';
import { addTag } from '../states/tagState';
import { createLogger } from 'redux-logger';
import reducers from '../states/index';
import thunkMiddleware from 'redux-thunk'

// const logger = createLogger();
const logger = createLogger();

const middleware = applyMiddleware(thunkMiddleware) // 액션 객체가 아닌 함수를 디스패치 할 수 있음
const store = createStore(reducers, middleware);
// dispatch store to mock data

tagList.forEach((tag: TagType) => {
  store.dispatch(addTag(tag));
});


export default store;
