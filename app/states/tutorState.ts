import produce from 'immer';

const initialState = {
  selectedStudentId: 'student_1',
};


const SELECT_STUDENT = 'SELECT_STUDENT' as const;


const tutorReducer = (
  state = initialState,
  action,
) =>
  produce(state, (draft) => {
    switch (action.type) {
      default:
        break;
    }
  });

export default tutorReducer;
