// // subAssignment : Create, Update, Delete, Complete, Uncomplete

// import { AssignListType } from '../component/Tutor/Homework/AssignList';
// import { Assign } from '../component/Tutor/Homework/Assign';
// import { SubAssign } from '../component/Tutor/Homework/SubAssign';
// import createReducer from '../common/createReducer';
// import { createStore } from 'redux';
// import { now } from 'moment';
// import produce from 'immer';

// // action type constant

// const CREATE = 'assignment/CREATE';
// const UPDATE = 'assignment/UPDATE';
// const DELETE = 'assignment/DELETE';
// const COMPLETE = 'assignment/COMPLETE';
// const UNCOMPLETE = 'assignment/UNCOMPLETE';

// // action constructor
// export const createAssignment = (assign) => ({ type: CREATE, assign: assign });

// export function updateAssignment({ text, subAssignId, assignId }) {
//   return { type: UPDATE, text, subAssignId, assignId };
// }

// export function deleteAssignment({ text, id }) {
//   return { type: DELETE, text, id };
// }

// export function completeAssignment({ subAssignId, assignId }) {
//   return { type: COMPLETE, subAssignId, assignId };
// }

// export function uncompleteAssignment({ subAssignId, assignId }) {
//   return { type: UNCOMPLETE, subAssignId, assignId };
// }

// // initial state
// const INITIAL_STATE: AssignListType = { assigns: [] };

// // dispatching

// // middleware for debugging

// // subAssignment reducer

// const reducer = createReducer(INITIAL_STATE, {
//   [CREATE]: (state, action) => state.assigns.push(action.assign),
//   // [COMPLETE]: (state, action) =>
//   //   (state.assigns[action.assignId][action.subAssignId].isCompleted = true),
// });

// export default reducer;

// // const subAssigns: Array<SubAssign> = [];
// // const newAssign: Assign = {
// //   id: getN
// //   title,
// //   desc,
// //   due,
// //   out: new Date(now),
// //   isCompleted: false,
// //   status: 0,
// //   subAssigns,
// // };
