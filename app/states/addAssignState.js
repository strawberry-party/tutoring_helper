// action type
export const SET_ADD_MODAL_VISIBILITY = 'SET_ADD_MODAL_VISIBILITY';

// action constructor
export function showModal() {
  return {
    type: SET_ADD_MODAL_VISIBILITY,
    visible: true,
  };
}

export function hideModal() {
  return {
    type: SET_ADD_MODAL_VISIBILITY,
    visible: false,
  };
}

// reducer
const initialState = {
  visible: false,
};

export default function addModalVisibilityReducer(
  state = initialState,
  action = {},
) {
  switch (action.type) {
    case SET_ADD_MODAL_VISIBILITY:
      return {
        ...state,
        visible: action.visible,
      };
    default:
      return state;
  }
}
