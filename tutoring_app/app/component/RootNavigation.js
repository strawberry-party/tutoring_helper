import * as React from 'react';

export const navigationRef = React.createRef();

// TODO: typescript로 바꾸면 에러 남: 'navigationRef.current' is unknown

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
