import assignModalReducer from './assignModalState';
import assignReducer from './assignState';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  assignModalReducer,
  assignReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
