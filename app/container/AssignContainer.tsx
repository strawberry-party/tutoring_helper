import { useDispatch, useSelector } from 'react-redux';

import Assign from '../component/Homework/Assign';
import React from 'react';
import { RootState } from '../states';
import { actions } from '../states/assignState';

const toBeImplemented = (id: any) => alert(id + ': not yet implemented!');

function AssignContainer() {
  const assign = useSelector((state: RootState) => state.assignReducer.assign);
  const dispatch = useDispatch();

  const onComplete = (id: string) => {
    dispatch(actions.completeAssign(id));
  };

  const onIncomplete = (id: string) => {
    dispatch(actions.incompleteAssign(id));
  };

  const onRemove = (id: string) => {
    toBeImplemented(id);
  };

  const updateAssign = (id: string) => {
    toBeImplemented(id);
  };

  return (
    <Assign
      {...assign}
      onComplete={onComplete}
      onIncomplete={onIncomplete}
      onRemove={onRemove}
      updateAssign={}
    />
  );
}

export default AssignContainer;
