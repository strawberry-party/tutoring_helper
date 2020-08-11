import addAssignReducer from './assignModalState';
import assignReducer from './assignState';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  addAssignModal: addAssignReducer,
  assignReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
