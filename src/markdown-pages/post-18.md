---
slug: "/blog/javascripts-18"
date: "2022-07-06"
title: "모던 자바스크립트 딥다이브 CH18"
tags: ["JavaScript", "ALL"]
---

# #18

# 함수와 일급 객체

일급 객체의 조건을 아래와 같습니다.

1. 무명의 리터럴로 생성 할 수 있다. 즉 런타임에 생성이 가능하다
2. 변수나 자료구조(객체,배열)에 저장할 수 있다
3. 함수의 매개변수에 전달할 수 있다
4. 함수의 반환 값으로 사용할 수 있다

자바스크립트 조건은 위 조건을 만족하므로, 일급 객체가 됩니다. 아래의 예시를 통해서 조건을 확인해볼까요?

### 함수는 무명의 리터럴로 생성할 수있다 / 함수는 변수에 저장할 수 있다

아래의 코드를 보면, 현재 함수가 무명+ 리터럴의 조건으로 생성 되어있으며, 각각 increase 와 decrease 라는 변수에 할당 되어 있는 것을 확인 할 수 있습니다

```jsx
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};
```

### 함수는 객체에 저장할 수 있다

```jsx
const auxs = { increase, decrease };
```

### 매개 변수에게 전달할 수 있다/ 함수의 반환 값으로 사용할 수 있다

현재 매개변수로 위에서 객체로 저장된 함수가 콜백 함수 처럼 전달이 되어있으며, 반환 값으로 함수가 있는 것을 확인 할 수 있습니다

```jsx
function makeCounter(aux) {
  let num = 0;

  return function () {
    num = aux(num);
    return num;
  };
}
```

여기서 함수가 일급 객체 라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미입니다. 그런데 함수는 일반 객체와는 다르게, 일반 객체는 호출할 수 없지만 함수 객체는 호출할 수 있으며, 함수 객체는 일반 객체에 없는 함수 고유의 프로퍼티를 소유 합니다.

### 함수 객체의 프로퍼티

```jsx
function square(number) {
  return number * number;
}

console.dir(square);
/*
square(number)
arguments: null
caller: null
length: 1
name: "square"
prototype: {constructor: ƒ}
[[FunctionLocation]]: VM55:1
[[Prototype]]: ƒ ()
[[Scopes]]: Scopes[1]*/
```

현재위의 함수를 `console.dir` 메서드를 통해서 함수 객체의 내부를 보았습니다. 출력시 위와 같은 내용을 얻게 됩니다 . 이제 프로퍼티의 프로퍼티 어트리 뷰트를 확인해보면 아래와 같습니다

```jsx
arguments: {value: null, writable: false, enumerable: false, configurable: false}
caller: {value: null, writable: false, enumerable: false, configurable: false}
length: {value: 1, writable: false, enumerable: false, configurable: true}
name: {value: 'square', writable: false, enumerable: false, configurable: true}
prototype: {value: {…}, writable: true, enumerable: false, configurable: false}
```

`__proto__` 는 square 함수의 프로퍼티가 아니라, Object.prototype으로 접근해 주어야 합니다

```jsx
console.log(Object.getOwnPropertyDescriptor(square, "__proto__")); // undefined
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

arguments, caller 등의 프로퍼티 들은 모두 함수 객체의 프로퍼티 이나, 이들은 프로퍼티는 일반 객체에 없는 함수 객체 고유의 프로퍼티 입니다. 하지만 `__proto__` 는 접근자 프로퍼티 이며, 함수 객체의 고유 프로퍼티가 `Object.prototype` 객체의 프로퍼티를 상속 받았기 때문에 위와같이 접근해 주어야 합니다

## 함수 객체의 프로퍼티

### arguments 프로퍼티

arguments 객체는 함수 호출시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체로, 함수 내부에서 지역변수 처럼 사용 됩니다.

```jsx
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

console.log(multiply()); // NaN
console.log(multiply(1)); // NaN
console.log(multiply(1, 2)); // 2
console.log(multiply(1, 2, 3)); // 2
```

함수를 정의 할때 선언한 매개 변수는 함수 몸체 내부에서 변수와 동일하게 취급됩니다. 즉 함수가 호출 되면 함수 몸체 내에서 암묵적으로 매개변수가 선언되고 undefined로 초기화 된 후 인수가 할당 됩니다.

자바 스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않으므로, 매개 변수 보다 인수를 적게 전달하는 경우에는 undefined로 초기화된 상태를 유지하며 반대의 경우 즉 초과하는 경우에는 그 인수를 무시한다.

```jsx
//callee : arguments 객체를 생성한 함수
//length :arguments의 길이

Arguments(2) [1, 2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
0: 1
1: 2
callee: ƒ multiply(x, y)
length: 2
Symbol(Symbol.iterator): ƒ values()
[[Prototype]]: Object

---
0: 1
1: 2
2: 3
callee: ƒ multiply(x, y)
length: 3
Symbol(Symbol.iterator): ƒ values()
[[Prototype]]: Object
```

위의 함수를 콘솔에서 확인해보면, 입력해준 arguments 객체의 프로퍼티들이 무시만 되었지 저장은 무사히 되어있음을 확인 할 수 있습니다.

그리고 프로퍼티로 저장되어있기 때문에 , 키와 값의 형태로 저장 됩니다. 여기서 키는 인수의 순서를 값은 그 순서에 따른 값을 나타냅니다.

arguments 객체는 매개 변수를 확정 할 수 없는 가변 인자 함수를 구현할 때 유용합니다

arguments 객체는 유사 배열 객체 이기 때문에 , 스프레드 문법을 통한 접근 역시 가능하며, 아래와같이 for문 for in 등을 이용해서도 접근해 줄 수 있습니다

```jsx
function sum() {
  let res = 0;

  // arguments 객체는 length 프로퍼티가 있는 유사 배열 객체이므로 for 문으로 순회할 수 있다.
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }

  return res;
}

console.log(sum()); // 0
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
```

<aside>
💡 caller 프로퍼티는 넘어가겟읍니다….

</aside>

### length 프로퍼티

함수 객체의 length프로퍼티는 함수를 정의할때 선언한 매개 변수의 개수를 가르킵니다

```jsx
function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2
```

argument의 length는 인자의 개수 이므로 , 함수 객체와 argument 객체의 길이가 다를 수 있음에 유의해 주어야 합니다

### name 프로퍼티

함수 객체의 anme 프로퍼티는 함수의 이름을 나타 내는데, ES5와 ES6은 동작을 서로 달리하므로 주의 해야합니다. 특히 익명 함수의 경우 전자의 경우 빈 문자열을 값으로 가지나 후자의 경우 함수 객체를 가르키는 식별자를 값으로 가집니다

```jsx
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function () {};
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다.
// ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() {}
console.log(bar.name); // bar
```
