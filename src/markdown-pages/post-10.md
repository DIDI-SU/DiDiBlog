---
slug: "/blog/javascripts-10"
date: "2022-06-20"
title: "모던 자바스크립트 딥다이브 CH10"
tags: ["JavaScript", "ALL"]
---

# #10

## 객체

자바스크립트는 객체 기반의 언어로 자바스크립트를 구성하는 거의 모든 것이 객체 입니다.

### 정의

객체타입은 다양한 타입의 값을 하나의 단위로 구성한 복합적인 자료 구조로, 원시 값은 변경이 불가능 하나, 객체는 변경 가능한 값입니다.

### 객체의 형태

```jsx
var person = {
  name: "Lee",
  age: 20,
};
```

객체는 0개 이상의 프로퍼티로 구성된 집단이며, 여기서 프로퍼티는 `name:Lee` 로, 키와 값 으로 구성되어 있습니다. 자바스크립트 내에서 모든 값은 프로퍼티값이 될 수 있으며, 함수 역시 값으로 취급될 수 있습니다. 하지만 이때 함수가 프로퍼티가 되는 경우에는 이를 메서드라 부릅니다.

### 객체 리터럴

객체 리터럴은 자바스크립트에서 객체를 형성하는 하나의 방법으로, 중괄호({…}) 내에 0개 이상의 프로퍼티를 정의합니다. 변수에 할당되는 시점에 자바스크립트 엔진은 객체 리터럴를 해석해 객체를 생성합니다

```jsx
var person = {
  name: "Lee",
  sayHello: function () {
    console.log(`Hello! My name is ${this.name}.`);
  },
};

console.log(typeof person); // object
console.log(person); // {name: "Lee", sayHello: ƒ}
```

중괄호 내에 프로퍼티를 정의하지 않으며, 빈객체가 생성됩니다. 하지만 이전의 단순 코드 블록과는 달리, 객체 리터럴은 값으로 이용되므로, 세미콜론이 붙어 사용됩니다.

### 프로퍼티

객체는 프로퍼티의 집단이며 프로퍼티는 키와 값으로 구성됩니다

```jsx
var person = {
  name: "Lee",
  age: 20,
};
```

여기서 키는 name 값은 Lee 가 됩니다. 프로퍼티의 키는 빈 문자열을 사용하는 모든 문자열 혹은 심벌이되고, 값의 경우 자바스크립트에서 사용할 수 있는 모든 값을 이야기합니다.

### 프로퍼티 접근

프로퍼티는 두가지 방법을 이용해 접근할 수 있습니다

두가지 표현법은 대괄호 표기법과 마침표 표기법으로,아래와 같이 이용해 줄 수 있습니다

```jsx
var person = {
  name: "Lee",
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person["name"]); // Lee
```

대괄호 표기 법의 경우에는, 대괄호 내부에 작성되는 키는 반드시 따옴표로 감싼 문자열이여갸 합니다. 만약 감싸주지 않는 경우에는 키를 찾지 못해 undefined 를 반환하게 됩니다

### 메서드

<aside>
💡  메서드를 콜백함수로 넣어준다면, 그게 메서드가 아닐 수 도있을 것 같음!

</aside>

```jsx
var circle = {
  radius: 5, // ← 프로퍼티

  // 원의 지름
  getDiameter: function () {
    // ← 메서드
    return 2 * this.radius; // this는 circle을 가리킨다.
  },
};

console.log(circle.getDiameter()); // 10
```

여기서 메서드는 `getDiameter` 으로 객체 circle 에 묶여 있는 함수입니다, 여기서 this는 circle을 가르키고 있습니다

### 객체 리터럴 확장 기능 (in ES6)

### 프로퍼티 축약

```jsx
let x = 1,
  y = 2;
var obj = {
  x,
  y,
};
console.log(obj); //{x: 1, y: 1}
```

ES6에서는 프로퍼티 값으로 변수를 사용하는 경우, 변수명과 프로퍼티 키가 동일한 경우 프로퍼티키를 위와같이 생략 할 수 있습니다

### 계산된 프로퍼티명

```jsx
// ES6
const prefix = "prop";
let i = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 프로퍼티 키 동적 생성
const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

이전에는 계산된 프로퍼티 명으로 프로퍼티 키를 동적으로 생성하려면, 외부에서 대괄호 표기법을 이용해 주어야 했으나 es6에서는 위와같이 진행해 줄 수 있습니다

### 메서드 축약

```jsx
var person = {
  name: "Lee",
  sayHello: function () {
    console.log(`Hello! My name is ${this.name}.`);
  },
};
```

원래는 메서드를 위와같이 작성해 주어야 했으나, 축약이 가능해 지면서 아래와 같이 사용이 가능해졌습니다

```jsx
const obj = {
  name: "Lee",
  // 메서드 축약 표현
  sayHi() {
    console.log("Hi! " + this.name);
  },
};

obj.sayHi(); // Hi! Lee
```

<aside>
💡 이때 축약 된 표현으로 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작합니다

</aside>
