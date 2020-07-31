import addAssignReducer from './addAssignState';
import assignReducer from './assignState';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  addAssignReducer,
  assignReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
