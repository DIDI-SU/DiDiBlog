---
slug: "/blog/javascripts-17"
date: "2022-06-20"
title: "모던 자바스크립트 딥다이브 CH17"
tags: ["JavaScript", "ALL"]
---

# #17

# 생성자 함수에 의한 객체 생성

[이전](post-10.md)에는 개체 리터럴에 의한 객체 생성 방식을 살펴 보았다면, 이번에는 생성자 함수를 이용해 객체를 생성하는 방식에 대해 확인해 보겠습니다.

## Object 생성자 함수

new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성해 반환합니다 .

즉 아래의 코드는 둘다 동일한 것을 반환한 다는 것 이지요.

```jsx
const person = new Object();
const person2 = {};
```

그런데 여기서 생성자 함수란 new 연산자와 함께 호출해 객체(인스턴스)를 생성하는 함수를 이야기합니다. 즉 **생성자 함수에 의해 생성된 객체를 인스턴스**라 합니다. 자바스크립트는 Obejct 이외에도 String,Number,Boolean,Function,Array,Date,RegExp,Promise 등의 빌트인 생성자 함수를 제공합니다.

예를 들어 아래의 String을 생성자 함수로 만드는 경우에는 , String 객체에 해당하는 메소드들을 사용할 수 있습니다.

```jsx
const strObj = new String("Lee");
console.log(typeof strObj); // object
console.log(strObj); // String {"Lee"}
```

## 생성자 함수

### 객체 리터럴에 의한 객체 생성 방식의 문제점

```jsx
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle2.getDiameter()); // 20
```

객체 리터럴에 의한 생성 방식은 단편하지만, 단 하나의 객체를 형성 한다는 단점이 존재해 , 동일한 프로퍼티를 갖는 객체를 여러개 작성해야하는 경우에는 위와 같이 코드를 반복해 주어야하는 문제가 발생합니다. 이는 한두개라면 크게 문제가 발생하지 않겠지만 그 수가 많아 지면서, 실수가 발생하고 엉킬 문제가 생깁니다.

### 생성자 함수에 의한 객체 생성 방식의 장점

생성자 함수에 의한 객체 생성 방식은 마치 객체(인스턴스)를 생성하기 위한 템플릿(클래스) 처럼 생성자 함수를 사용해, 프로퍼티구조가 동일한 객체 여러개를 생성 할 수 있습니다.

🤔 뭔가 class 같다는 생각이 들긴했는데 그 개념에 조금 가까운 것같은데 그런데 그러면 js 에서 class는 뭐지 ???

위의 코드는 아래와 같이 표현 될 수 있습니다

```jsx
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스의 생성
const circle1 = new Circle(5); // 반지름이 5인 Circle 객체를 생성
const circle2 = new Circle(10); // 반지름이 10인 Circle 객체를 생성

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

하지만 자바스크립트에서는 생성자 함수를 사용할 때 new 없이 사용한다면, 일반 함수로 동작하게 됩니다.

### 생성자 함수의 인스턴스 생성 과정

1. 인스턴스 생성과 this 바인딩

암묵적으로 빈객체가 생성되고, 그 객체는 인스턴스가 됩니다. 그리고 그 인스턴스는 this에 바인딩 됩니다. 그래서 생성자 함수 내의 this가 생성자 함수가 생성할 인스턴스를 가르키게 됩니다.

```jsx
function Circle(radius) {
  // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩된다.
  console.log(this); // Circle {}

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

현재 this 는 Circle을 가르키고 있습니다.

1. 인스턴스 초기화

```jsx
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
```

생성자 함수의 코드가 한줄씩 실행 되어 this에 바인딩 되어있는 인스턴스를 초기화 합니다. this에 바인딩 되어있는 인스턴스(radius) 나 메소드(gst~) 을 추가하고 인수로 전달 받은 초 기값을 할당 해줍니다

1. 인스턴스 반환

함수 내부에 모든 처리가 완료 되면, 인스턴스가 바인딩 된 this가 암묵적으로 반환 됩니다.

```jsx
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다
// return 2 * this.radius; <- 반환
```

만약 this 가아닌 다른 객체를 명시적으로 반환한다면 return 문에 명시한 객체가 반환 됩니다. 그렇기 때문에 생성자 함수의 경우 생성자 함수의 역할로 사용해 주는 것이 좋습니다 🙂

### 내부 메서드 [[Call]] 과 [[Constructor]]

함수는 객체 이므로 일반 객체와 동일하게 동작할 수 있습니다. 즉 이는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있다는 것을 의미합니다.

하지만 일반 객체와는 다르게, 일반 객체는 호출 할 수 없지만 함수는 호출할 수 있습니다.

함수는 [[Environment]], [[FormalParameter]] 등의 내부 슬롯과 [[Call]] 과 [[Constructor]] 같은 내부 메서드를 추가로 가지고 있습니다. 함수가 **일반 함수로 호출되면 [[Call]]** 이 호출 되고 **new 연산자와 함께 호출되면 [[Constructor]]** 가 호출 됩니다.

그런데 이때 [[Call]]을 갖는 함수 객체를 callable ,[[Constructor]] 지니는 함수 객체를 constructor 지니지 않는 객체를 non-constructor라고 합니다. 결국 호출 할수 있는객체를

callable, 생성자로 호출할 수 있는 함수를 constructo 생성자 함수로 호출할 수 없는 객체를

non-constructor라고 하는 것 입니다

<aside>
💡 하지만 결국 모든 함수는  callable으로, 호출이 가능하므로 우리는 constructo과  non-constructor 의 차이에 대해서 확인해 보겠습니다

</aside>

### constructor - non-constructor

```jsx
// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo() {}
const bar = function () {};
// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수다. 이는 메서드로 인정하지 않는다.
const baz = {
  x: function () {},
};

// 일반 함수로 정의된 함수만이 constructor이다.
new foo(); // -> foo {}
new bar(); // -> bar {}
new baz.x(); // -> x {}

// 화살표 함수 정의
const arrow = () => {};

new arrow(); // TypeError: arrow is not a constructor

// 메서드 정의: ES6의 메서드 축약 표현만을 메서드로 인정한다.
const obj = {
  x() {},
};

new obj.x(); // TypeError: obj.x is not a constructor
```

- constructor : 함수 선언문, 함수 표현식, 클래스
- non-constructor : 메서드(es6 메서드 축약) 화살표

그런데 이때 callable 이면서 constructor을 지닌 일반함수에 new 연산자를 붙여 호출하게 되면, 생성자 함수 처럼 동작하게 됩니다.

만약 반대로 생성자 함수를 일반 함수 처럼 호출하는 경우 어떻게 될까요? , 그경우 일반 함수로 호출되어, 내부의 this가 전역 객체인 window를 가르키게 됩니다
