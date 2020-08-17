import React, { useState } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';

function CheckingProgress(props) {
  const data = props.content;
  const [state, setState] = useState({data})
  const checkboxItem = state.data.map(item => <CheckBox key={item.id} title={item.title} checked={item.isDone} onPress={() => {
    const newState = state.data.map(newItem => newItem.id === item.id ? {...newItem, isDone: !newItem.isDone} : newItem)
    setState({data: newState}) 
  }}/>)
  
  return (
    <View>
      {checkboxItem}
    </View>
  );
}

export default CheckingProgress;
