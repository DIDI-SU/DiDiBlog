---
slug: "/javascripts-31"
date: "2022-08-22"
title: "모던 자바스크립트 딥다이브 CH26"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# #26

# ES6 함수의 추가 기능

## 함수의 구분

ES6 이전의 함수는 동일한 함수라도, 다양한 형태로 호출할 수 있습니다. 즉 ES6 이전의 모든 함수는 일반 함수로서 호출할수 있는 것 뿐만아니라, 생성자 함수로서 호출이 가능한 callable이면서 constructor의 성격을 지니고 있습니다.

그런데 이제 ES6 부터는 함수의 사용목적에 따라 세가지 종류로 명확히 구문하게 되었습니다.

함수의 종류는 아래와 같습니다

| ES6 함수 구분 | constructor | prototype | super | arguments |
| ------------- | ----------- | --------- | ----- | --------- |
| 일반함수      | O           | O         | X     | O         |
| 메서드        | X           | X         | O     | O         |
| 화살표 함수   | X           | X         | X     | X         |

## 메서드

```jsx
const obj = {
  x: 1,
  // foo는 메서드이다.
  foo() {
    return this.x;
  },
  // bar에 바인딩된 함수는 메서드가 아닌 일반 함수이다.
  bar: function () {
    return this.x;
  },
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

ES6에서 메서드는 위와 같이 메서드 축약 표현으로 정의된 함수만을 이야기합니다. ES6 사양에서 정의한 메서드는 인스턴스를 생성할 수 없는 non-constructor 입니다. 하지만 ES6는 자신을 바인딩한 객체를 가르키는 `[[HomeObject]]` 를 가져, `super` 을 사용할 수 있습니다.

## 화살표 함수

화살표 함수는 `functoin` 키워드 대신에 화살표를 사용해, 함수를 정의 형식보다 간략이 정의해 아래와같은 형태를 지니고 있습니다.

```jsx
const multiply = (x, y) => x * y;
multiply(2, 3); // -> 6
```

### 함수정의

기본적으로 화살쵸 함수는 아래와 같은 모습을하고 있습니다. 매개 변수가 여러개인 경우에는 `()` 안에 매개 변수를 선언하나, 한개인 경우에는 소괄호를 생략할 수 있습니다

```jsx
const arrow = (x, y) => { ... };
const arrow = x => { ... };
```

몸체 역시, 중괄호를 생략할 수 있습니다. 중괄호의 경우에는 몸체가 하나의 문으로 구성되는 경우 생략이 가능하나, 내부의 문이 값으로평가 가능한 표현식인 경우, 암묵적으로 반환 됩니다

```jsx
const power = (x) => x ** 2;
const power = (x) => {
  return x ** 2;
};
```

하지만 만약 함수 몸체가 표현식이 아닌 문이라면 중괄호를 생략할 수 없습니다

```jsx
//에러가 나는 경우
const arrow = () => const x = 1;
 // SyntaxError: Unexpected token 'const'
const arrow = () => { return const x = 1; };
```

객체 리터럴을 반환하는 경우 혹은 배열을 감싸주는 경우에도 객체 리터럴을 소괄호로 감싸 주어야합니다

```jsx
const create = (id, content) => ({ id, content });
create(1, "JavaScript"); // -> {id: 1, content: "JavaScript"}
const create = (id, content) => {
  return { id, content };
};
```

화살표 함수도 일급 객체 이므로, 아래와 같이 고차 함수에 콜백 함수로 전달할 수 있습니다.

```jsx
// ES5
[1, 2, 3].map(function (v) {
  return v * 2;
});

// ES6
[1, 2, 3].map((v) => v * 2); // -> [ 2, 4, 6 ]
```

### 화살표함수와 일반함수의 차이

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor 입니다

```jsx
const Foo = () => {};
// 화살표 함수는 생성자 함수로서 호출할 수 없다.
new Foo(); // TypeError: Foo is not a constructor
```

화살표 함수는 인스턴스를 생성할 수 없으므로, prototype 프로퍼티도 없고 프로토타입 역시 생성하지 않습니다.

1. 중복된 매개변수 이름을 선언할 수 없습니다

일반 함수는 아래와 같이 중복된 매개변수 이름을 선언해도 에러가 발생하지 않으나, 화살표 함수의 경우에는아래와같이 에러가 발생합니다

```jsx
//일반함수
function normal(a, a) {
  return a + a;
}
console.log(normal(1, 2)); // 4
//화살표 함수
const arrow = (a, a) => a + a;
// SyntaxError: Duplicate parameter name not allowed in this context
```

1. 화살표 함수는 함수 자체의 this, arguments, super,new.target을 바인딩 갖지 않습니다

화살표 함수 내부에서 this, arguments, super,new.target을 참조하면, 스코프 체인을 통해서 상위 스코프의 this, arguments, super,new.target을 참조합니다.

만약 **화살표 함수에 화살표 함수가 중첩되어 있다면, 상위 화살표 함수 역시 this, arguments, super,new.target가 바인딩이 없으므로, 스코프 체인상 가장 가까운 사위 함수중 화살표 함수가 아닌 함수의 this, arguments, super,new.target를 참조**합니다

### this

this 바인딩의 경우에는 함수의 호출 방식에 따라서 동적으로 전달됩니다. 아래의 예시를 통해 화살표 함수에서의 this를 확인해볼까요?

```jsx
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map(function (item) {
      return this.prefix + item; // ②
      // -> TypeError: Cannot read property 'prefix' of undefined
    });
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));
```

위 함수를 실행하면, 에러를 만나게 됩니다. 그 이유를 확인해볼까요

일단 `new` 연산자를 이용해, 인스턴스를 만들어 주었을때, 우리는 `this` 가 `prefixer` 객체가 될 것을 알고 있습니다. 하지만 `map` 의 인수로 전달된 콜백함수의 내부에서 `this` 는 `undeifined` 를 가르키게 됩니다.

일반함수로 호출되는 `this` 는 전역객체를 가르키나, 클래스 내부에서는 `stric mode` 가 적용됩니다. 그런데 이때 `strict mode` 에서는 함수를 일반함수로서 호출하면 this에 전역객체가 아닌, undefined가 바인딩 되므로, 결과적으로는 `undeifined` 를 얻게 되는 것입니다.

```jsx
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    //이 경우에는 this가 상위 스코프를 참조해, this를 이용해 줄수 있습니다
    return arr.map((item) => this.prefix + item);
  }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));
// ['-webkit-transition', '-webkit-user-select']
```

그래서 이러한 현상을 해결하기 위해서, 위와 같이 화살표 함수를 이용해 줄 수 있습니다. 화살표 함수는 함수 자체의 `this` 바인딩을 가지지 않기 때문에, 화살표 함수 내부에서 `this` 를 참조하면,상위 스코프의 `this` 를 참조하게 됩니다. 이는 곧 화살표 함수의 `this` 역시 함수가 정의된 위치에 의해 결정된다는 것을 의미합니다.

만약 화살표 함수와 화살표 함수가 중첩되어 있다면, 상위 화살표 함수에서도 `this` 바인딩이 없으므로, 스코프 체인상 가장가까운 상위 함수 중 화살표 함수가 아닌 함수의 `this` 를 참조합니다

```jsx
// 중첩 함수 foo의 상위 스코프는 즉시 실행 함수다.
// 따라서 화살표 함수 foo의 this는 상위 스코프인 즉시 실행 함수의 this를 가리킨다.
(function () {
  const foo = () => console.log(this);
  foo();
}.call({ a: 1 })); // { a: 1 }
```

\이경우에는 foo는 화살표 함수로, 상위 스코프인 즉시 실행 함수의 a:1 을 thie 로 가지게 됩니다.

```jsx
(function () {
  const bar = () => () => console.log(this);
  bar()();
}.call({ a: 1 })); // { a: 1 }
```

`bar` 는 화살표 함수를 반환하는 화살표 함수입니다. 그런데 이때 화살표 함수는 this 바인딩을 가지지 않으므로, 상위 bar을 확인하게 되는데 bar 역시 this가 없어 그 상위의 즉시 실행 함수의 this를 가르키게 됩니다.

프로퍼티에서 할당한 화살표 함수도 스코프 체인 상에서 가장 가까운 상위 함수중 화살표 함수가 아닌 함수의 `this` 를 참조합니다

```jsx
// increase 프로퍼티에 할당한 화살표 함수의 상위 스코프는 전역이다.
// 따라서 increase 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킨다.
const counter = {
  num: 1,
  increase: () => ++this.num,
};

console.log(counter.increase()); // NaN
```

그래서 화살표 함수는 this 바인딩을 갖지 않기 때문에, `call/bind/apply` 메서드를 사용해도 this를 교체할 수 없습니다.하지만 호출 불가능 하다는 의미는 아니므로, 아래와 같이 호출은 가능합니다

```jsx
const add = (a, b) => a + b;

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
console.log(add.bind(null, 1, 2)()); // 3
```

그러나 이 경우 역시 this는 상위 스코프를 참조하게 됩니다

### 메서드에서의 this

```jsx
const person = {
  name: "Lee",
  sayHi: () => console.log(`Hi ${this.name}`),
};
person.sayHi(); // Hi " "
```

현재 위의 코드는 `sayHi` 프로퍼티에 할당한 화살표 함수 내부의 `this` 는 `person` 을 가르키지 않고, 외부의 전역 객체를 가르키게 되는데, 프로토타입의 객체 프로퍼티에 화살표 할당하는 것 역시 동일한 문제가 발생하게 되므로 일반 함수를 할당해 주어야합니다.

### 클래스 필드에서의 this

<aside>
💡 ??? 이부분은 진짜 뭐라는 거지하는 표정만 만들어짐 ….

</aside>

```jsx
// Bad
class Person {
  // 클래스 필드 정의 제안
  name = "Lee";
  sayHi = () => console.log(`Hi ${this.name}`);
}

const person = new Person();
person.sayHi(); // Hi Lee

// 위의 코드와 아래의 코드는 결국 같은 의미가 됩니다
class Person {
  constructor() {
    this.name = "Lee";
    // 클래스가 생성한 인스턴스(this)의 sayHi 프로퍼티에 화살표 함수를 할당한다.
    // sayHi 프로퍼티는 인스턴스 프로퍼티이다.
    this.sayHi = () => console.log(`Hi ${this.name}`);
  }
}
```

여기서 this는 원래라면 상위스코프인 클래스 외부를 봐야하는데, this는 인스턴스인 `person` 을 참조하게 되므로, 화살표 함수에서의 this는 인스턴스를 가르키게됩니다.그런데 이때 class 필드에서 할당한 화살표 함수는 프로토타입이 아닌 인스턴스 메소드가 되므로 아래와같이 사용해 주는 것이 좋습니다

```tsx
// Good
class Person {
  // 클래스 필드 정의
  name = "Lee";

  sayHi() {
    console.log(`Hi ${this.name}`);
  }
}
const person = new Person();
person.sayHi(); // Hi Lee
```

### super

화살표 함수는 함수자체의 `super` 바인딩을 갖지 않으며, 화살표 내부 함수에 `super` 을 참조 시 상위 스코프의 `super` 을 참조하게 됩니다

```jsx
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  // 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킨다.
  sayHi = () => `${super.sayHi()} how are you doing?`;
  //위의 화살표 함수와 아래의 constructor 은 동일한 의미
  /*constructor() {
		  this.sayHi = () => `${super.sayHi()} how are you doing?`;
	  }*/
}

const derived = new Derived("Lee");
console.log(derived.sayHi()); // Hi! Lee how are you doing?
```

화살표 함수는 `super` 의 바인딩을 갖지 않으므로, `super` 을 참조해도 에러가 발생하지 않고, `constructor` 내부의 `super` 바인딩을 참조하게 됩니다. 위의 경우에는 `Derived` 의 `super` 인 `Base` 의 `this` 를 참조하게 됩니다.

### arguments

화살표 함수에서는 `arguments` 객체를 사용할 수 없으므로, 상위 `arguments` 객체를 참조할 수 있으나, 화살표 함수 자신에게 전달된 인수 목록을 확인할 수 없으므로, 그다지 도움이 되지 않습니다

## Rest 파라미터

### 기본 문법

`Rest` 파라미터의 경우에는 보통 아래와같이 사용 되며, Rest 파라미터는 함수에 전달된 인수의 목록을 배열로 전달 받습니다

```jsx
function foo(...rest) {
  // 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터다.
  console.log(rest); // [ 1, 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);
```

Rest 파리미터는 반드시 마지막 파라미터야 합니다. 즉 `Rest` 라는 이름 처럼, 아래와 같이 먼저 선언된 매개변수에 할당 된 인수를 제외한 나머지 인수들로 구성된 배열이 할당 됩니다.

```jsx
function foo(param, ...rest) {
  console.log(param); // 1
  console.log(rest); // [ 2, 3, 4, 5 ]
}

foo(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
  console.log(param1); // 1
  console.log(param2); // 2
  console.log(rest); // [ 3, 4, 5 ]
}

bar(1, 2, 3, 4, 5);
```

Rest 파라미터가 앞에 오는 경우에는 에러를 만나게 됩니다. 또한 Rest파라미터는 단하나만 선언할 수 있습니다

```jsx
function foo(...rest1, ...rest2) { }

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
```

Rest 파라미터는 `length` 프로퍼티에 영향을 주지 않습니다.

### Rest 파라미터와 arguments 객체

```jsx
function sum(...args) {
  // Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다.
  return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

위에서 이야기한 것 처럼 화살표 함수의 경우에는 , 함수 자체의 arguments 를 지니지 않기 때문에, 위와같이 `Rest` 파라미터를 이용해 주어야 합니다

## 매개변수 기본 값

만약 다음과 같이, 두수를 더해주는 함수가 있다 가정을 했을 때 만약 아래와같이, 하나의 매개변수에 값이 할당하는 경우에는 아래와 같은 값을 얻게 될 것 입니다

```jsx
function sum(x, y) {
  return x + y;
}

console.log(sum(1)); // NaN
```

그래서 이러한 것을 방지해 주기 위해서, 매개변수에 기본 값을 할당할 필요가 있습니다.ES6 부터는 매개변수 기본 값을 사용하여 , 아래와같이 1차적으로 안전망을 만들어 줄 수 있습니다

```jsx
function sum(x = 0, y = 0) {
  return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1)); // 1
```

하지만 `Rest` 파라미터의 경우에는 기본값을 지정할 수 없으니, 이를 유의 해 주어야 하며, 매개 변수 기본 값 역시, `length` 프로퍼티와 `arguments` 객체에 아무런 영향을 주지 않습니다

```jsx
function sum(x, y = 0) {
  console.log(arguments);
}

console.log(sum.length); // 1

sum(1); // Arguments { '0': 1 }
sum(1, 2); // Arguments { '0': 1, '1': 2 }
```
