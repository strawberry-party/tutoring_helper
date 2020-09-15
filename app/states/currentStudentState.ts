import produce from 'immer';

const initialState = {
  selectedStudentId: 'student_1',
  name: '',
  address: '',
  lessonArray: [],
  lessonTotalNum: 0,
  nextTime: '',
  subject: [],
  book: [],
};

const STUDENT_CHANGE = 'STUDENT_CHANGE' as const;
const BOOK_SETUP = 'BOOK_SETUP' as const;

const currentStudentReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {

    case STUDENT_CHANGE :
      draft.subject = [];
      draft.book = [];
      draft.lessonArray = [];
      const studentInfo = action.info;
      draft.selectedStudentId = studentInfo.id;
      draft.name = studentInfo.name;
      draft.address = studentInfo.address;
      draft.lessonArray = studentInfo.lessonArray;
      draft.lessonTotalNum = studentInfo.lessonTotalNum;
      draft.nextTime = studentInfo.nextTime;
      studentInfo.subjectTag === undefined || null ? '' : Object.entries(studentInfo.subjectTag).reverse().map(([key, info]) => {
        draft.subject.push({key, info})
      })
      studentInfo.bookTag === undefined || null ? '' : Object.entries(studentInfo.bookTag).reverse().map(([key, info]) => {
        draft.book.push({key, info})
      })
      break;
      
    // case BOOK_SETUP :
    //   draft.book = [];
    //   studentInfo.bookTag === undefined || null ? '' : Object.entries(studentInfo.bookTag).reverse().map(([key, info]) => {
    //     draft.book.push({key, info})
    //   })
    //   break;

    default :
      return state;
  }
});

export default currentStudentReducer;
