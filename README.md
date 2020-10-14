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

### 브랜치 만들기

git flow 모델에 따라 브랜치를 나눈다

- dev
- feature/ 는 기능별로 dev로부터 갈라져나온 브랜치이다
  ex) feature/navigation

- master 는 실행 가능해야한다
  master에 합칠 때에는 --no-ff 설정을 통해 패스트 포워드 없이 merge를 진행한다

[아직은 신경 안써도 됨]

- release/
- hotfixes/

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

- immer, redux-thunk 사용

### FSA 형식이란?

다음과 같은 순수 자바스크립트 객체 액션을 말함 ([] 안의 키는 없어도 됨)
{
type: <actionType>,
[payload]: <액션에서 사용할 파라미터 모은 객체>,
[error]: <에러 발생 시 사용할 값>,
[meta]: <상태 변화에서 참고할만한 값>
}

## APK 만들기

java -jar "C:/Users/[username]/Desktop/tutoring_helper/bundletool-all-1.1.0.jar" build-apks --bundle="C:/Users/tyler/Desktop/tutoring_helper/android/app/build/outputs/bundle/release/app-release.aab" --output="C:/Users/tyler/Desktop/tutoring_helper/app.apks" --mode=universal
