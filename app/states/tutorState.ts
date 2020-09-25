import produce from "immer";
import { TutorType } from "../types/tutor";

var initialState = {
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
      
      const tutorData = action.data;
      draft.studentArray = [];
      draft.studentNum = tutorData.studentNum;
      draft.name = tutorData.name;
      tutorData.studentArray === undefined ? '' : Object.entries(tutorData.studentArray).reverse().map(([key, info]) => {
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
