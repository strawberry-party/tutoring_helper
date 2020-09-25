import { Text, View } from 'react-native';
import React from 'react';

function TestResult({ id }) {
  const showResult = result === undefined ? undefined : result.map((item, index) => (
    <Text key={index}>
      {item.desc}: {item.score + '점'}
    </Text>
  ));
  return (
    <View>
      {showResult}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return{};
};

export default connect(mapStateToProps, mapDispatchToProps)(TestResult)
