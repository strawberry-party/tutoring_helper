// action type
export const SET_ADD_MODAL_VISIBILITY = 'SET_ADD_MODAL_VISIBILITY' as const;

type AddAssignAction =
  | ReturnType<typeof showModal>
  | ReturnType<typeof hideModal>;

type AddAssignState = {
  visible: boolean;
};

// action constructor
export const showModal = () => ({
  type: SET_ADD_MODAL_VISIBILITY,
  visible: true,
});

export const hideModal = () => ({
  type: SET_ADD_MODAL_VISIBILITY,
  visible: false,
});

export const actions = {
  showModal,
  hideModal,
};

// reducer
const initialState = {
  visible: false,
};

export default function addModalVisibilityReducer(
  state: AddAssignState = initialState,
  action: AddAssignAction,
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
