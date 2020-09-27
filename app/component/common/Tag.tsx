import { Chip, TextInput } from 'react-native-paper';
import { Icon, Input } from 'native-base';
import React, { useState } from 'react';
import { TagInfoType, TagType } from '../../types/root';

import { Text } from 'react-native';
import { selectTag } from '../../states/tagState';

interface TagProps {
  tagInfo: TagInfoType;
  style: any;
  id: string;
  onSelect: any;
  isSelected;
}

export function TagMock({ tagInfo, style, id }) {
  if (tagInfo == undefined) {
    return (
      <Chip onPress={() => console.log('그래도 뭔가 일어나야 하지 않을까')}>
        {'none'}
      </Chip>
    );
  } else
    return (
      <Chip
        style={[tagInfo.style, style]}
        onPress={() => console.log('그래도 뭔가 일어나야 하지 않을까')}>
        {tagInfo.name}
      </Chip>
    );
}

export function FilterChip({
  label,
  selectedStyle,
  unselectedStyle,
  id,
  onSelect,
  isSelected,
}) {
  return (
    <Chip
      style={isSelected ? [selectedStyle] : [unselectedStyle]}
      onPress={() => onSelect(id)}>
      {label}
    </Chip>
  );
}

export default function Tag({
  tagInfo,
  style,
  id,
  onSelect,
  isSelected,
}: TagProps) {
  return (
    <Chip
      style={
        isSelected
          ? [tagInfo.style, style, { borderColor: 'black', elevation: 3 }]
          : [tagInfo.style, style]
      }
      onPress={() => onSelect(id)}>
      {tagInfo.name}
    </Chip>
  );
}

export function TagForm({ style, onAddTag }) {
  const [text, setText] = useState('');

  const onSubmit = () => {
    const newTag: TagType = new TagType(text);
    onAddTag(newTag);
  };

  return (
    <Chip style={[style, { flexDirection: 'row' }]}>
      <TextInput
        value={text}
        onChange={({ nativeEvent: { text } }) => {
          setText(text);
        }}
        style={{
          fontSize: 14,
          height: 17,
        }}
        underlineColor="transparent"
        placeholder="만들기"
        onSubmitEditing={onSubmit}
      />
    </Chip>
  );
}
