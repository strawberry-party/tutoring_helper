import assignFilterSorterReducer from './assignFilterSorterState';
import assignModalReducer from './assignModalState';
import assignReducer from './assignState';
import { combineReducers } from 'redux';
import lessonReducer from './lessonState';

const rootReducer = combineReducers({
  assignModalReducer,
  assignReducer,
  assignFilterSorterReducer,
  lessonReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
