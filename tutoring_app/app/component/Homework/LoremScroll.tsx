import React, { Component } from 'react';
import { Text, View } from 'react-native';

export const Lorem = (
  <Text>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla vero quidem
    numquam necessitatibus, ipsum et voluptatem consequatur aperiam reiciendis
    nam temporibus harum voluptatibus officia odio accusantium sit ratione iusto
    officiis!
  </Text>
);

export default class LoremScroll extends Component<any, any> {
  render() {
    const lorems = [...Array(10)].map((e, i) => Lorem);
    return <View>{lorems}</View>;
  }
}
