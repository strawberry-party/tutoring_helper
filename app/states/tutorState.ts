import produce from "immer";

var initialState = {
  uid: '',
  name: '',
  studentArray: [],
  studentNum: 0,
}

const tutorReducer = (
  state = initialState, //type 설정 시 오류 발생
  action
) => produce(state, (draft) => {
  switch (action.type) {

    case 'TUTORSTATE_SETUP' :
      // console.log('setup');
      // console.log(action.data);
      draft.uid = action.data.uid;
      draft.studentArray = [];
      draft.studentNum = action.data.studentNum;
      draft.name = action.data.name;
      action.data.studentArray === undefined ? '' : Object.entries(action.data.studentArray).reverse().map(([key, info]) => {
        draft.studentArray.push({key, info})
      })
      // console.log(state.studentArray.length === 0 ? '' : state.studentArray[0].info.lessonArray);
      
      break;
      
    default :
      // console.log(state);
      
      return state;
  }
});

export default tutorReducer;
