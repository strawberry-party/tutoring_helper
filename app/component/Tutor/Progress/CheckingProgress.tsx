import React, { useState } from 'react';

import { CheckBox } from 'react-native-elements';
import { View } from 'react-native';

function CheckingProgress({ contents }) {
  // TODO: 리덕스 사용하도록 수정

  var checkboxItems: Array<JSX.Element> = [];

  for (let [key, item] of contents) {
    checkboxItems.push(
      <CheckBox
        key={key}
        title={item.title}
        checked={item.isDone}
        onPress={() => console.warn('Not yet implemented')}
      />,
    );
  }

  return <View>{checkboxItems}</View>;
}

export default CheckingProgress;
