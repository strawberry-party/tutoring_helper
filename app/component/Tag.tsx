import { Chip, TextInput } from 'react-native-paper';
import { Icon, Input } from 'native-base';
import React, { useState } from 'react';

import { TagType } from '../types/root';
import { Text } from 'react-native';

interface TagProps {
  tag: TagType;
  style: any;
  id: string;
}

export default function Tag({ tag, style, id }: TagProps) {
  return (
    <Chip
      style={[tag.style, style]}
      onPress={() => console.log(`${id} 가 눌림`)}>
      {tag.name}
    </Chip>
  );
}

export function TagForm({ style }) {
  return (
    <Chip
      style={[style, { flexDirection: 'row' }]}
      onPress={() => console.log('뭔가 바꾸시겠습니까')}>
      <TextInput
        style={{
          fontSize: 14,
          height: 17,
        }}
        underlineColor="transparent"
        placeholder="만들기"
        onSubmitEditing={() => console.log('제출 구현해야함')}
      />
    </Chip>
  );
}
