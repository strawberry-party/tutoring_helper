import assignFilterSorterReducer from './assignFilterSorterState';
import assignModalReducer from './assignModalState';
import assignReducer from './assignState';
import { combineReducers } from 'redux';
import lessonReducer from './lessonState';
import currentStudentReducer from './currentStudentState';
import tutorReducer from './tutorState';
import tagReducer from './tagState';
import { enableMapSet } from 'immer';

enableMapSet();

const rootReducer = combineReducers({
  assignModalReducer,
  assignReducer,
  assignFilterSorterReducer,
  lessonReducer,
  currentStudentReducer,
  tutorReducer,
  tagReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
