import assignFilterSorterReducer from './assignFilterSorterState';
import assignModalReducer from './assignModalState';
import assignReducer from './assignState';
import { combineReducers } from 'redux';
import lessonReducer from './lessonState';
import tutorReducer from './tutorState';

const rootReducer = combineReducers({
  assignModalReducer,
  assignReducer,
  assignFilterSorterReducer,
  lessonReducer,
  tutorReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
