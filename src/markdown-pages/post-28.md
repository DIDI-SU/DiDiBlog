---
slug: "/javascripts-28"
date: "2022-08-17"
title: "모던 자바스크립트 딥다이브 CH24"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# #24

# 클로저

## 정의

> A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**).

클로저는 ‘둘러싸여진 상태의 참조’ 와 함께 다발로 묶여진 함수의 조합으로 이는 **내부 함수로부터 외부 함수에 접근 권한을 주는 것을 의미**합니다. 동시에 클로저의 생성 시점은 함수가 생성된 시점에, 언제나 생성됩니다.

이제 이러한 정의를 한번 예제를 통해 확인해볼까요?

### 예시

```javaScript
const x = 1;

function outerFunc() {
  const x = 10;

  function innerFunc() {
    console.log(x); // 10
  }

  innerFunc();
}

outerFunc();
```

클로저는 함수가 생성된 시점에 생성되므로, 현재 `outerFunc()` 가 선언된 시점에 이미, `outerFunc()` 와 전역 컨텍스트 사이의 클로저가 생성되게 됩니다. 이후 `innerFunc()` 를 선언한 시점에서 `innerFunc()` 와 `outerFunc()` 사이의 클로저가 성립되게 됩니다. 결국 클로저는 함수가 선언된 렉시컬 환경 즉 `outerEnvironmentReference` 가 관련이 되어 있다는 것을 확인할 수 있습니다.

## 렉시컬 스코프

### 정의

렉시컬 스코프란, 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 위치에 의해 결정되는 것으로 아래의 예시를 통해 정의를 확인해볼까요?

### 예시

```javaScript
const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```

foo와 bar은 결국 1이라는 값을 얻게 됩니다. 그 이유는 **함수를 어디에서 호출하는 지는 함수의 상위 스코프 결정에 아무런 영향을 미치지 못하기 때문입니다**. 즉 함수의 상위 스코프는 함수를 정의 한 위치에 의해 정적으로 결정 되는 것이디 때문에, foo의 상위 스코프는 전역컨텍스트가 가,bar의 상위 스코프 역시 전역컨텍스트가 되어 1이라는 값을 출력하게 되는 것입니다.

## 함수 객체 내부 슬롯

함수는 정의된 위치와, 호출되는 위치는 다를 수 있습니다. 그래서 **함수는 정의된 위치를 기억 함과 동시에 상위 스코프를 기억하기 위해, 자신의 내부 슬롯 `[[Environment]]` 에 자신의 상위 스코프의 참조를 저장**하게 됩니다.

아래의 예시를 통해 위의 이야기를 확인해볼까요?

### 예시

```javaScript
const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```

위의 예시와 동일한 코드이나, 이번에는 조금 다르게 설명해 보겠습니다.

```javaScript
const x = 1;
foo();
bar();
```

그런데 이때 함수 `foo()` 와 `bar()` 가 생성이 되는 시점에 내부 슬롯 `[[Environment]]`

에 상위 스코프인(`window` )를 저장하도록 되어 있어, 이후 함수가 호출 되는 시점에는 저장된 상위 스코프의 값을 사용하게 되는 것입니다.

결국 함수 객체의 내부 슬롯`[[Environment]]` 에 저장된 렉시컬 환경의 참조는 함수가 생성된 당시의 상위 스코프로, 함수 객체는 이러한 내부 슬롯`[[Environment]]` 에 저장된 상위 스코프를 자신이 존재하는 한 기억하게 됩니다.

## 클로저와 렉시컬 환경

### 예시

```javaScript
const x = 1;
function outer() {
  const x = 10;
  const inner = function () {
    console.log(x);
  };
  return inner;
}

const innerFunc = outer();
innerFunc();
```

현재 위 코드의 결과는 10이 나오게 됩니다. 한번 그 이유를 살펴볼까요? 두 함수만 한번 확인해 볼까요?

```javaScript
function outer() {
  const x = 10;
  const inner = function () {
    console.log(x);
  };
  return inner;
}

const innerFunc = outer();
innerFunc();
```

현재 함수 실행 컨텍스트에는 `outer` 과 `inner` 가 존재하게 되었습니다. 현재 `inner` 라는 함수의 상위 스코프는 `oueter` 함수이기 때문에 `inner` 의 `[[Environment]]` 에는 `outer` 함수의 렉시컬 환경이 담기게 됩니다. 결국 `inner` 을 반환하며 x를 출력하라 할때 , `inner` 에서는x가 존재하지 않아, 그 상위인 `outer` 안의 x가 되는 것입니다.

그림으로 표현한다면 아마 아래와 같은 모습이 될 것 입니다.

![Untitled](#24%206f4f6fcdfacd4a8ab71c4411fa3444b0/Untitled.png)

결국 이미 종료가 되어 실행 컨텍스트에서 제거된 , outer의 변수를 참조하게 되어 inner는 10이라는 값을 출력하게 됩니다. 이렇게 **외부 함수보다 중첩함수(내부함수)가 오래 유지되는 경우 , 즉 클로저는 내부 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있는 것**을 이야기 합니다.

그런데 여기서 왜 이미 실행 컨텍스트에서 제거된 함수의 환경을 그대로 참조할 수 있는 걸까요?

이는 inner 함수내의 `[[Environment]]` 에서 여전히 `outer` 의 렉시컬 환경을 참조하고 있어 참조 카운트가 0이 되지 않아 가비지 컬렉팅되지 않게 되기 때문입니다.

### 모든 함수가 클로저일까?

답은 아니다 일 것입니다. 자바스크립트의 모든 함수는 상위 스코프를 기억하므로, 이론적으로 모든 함수는 클로저 이나, 일반적으로는 모든 함수를 클로저라하지 않습니다.

아래의 예제를 통해 확인해볼까요?

### 클로저가 아닌 예제

```javaScript
function foo() {
  const x = 1;
  const y = 2;

  // 일반적으로 클로저라고 하지 않는다.
  function bar() {
    const z = 3;

    debugger;
    // 상위 스코프의 식별자를 참조하지 않는다.
    console.log(z);
  }

  return bar;
}

const bar = foo();
bar();

//아래의 경우에는 내부 함수가 먼저  소멸 되는 것을 확인할 수 있습니다
function foo() {
  const x = 1;

  // 일반적으로 클로저라고 하지 않는다.
  // bar 함수는 클로저였지만 곧바로 소멸한다.
  function bar() {
    debugger;
    // 상위 스코프의 식별자를 참조한다.
    console.log(x);
  }
  bar();
}

foo();
```

### 클로저인 예제

```javaScript
function foo() {
  const x = 1;
  const y = 2;

  // 클로저
  // 중첩 함수 bar는 외부 함수보다 더 오래 유지되며 상위 스코프의 식별자를 참조한다.
  function bar() {
    debugger;
    console.log(x);
  }
  return bar;
}

const bar = foo();
bar();
```

클로저는 결국 중첩 함수가 상위 스코프의 식별자를 참조하고 있고, 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정되는 것이 일반적이라 할 수 있습니다. 즉 외부변수를 내부 변수가 참조할 경우에만 클로저가 된다는 것을 유의해야 합니다.

또한 브라우저가 클로저가 참조 하고있는 식별자만 기억하므로 y는 기억하지 않습니다.

<aside>
💡  그런데 활용 부분은 여전히 ??? 싶어서 일단은 스킵하기로 했습니당!!11

</aside>
