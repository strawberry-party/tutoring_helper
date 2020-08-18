import assignFilterSorterReducer from './assignFilterSorterState'
import assignModalReducer from './assignModalState';
import assignReducer from './assignState';
import studentReducer from './studentState'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  assignModalReducer,
  assignReducer,
  assignFilterSorterReducer,
  studentReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
