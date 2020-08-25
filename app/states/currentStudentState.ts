import produce from 'immer';

const initialState = {
  selectedStudentId: 'student_1',
};

const STUDENT_CHANGE = 'STUDENT_CHANGE' as const;

const currentStudentReducerer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {

    case STUDENT_CHANGE :
      draft.selectedStudentId = action.studentId
      break;
      
    default :
      return state;
  }
});

export default currentStudentReducerer;
