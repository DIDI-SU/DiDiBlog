---
slug: "/javascripts-13"
date: "2022-06-20"
title: "모던 자바스크립트 딥다이브 CH13"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# #13

# 변수의 유효 범위 스코프

### 정의

모든 식별자는 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정되며, 이를 스코프라 합니다. 결국 스코프는 식별자가 유효한 범위를 이야기하는 것이지요.

```jsx
function add(x, y) {
  console.log(x, y); // 2 5
  return x + y;
}

add(2, 5);
console.log(x, y); // ReferenceError: x is not defined
```

위의 코드의 함수의 매개변수는 함수 몸체 내부에서만 참조할 수 있습니다. 즉 매겨변수 `X,Y` 의 스코프는 함수 몸체 내부가 됩니다. 그렇기 때문에 함수 외부에서 x,y를 사용하고자 하면 `ReferenceError: x is not defined` 와 같은 에러가 발생하게 됩니다.

아래와 같은 함수는 어떻게 작동할까요?

```jsx
var x = "global";

function foo() {
  var x = "local";
  console.log(x); // ①
}

foo();

console.log(x);
```

1. `console.log(x)` 는 아마 `local` 을 출력할 것 입니다
2. 제일 하단의 `console.log(x);` 는 `global` 을 출력할 것이고요.

자바스크립트 엔진은 **식별자 결정을 통해어떤 변수를 참조할지 결정**하게 됩니다. 그래서 **스코프를 식별자를 검색할 때 사용하는 규칙**이라고도 할 수 있습니다.

즉 가장 처음에 선언된 x는 어디에서라도 참조할 수 있지만, 스코프가 있기 때문에 함수 내부의 x와 외부의 x가 서로 충돌 없이 , 각각의 위치에서 각각의 역할을 할 수있게 되는 것입니다.

## 스코프의 종류

코드는 지역과 전역으로 구분할 수 있습니다. 변수는 자신이 선언된 위치에 의해 자신이 유효한 스코프가 결정되게 됩니다. 전역에서 선언된 변수는 전역변수가, 지역에서 선언된 변수는 지역 변수가 되는 것이지요.

### 전역과 지역

전역은 코드의 가장 바깥 영역을 이야기하며, 전역은 또한 전역 스코프를 만듦니다. 결정적으로 **전역 변수는 어디서든지 참조할 수 있습니다**.

반면 **지역은 함수 몸체내부**를 이야기합니다. 지역도 전역처럼 자신만의 스코프를 만듦니다, 하지만 지역변수는 어디서든 참조할 수 있는 **전역변수와는 달리 지역변수는 자신의 지역 스코프와 하위 지역 스코프에 유효**합니다.

## 스코프 체인

스코프 체인은, 스코프가 계층 적으로 서로 연결 된 것을 이야기합니다. 그런데 여기서 계층적으로 연결된다는 것은 어떤의미일까요?

함수가 중첩될 수있는 것 처럼, 함수의 지역 스코프 역시 중첩 될 수 있습니다. 아래의 함수를 통해 확인해볼까요?

```jsx
var x = "global x";
var y = "global y";

function outer() {
  var z = "outter local z";
  console.log(x); //global x
  console.log(y); //global y
  console.log(z); //outter local z
  function inner() {
    var x = "outter local x";

    console.log(x); //outter local x
    console.log(y); //global y
    console.log(z); //outter local z
  }
  inner();
}
outer();

console.log(x); //global x
console.log(z); //z is not defined
```

현재 위의 함수는 `outer` 과 `inner` 라는 함수가 중첩이 되어있는 형태를 보이고 있습니다.

1. 전역

```jsx
var x = "global x";
var y = "global y";
outer;
inner;
console.log(x); //global x
console.log(z); //z is not defined
```

1. 지역

```jsx
function outer() {
  var z = "outter local z";
  console.log(x); //global x
  console.log(y); //global y
  console.log(z); //outter local z
  function inner() {
    var x = "outter local x";

    console.log(x); //outter local x
    console.log(y); //global y
    console.log(z); //outter local z
  }
  inner();
}
outer();
```

대략적으로 전역과 지역을 나누어 보았습니다. 그런데 현재의 계층은 아래와 같은 형태를 보이고 있습니다

| 전역       |
| ---------- |
| outer 지역 |
| inner 지역 |

inner의 상위는 outer , outer의 상위는 전역의 모습을 보이고 있습니다. 그런데 변수를 참조할 때 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작해, 상위 스코프 방향으로 이동하며 선언된 변수를 검색합니다. 즉 inner에서 변수를 사용하려 하면 그상위인 outer을 검색하고, 그 내부에서 없으면 전역까지 올라가 검색을 해 참조한다는 것이지요.

하지만 여기서 중요한 점은, 상위 스코프에 존재하는, 유효한 변수는 하위 스코프에서 자유롭게 참조할 수 있지만, 그 반대로, 하위에 존재하는, 유요한 변수는 상위 스코프에 참조할 수 없다는 것을 유의해 주어야합니다.

## 함수레벨 스코프

스코프는 코드 블록이 아닌, 함수에 의애허만 지역 스코프에 생성됩니다. 즉 함수 코드의 블록 만들 지역 스코프로 인정한 다는 것이며, 이를 함수 레벨 스코프라 하는 것입니다

```jsx
var x = 1;

if (true) {
  // var 키워드로 선언된 변수는 함수의 코드 블록(함수 몸체)만을 지역 스코프로 인정한다.
  // 함수 밖에서 var 키워드로 선언된 변수는 코드 블록 내에서 선언되었다 할지라도 모두 전역 변수다.
  // 따라서 x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
  // 이는 의도치 않게 변수 값이 변경되는 부작용을 발생시킨다.
  var x = 10;
}

console.log(x); // 10
```
