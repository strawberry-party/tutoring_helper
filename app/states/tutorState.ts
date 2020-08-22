import produce from 'immer';

const initialState = {
  selectedStudentId: 'student_1',
};

const SELECT_STUDENT = 'SELECT_STUDENT' as const;

function tutorReducer(state = initialState, action) {
  var newState;
  // console.log(state);
  
  switch (action.type) {
    case 'STUDENT_CHANGE' :
      newState = {...state, selectedStudentId: action.studentId}
      return newState;
    default :
      return state;
  }
}
// const tutorReducer = (
//   state = initialState,
//   action,
// ) => {
//   var newState;
//   switch (action.type) {
//     case 'STUDENT_CHANGE' :
//       newState = {...state, studentInfo: action.student}
//   }
//   newState;
// }
  // produce(state, (draft) => {
  //   switch (action.type) {
  //     case 'STUDENT_CHANGE' : 
  //       // console.log(action.student);
  //       console.log('드래프트='+ draft);
  //       draft.studentInfo = action.student;
  //       break;
  //     default:
  //       break;
  //   }
  //   return state;
  // });

export default tutorReducer;
