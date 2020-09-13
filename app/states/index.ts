import assignFilterSorterReducer from './assignFilterSorterState';
import assignModalReducer from './assignModalState';
import assignReducer from './assignState';
import { combineReducers } from 'redux';
import currentStudentReducer from './currentStudentState';
import { enableMapSet } from 'immer';
import lessonReducer from './lessonState';
import scheduleReducer from './scheduleState';
import tagReducer from './tagState';
import tutorReducer from './tutorState';

enableMapSet();

const rootReducer = combineReducers({
  assignModalReducer,
  assignReducer,
  assignFilterSorterReducer,
  lessonReducer,
  currentStudentReducer,
  tutorReducer,
  tagReducer,
  scheduleReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
