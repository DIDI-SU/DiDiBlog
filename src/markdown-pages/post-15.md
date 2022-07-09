---
slug: "my-seventh-post"
date: "2022-06-20"
title: "모던 자바스크립트 딥다이브 CH14&15"
tags: ["JavaScript", "ALL"]
---

# # 14&#15

# 전역 변수의 문제점

## 변수의 생명 주기

### 지역 변수와 전역 변수

지역 변수의 생명 주기는 함수의 생명 주기와 일치하며 var 키워드로 선언한 전역 변수의 생명 주기는 전역 객체의 생명 주기와 일치합니다.

## 전역 변수의 문제점

### 암묵적 결합

전역 변수는 코드 어디서든 참조할 수 있고 할당이 가능하기 때문에, 의도치 않게 상태개 변경 될 수 있는 암묵적 결합이 발생할 수 있습니다

### 긴 생명 주기

전역 변수는 생명 주기가 길어, 메모리 리소스도 오랜기간 소비 합니다. 지역 변수는 그와 반대로, 생명 주기가 짧기 때문에 메모리 리소스도 짧은 기간만 소비합니다

### 스코프 체인상에서 종점에 존재

스코프 체인상에 가장 종점에 존재합니다. 즉 전역 변수의 검색 속도가 가장 느립니다

### 네임 스페이스 오염

자바스크립트에서 파일이 분리되어 있어도, 하나의 전역 스코프를 공유하고 있기; 때문에 이 역시 의도치 않게 상태가 변경 될 수 있는 위험이 존재합니다.

# let,const 키워드와 블록레인 스코프

## var 키워드로 선언한 변수의 문제점

### 변수의 중복 허용

```jsx
var x = 1;
var y = 1;
// **초기화 문이 있는 경우에는  var 키워드가 없는 것 처럼 동작
//x=100;<- 처럼 진행**
var x = 100;
//무시
var y;

console.log(x); // 100
console.log(y); //1
```

var로 선언한 변수 x와y는 중복 선언이 가능합니다. 이때 중복 선언을 했을때 초기화문의 존재에 따라서 조금 다르게 동작하게 됩니다. **초기화 문이 있는 경우에는 var 키워드가 없는 것 처럼 동작**하고**, 초기화 문이 없는 변수 선언문은 무시**됩니다.

### 함수 레벨 스코프

var로 선언된 변수는 오로지 함수 코드 블록만을 지역 스코프로 인정합니다. 그래서 함수 외부에서 var로 선언한 변수는 코드 블록 내에서도 선언해도 모두 전역 변수가 됩니다.

결국 이는 전역 변수를 남발하게 되어, 전역변수가 중복 선언되는 경우가 발생할 수 도 있습니다

### 변수 호이스팅

var로 변수를 선언하면, 변수 호이스팅이 발생하게 됩니다. 즉 변수 호이스팅에 의해 var 키워드로 선언한 변수는 변수 선언 이전에 참조할 수 있습니다. 단 할 당문 이전에 변수를 참조하면 `undefined` 를 반환하게 됩니다

## let 키워드

### 변수 중복 선언 금지

let 키워드로 이름이 같은 변수를 중복 선언하는 경우에는, 문법 에러가 발생하게 됩니다

### 블록 레벨 스코프

let 키워드로 선언한 변수는 모든 블록을 지역 스코프로 인정하는 블록레벨 스코프를 따르게 됩니다.

### 변수 호이스팅

let 키워드로 선언한 변수의 경우 변수 호이스팅이 발생하지 않는 것 처럼 동작하게 됩니다.

```jsx
console.log(foo); // ReferenceError: foo is not defined
let foo;
```

위와 같이 let 키워드로 선언한 변수를 변수 선언문 이전에 참조하면, 참조에러가 발생하게 됩니다.

### TDZ와 변수 호이스팅

**var키워드로 선언한 변수**의 경우, 런타임 이전에 자바스크립트 엔진에 의해서 암묵적으로 **선언과 초기화 단계가 한번에 진행**됩니다.

1. 선언

```jsx
console.log(foo); // undefined

var foo;
console.log(foo); // undefined
```

이 단계에 스코프에 변수 식별자를 등록해 자바 스크립트 엔진에 변수 존재를 알려, 즉시 초기화 단계를 통해 변수에 `undefined` 로 변수를 초기화 합니다.

1. 할당

```jsx
foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```

이후 할당을 통해서 사용할 숫자 문자열 등등을 할당해 사용해 줍니다

하지만 let 키워드로 **선언한 변수는 선언 단계와 초기화 단계가 분리 되어 진행**됩니다.그래서 만약 초기화 단계가 실행되기 이전에 변수에 접급하려 하면, 참조 에러가 발생하게 됩니다. 이때 **선언과 초기화 단계 사이의 참조 할 수 없는 구간을 일시적 사각지대** 라 부릅니다

1. 선언

```jsx
// 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다.
// 초기화 이전의 일시적 사각 지대에서는 변수를 참조할 수 없다.
console.log(foo); // ReferenceError: foo is not defined

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
```

위의 경우 foo로 선언은 되어있으나, 아직 초기화가 진행 되지 않아 TDZ로 인해 에러가 발생한 모습입니다. 이제 선언 이후에 foo를 출력하면 초기화가 되어 아래와 같은 모습을 볼 수 있습니다

1. 초기화

```jsx
let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined
```

할당단계에서는 var 과 동일합니다. 그런데 이와같은 흐름을 보았을 때 let의 경우 호이스팅이 발생하지 않는 것 처럼 보이지만. 그렇지 않습니다.

```jsx
let foo = 1; // 전역 변수

{
  console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
  let foo = 2; // 지역 변수
}
```

만약에 foo를 출력 했을때, 변수 호이스팅이 발생하지 않는다면, 1이라는 전역 변수를 출력해야하지만 현재 `ReferenceError: Cannot access 'foo' before initialization` 라는 에러가 발생하고 있는 것을 통해 호이스팅이 발생하는 것을 확인할 수 있습니다.

## const

const의 경우에는 let 과 동일한 특징을 지니고 있어, 아래와 같은 차이점을 지니고 있습니다

### 선언과 초기화

const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화 해야 합니다. 그렇지 않으면 아래와 같은 오류를 만나게 됩니다

```jsx
const foo; // SyntaxError: Missing initializer in const declaration
```

const 역시 블록 레벨 스코프를 가지며 호이스팅이 발생하지 않는 것처럼 동작합니다.

### 재할당 금지

const로 선언된 변수는 재할당이 금지됩니다

### 상수

const는 주로 상수를 표현하는데 사용되며, 이때 상수는 재할당이 금지된 변수를 이야기합니다.

const 상수에 원시값을 할당하는 경우에는, 원시값은 이미 변경 불가능 하다는 특징을 지녀, 할당된 값을 변경할 수 있는 방법은 없습니다

하지만 객체의 경우에는 변경이 가능합니다. const는 키워드는 재할당을 금지할뿐 값 자체의 불변성을 의지하지 않습니다