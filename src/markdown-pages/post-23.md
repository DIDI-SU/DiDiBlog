---
slug: "/javascripts-22"
date: "2022-07-18"
title: "모던 자바스크립트 딥다이브 CH22"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# this

## this 키워드

객체에서, 동작을 나타내는 메서드는 자신이 속한 객체의 프로퍼티를 참조하기 위해서 **자신이 속한 객체를 가리키는 식별자를 참조** 할 수 있어야 합니다.

```javaScript
const circle = {
  // 프로퍼티: 객체 고유의 상태 데이터
  radius: 5,
  // 메서드: 상태 데이터를 참조하고 조작하는 동작
  getDiameter() {
    // 이 메서드가 자신이 속한 객체의 프로퍼티나 다른 메서드를 참조하려면
    // 자신이 속한 객체인 circle을 참조할 수 있어야 한다.
    return 2 * circle.radius;
  },
};

console.log(circle.getDiameter()); // 10
```

현재 위와같은 코드가 존재합니다. 그런데 여기서 `circle.radius` 보다 `this.radius` 를 통해 접근해 보는 것은 어떨까요?

```javaScript
const circle = {
  radius: 5,

  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle.getDiameter()); // 10
```

그런데 이때 `this` 가 `circle` 을 가르킬 수 있도록 메서드를 호출 할 때 , 메서드 명 앞에 `circle` 을 작성해주는 방식으로 진행해 주었습니다.

리터럴 뿐만아니라 생성자 함수를 이용한 경우역시 확인해볼까요?

```javaScript
//this를 알 수 없습니다
function Circle(radius) {
  this.radius = radius;
}
//this를 알 수 없습니다
Circle.prototype.getDiameter = function () {
  return 2 * this.radius;
};

const circle = new Circle(5);
```

현재 생성자 함수를 생성한 시점에는, `this` 를 알 수 없습니다. 메서드를 생성한 시점 역시 `this` 를 알 수 없습니다. 하지만 `new` 연산자를 이용해, 생성자 함수를 호출해 줄때, 새로 생성한 인스턴스인 `circle` 이 `this` 가 되게 됩니다.

그래서 `circle` 을 출력하면 아래와 같은 결과를 얻을 수 있으며 ,`circle.getDiameter()` 역시 프로토타입이 체인이 되면서, 10이라는 결과를 얻게 됩니다.

```javaScript
Circle {radius: 5}
```

`this` 는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가르키는 자기 참조 변수 이기 때문에, `this` 를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있습니다. 하지만 자바스크립트의 `this` 의 경우, `this` 바인딩의 경우에는 함수 호출방식에 의해 동적으로 결정되며 이는, **함수가 어떤식으로 호출되느냐에따라 this 가 결정된다** 라고 할 수 있습니다.

그래서 현재 객체 리터럴과 생성자 함수의 `this` 의 경우에는 전자는 `this` 를 호출한 객체가 후자는 생성자 함수가 생성할 인스턴스가 `this` 가 되게 됩니다.

## 함수 호출 방식과 this 바인딩

`this` 의 경우에는 호출 방식에 따라 결정 되므로, 하나의 함수의 다양한 호출 방식을 통해 `this` 를 확인해볼까요?

```javaScript
const foo = function () {
  console.dir(this);
};
```

### 일반 함수 호출

일반 함수로 호출하는 경우에는 전역 객체를 사용하게 됩니다. 하지만 `use strict` 를 이용하게 되면 `undefined` 를 만나게 됩니다

```javaScript
foo();
//Window
//undefined
```

기본적으로 `this` 는 전역 객체가 바인딩 됩니다. 만약 콜백 함수가 일반 함수로 호출 된다면 어떻게 진행 될까요?

```jsx
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: ƒ}
    // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
  },
};

obj.foo();
```

콜백함수의 경우에는 콜백함수 내부의 this에도 전역객체가 바인딩됩니다. 보통 일반 함수로 호출된 모든 함수(중첩함수, 콜백 함ㄱ수) 내부의 this에는 전역객체가 바인딩됩니다.

하지만 콜백함수역시 함수이기 때문에, this가 전역객체를 참조하지만 제어권을 받은 함수에게 콜백함수에 별도로 this가될 대상을 지정한 경우 그 함수를 참조하게 됩니다.

즉 콜백함수의 제어권을 가지는 함수가 콜백함수에서의 this를 결정하며, 특별히 정의하지 않는 경우 전역객체를 바라보게됩니다.

### 메서드 호출

메서드로 호출 하는 경우에는 **메서드를 호출한 객체**를 가르키게 됩니다

```jsx
const obj = { foo };
obj.foo();
//Object
```

두번째 예시를 통해 다시 한번 확인해볼까요?

```jsx
const person = {
  name: "Lee",
  getName() {
    return this.name;
  },
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee
```

현재 `person` 이라는 객체의 메서드인 `getName()` 을 `person` 이 호출 하자 `[person.name](http://person.name)` 인 `Lee` 가 나온 것을 확인할 수 있습니다. 그런데 이 경우에는 메서드를 소유하는 객체와 호출하는 객체를 동일하게 지정해 주었기 때문에, 차이를 보기 어려우므로 다른 예시를 통해 확인해 보겠습니다

```jsx
const person = {
  name: "Lee",
  getName() {
    return this.name;
  },
};
const anotherPerson = {
  name: "Kim",
};

anotherPerson.getName = person.getName;
console.log(anotherPerson.getName());
```

현재 `person` 의 메서드를 `anotherPerson` 의 메서드로 할당 후 출력 결과 `anotherPerson` 의 `Kim` 이 출력 된 것을 확인할 수 있습니다. 이번에는 변수에 할당해 일반 함수로 출력해 보았습니다

```jsx
const getName = person.getName;
console.log(getName());
```

그결과 `getName` 의 `this` 는 `window` 가 되므로 `[window.name](http://window.name)` 이 출력 빈 문자열이 출력되게 됩니다.

### 생성자 함수

foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가르킵니다.

```jsx
new foo(); // foo {}
```

하지만 만약 `new` 를 이용하지 않고, 생성자 함수를 호출하게 된다면 결국 이는 일반 함수가 되므로, 생성자함수가 아닌 일반함수로 동작됩니다.

### call/apply/bind 에서의 this

foo 함수 내부의 this는 인수에 의해 결정 됩니다

```jsx
const bar = { name: "bar" };

foo.call(bar); // bar
foo.apply(bar); // bar
foo.bind(bar)(); // bar
```

`call/apply/bind` 는 모두 `Function.prototype` 의 메서드로, 모든 함수가 상속 받아 이용가능 합니다. 이 중 call과 apply는 this로 사용할 객체와 인수 리스트를 인수로 전달 받아 함수를 호출합니다.
