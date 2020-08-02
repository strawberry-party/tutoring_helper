import { AssignListType, AssignType, SubAssignType } from '../types/homework';

import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { log } from 'react-native-reanimated';
import { assign2 as newMockAssign } from '../common/mockData';

// action type
export const ADD = 'ADD' as const;
export const REMOVE = 'REMOVE' as const;
export const COMPLETE = 'COMPLETE' as const;
export const INCOMPLETE = 'INCOMPLETE' as const;

type AssignAction =
  | ReturnType<typeof addAssign>
  | ReturnType<typeof completeAssign>
  | ReturnType<typeof incompleteAssign>
  | ReturnType<typeof removeAssign>;

type AssignListState = {
  assigns: Array<AssignType>;
};

const initialState: AssignListState = { assigns: [] };

// action constructor
export const addAssign = (newAssign: AssignType) => ({
  type: ADD,
  assign: {
    ...newAssign,
    id: _.uniqueId('assign_'),
  },
});

export const completeAssign = (id: string) => ({
  type: COMPLETE,
  id: id,
});

export const incompleteAssign = (id: string) => ({
  type: INCOMPLETE,
  id: id,
});

export const removeAssign = (id: string) => ({
  type: REMOVE,
  id: id,
});

export const actions = {
  addAssign,
  completeAssign,
  incompleteAssign,
  removeAssign,
};

// reducer

// action에 따라 state를 어떻게 반환할지 설정
// TODO: 깊은 곳까지 접근하기 편하도록 immer.js 사용할것

const assignsReducer = (
  state: AssignListState = initialState,
  action: AssignAction,
) => {
  switch (action.type) {
    case ADD:
      return { assigns: [...state.assigns, action.assign] };
    case COMPLETE:
      var assigns = state.assigns;
      var index = _.findIndex(
        assigns,
        (assign: AssignType) => assign.id === action.id,
      );
      if (index === -1) {
        return state;
      } else {
        return {
          assigns: [
            ...assigns.slice(0, index),
            Object.assign({}, assigns[index], {
              isCompleted: true,
            }),
            ...assigns.slice(index + 1),
          ],
        };
      }

    case INCOMPLETE:
      var assigns = state.assigns;
      var index: number = _.findIndex(
        assigns,
        (assign: AssignType) => assign.id === action.id,
      );
      if (index === -1) {
        return state;
      } else {
        console.log(assigns[index].title);
        return {
          assigns: [
            ...assigns.slice(0, index),
            Object.assign({}, assigns[index], {
              isCompleted: false,
            }),
            ...assigns.slice(index + 1),
          ],
        };
      }

    case REMOVE:
      var newAssigns = state.assigns.filter((assign: AssignType) => assign.id !== action.id)
      return {
        assigns: newAssigns,
      };

    default:
      return state;
  }
};

export default assignsReducer;

// export default function assignsReducer(
//   assigns: Array<Assign> = [],
//   action: any = {},
// ) {
//   switch (action.type) {
//     case ADD:
//       return [...assigns, action.assign];
//     case COMPLETE:
//       var index = _.findIndex(assigns, (assign) => assign.id === action.id);
//       if (index === -1) {
//         return assigns;
//       }
//       return [
//         ...assigns.slice(0, index),
//         Object.assign({}, assigns[index], {
//           completed: true,
//         }),
//         ...assigns.slice(index + 1),
//       ];
//     case INCOMPLETE:
//       var index = _.findIndex(assigns, (assign) => assign.id === action.id);
//       if (index === -1) {
//         return assigns;
//       }
//       return [
//         ...assigns.slice(0, index),
//         Object.assign({}, assigns[index], {
//           completed: false,
//         }),
//         ...assigns.slice(index + 1),
//       ];
//     default:
//       return assigns;
//   }
// }
