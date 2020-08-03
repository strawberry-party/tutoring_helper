import addAssignReducer from './addAssignState';
import assignReducer from './assignState';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  addAssignModal: addAssignReducer,
  assignReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
