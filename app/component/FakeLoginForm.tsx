import * as React from 'react';

import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

function Login() {
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState(false);
  const onSubmit = () => {
    if (text !== 'hello') {
      console.log('wrong feedback');
      setError(true);
    } else {
      console.log('right feedback');
      setError(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>안녕하세요. 딸기과외입니다. </Text>
      <TextInput
        mode="outlined"
        label="베타 테스터 코드를 입력하세요"
        value={text}
        onChangeText={(text) => setText(text)}
        style={styles.textInputStyle}
        error={error}
      />
      <Button icon="login" mode="contained" onPress={onSubmit}>
        입장하기
      </Button>
    </View>
  );
}

// TODO: 구글 로그인 및 페이크 로그인 state 추가

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },

  textStyle: {
    color: 'purple',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 26,
    marginBottom: 20,
  },

  textInputStyle: {
    color: 'purple',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 20,
  },
});
