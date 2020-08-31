import produce from 'immer';

const initialState = {
  selectedStudentId: 'student_1',
  name: '',
  address: '',
  lessonArray: [],
  lessonTotalNum: 0,
  nextTime: '',
  subject: [],
};

const STUDENT_CHANGE = 'STUDENT_CHANGE' as const;

const currentStudentReducerer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {

    case STUDENT_CHANGE :
      const studentInfo = action.info;
      draft.selectedStudentId = studentInfo.id;
      draft.name = studentInfo.name;
      draft.address = studentInfo.address;
      draft.lessonArray = studentInfo.lessonArray;
      draft.lessonTotalNum = studentInfo.lessonTotalNum;
      draft.nextTime = studentInfo.nextTime;
      draft.subject = studentInfo.subject;
      break;
      
    default :
      return state;
  }
});

export default currentStudentReducerer;
