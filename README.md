# tutoring_helper 과외 관리 앱 개발

## 스택
React Native, TypeScript, Redux
react-navigation, native-base, immer

## 코딩 가이드라인

### 앉자마자 할 일 (핸드폰으로 하는 경우)
1. 핸드폰 연결
2. react-native run-android

### 에러 발생 시 해볼 것
- cd ./android ; ./gradlew clean ; cd .. ; react-native run-android
- 새로 사용한 모듈에 대한 @types 모듈 설치했는지 확인하기 (ex: react-redux -> @types/react-redux)

### 하루 일과 끝나면 할 일
1. 


### 📢 커밋 메세지 적는 법
ex) 2020-07-08 FormWrapper 컴포넌트에 TypeScript 추가 완료

- 날짜(2020-07-08 형식) + 작업 내용 + 작업 키워드
- 작업 키워드의 종류
  - 완료
  - 확인
  - 구현
  - 추가
  - 삭제
  - 리팩토링
  - 적용
- 프레임워크, 라이브러리, 디펜던시 이름의 영문명을 그대로 쓰기
- 구현한 컴포넌트, 함수, 상수, 모델 등의 이름도 영문명을 그대로 쓰기
- 즉, React, `react-navigator` 등 고유명사는 그냥 영문명을 그대로 쓰기
- 많이 사용하는데 긴 이름 (ex: PWA(Progressive Web App), RN(React Native)) 의 경우 사전에 추가하고 약자로 쓰기

# 파일 구조 설명

## redux 도입하면서 ducks 구조로 변경함

디렉토리 설명
- common
- component
- container
- states

## redux 사용 방법 설명
- immer, redux-actions 사용

### FSA 형식이란?
다음과 같은 순수 자바스크립트 객체 액션을 말함 ([] 안의 키는 없어도 됨)
{
  type: <actionType>,
  [payload]: <액션에서 사용할 파라미터 모은 객체>,
  [error]: <에러 발생 시 사용할 값>,
  [meta]: <상태 변화에서 참고할만한 값>
}

데이터에 고유 id 를 주는 작업은 리듀서에서 발생하면 안되고, 액션이 스토어에 디스패치 되기 전에 이뤄져야 합니다.