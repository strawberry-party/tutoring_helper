import { TagType } from '../types/root';
import _ from 'lodash';
import produce from 'immer';

const initialState = {
  books: []
};

const BOOK_SETUP = 'BOOK_SETUP' as const;

// action constructor
// tag CRUD

// reducer
const bookReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case BOOK_SETUP:
        draft.books = [];
        action.books === undefined ? '' : Object.entries(action.books).reverse().forEach(([key, info]) => {
          draft.books.push({key, info});
        })
        break;
      default:
        break;
    }
  });

export default bookReducer;
