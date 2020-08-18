import produce from "immer";

const progressArray = [ //진도 현황 배열 - 여기선 밖으로 빼놨지만 구현할 때는 각 원소가 studentArray의 progress에 안에 있도록
  [{weekId: 1, lessonNum: 1, progress: [{id: 1, title: '2단원', isDone: true}, {id: 2, title: '3단원', isDone: false}], file: '', test: [{content: '1단원', score: '90'}]}, 
  {weekId: 2, lessonNum: 2, progress: [{id: 1, title: '4단원', isDone: false}], file: '', test: [{content: '2단원', score: '95'}, {content: '3단원', score: '100'}]},
  {weekId: 3, lessonNum: 3, progress: [], file: '', test: []},]
]

const initialState = {
  studentArray: [ //학생 정보 담은 배열 - drawer에서 학생 추가 시 이용되는 배열
    {studentId: 1, name: '김태형', subject: '수학', address: '한국', time:'11:00~13:00', progress: progressArray[0]},
    {studentId: 2, name: '최상아', subject: '과학', address: '대한민국', time:'10:00~13:00', progress: []},
    {studentId: 3, name: '이규빈', subject: '화학', address: '한반도', time:'9:00~13:00', progress: []},
    {studentId: 4, name: '전승규', subject: '지구과학', address: '남한', time:'8:00~13:00', progress: []},
  ]
}

const studentReducer = (state=initialState, action) => {
  console.log(state.studentArray[0].progress);
  if (action.type === 'PROGRESS_ADD') {
    return produce(state, (draft) =>{
      draft.studentArray[0].progress.push({weekId: 4, lessonNum: 4, progress: [{id: 1, title: action.title, isDone: action.isDone}], file: '', test:[]})
    });
  }
  return state;
}

export default studentReducer
