import { TagType } from '../types/root';
import _ from 'lodash';
import produce from 'immer';

interface TagState {
  selectedTagId: string;
  tags: Map<string, TagType>;
}

const initialState = {
  selectedTagId: 'none',
  tags: new Map<string, TagType>([
    ['none', new TagType()],
    ['java', new TagType('JAVA', { backgroundColor: 'pink' })],
    // ['EE209', new TagType('전자공학을 위한 프로그래밍 구조론', {backgroundColor: 'yellow'})],
  ]), // TODO: defaultTag, tag1 넣기
};

// action type
type TagAction =
  | ReturnType<typeof selectTag>
  | ReturnType<typeof addTag>
  | ReturnType<typeof removeTag>
  | ReturnType<typeof editTag>;

const TAG_SELECT = 'SELECT_TAG' as const;
const TAG_ADD = 'TAG_ADD' as const;
const TAG_EDIT = 'TAG_EDIT' as const;
const TAG_REMOVE = 'TAG_REMOVE' as const;

// action constructor
// tag CRUD

// global tag selecting action for tag edit start
export const selectTag = (id: string) => ({
  type: TAG_SELECT,
  id: id,
});

export const addTag = (tag: TagType) => ({
  type: TAG_ADD,
  tag,
  id: _.uniqueId('tag_'),
});

export const removeTag = (id: string) => ({
  type: TAG_REMOVE,
  id: id,
});

export const editTag = (id: string, tag: TagType) => ({
  type: TAG_EDIT,
  id,
  tag,
});

// actions
export const actions = {
  selectTag,
  addTag,
  removeTag,
  editTag,
};

// reducer
const tagReducer = (state: TagState = initialState, action: TagAction) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TAG_SELECT:
        draft.selectedTagId = action.id;
        break;
      case TAG_ADD:
        console.warn('draft tag set' + action.tag.name);

        draft.tags.set(action.id, action.tag);
        break;
      case TAG_EDIT:
        draft.tags.set(action.id, action.tag);
        // TODO: 렌더링 안되면 주석 해제
        // draft.tags = new Map(draft.tags);
        break;
      case TAG_REMOVE:
        draft.tags.delete(action.id);
        break;

      default:
        break;
    }
  });

export default tagReducer;
