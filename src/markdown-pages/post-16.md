---
slug: "javascripts-16"
date: "2022-06-20"
title: "모던 자바스크립트 딥다이브 CH16"
tags: ["JavaScript", "ALL"]
---

# #16

# 프로퍼티 어트리뷰트

### 내부 슬롯과 내부 메서드

내부 슬롯과 내부 메서드는 ECMAScript 사양에 등장하는 이중 대괄호로 감싼 이름들로 예를 들자면 [[Prototype]] 와 같은 모습을 하고 있습니다.

내부슬롯과 내부 메서드는 자바스크립트 엔진에서 실제로 동작하지만, 개발자가 직접 접근할 수 있도록 외부로 공개된 객체의 프로 퍼티는 아닙니다. 즉 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 내부 로직이므로, 원칙적으로 직접 접근을 제한 하나, 일부 내부 슬롯과 내부 메서드 한해서 간접적으로 접근할 수 있도록 합니다.

ex)

```jsx
const o ={};
// 이와 같이는 접근할 수 없습니다
o.[[Prototype]]
//아래를 이용해  간접적으로 접근 가능합니다
o.__proto__
```

`__proto__` 의 경우 브라우저가 마음대로 만들어 놓은 느낌의 친구로, 현재는 사용을 지양하고 있습니다. 대신 `Object.getProtptypeOf()` 를 추천하고 있습니다

### 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의합니다.

아래 person 이라는 객체를 생성했을때 `Object.getOwnPropertyDescriptor` 을 통해서 간접적으로 프로퍼티 어트리뷰트를 확인할 수 있습니다. 위 메서드는 프로퍼티 디스크립터 객체를 반환해 프로퍼티어트리뷰트를 간접적으로 확인할 수 있게끔 합니다

```jsx
const person = {
  name: "Lee",
};
// 확인시 아래와 같은 결과를 얻을 수 있습니다
console.log(Object.getOwnPropertyDescriptor(person, "name"));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

`Object.getOwnPropertyDescriptor` 는 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환합니다. 이때, 메서드의 첫번째 매개 변수에는 객체의 참조를 전달하고, 두번째 매개 변수에는 프로퍼티 키를 문자열로 전달합니다. 만약 존재하지 않은 프로퍼티나 상속받은 프로퍼티에 대해 요구하는 경우 undefined를 반환합니다.

만약 모든 프로퍼티를 확인하고 싶은 경우에는 아래의 `getOwnPropertyDescriptors` 를 사용해주면 됩니다

```jsx
const person = {
  name: "Lee",
};

// 프로퍼티 동적 생성
person.age = 20;

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
```

## 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 **키와 값으로 구성된 데이터 프로퍼티**와, 자**체적으로 값을 갖지 않고 데이터 프로퍼티의 값을 읽거나 저장할때 호출되는 접근자 함수로 구성된 프로퍼티인 접근자 프로퍼티**가 존재합니다. 전자의 경우에는 현재 위에서 살펴본 모든 프로퍼티가 이에 해당됩니다.

### 데이터 프로퍼티

데이터 프로퍼티는 아래와 같은 프로퍼티 어트리뷰트를 갖습니다. 이 프로퍼티 어트리뷰트는 자바스크립트 엔진이 프로퍼티를 생성시에 자동으로 정의됩니다

| 프로퍼티 어트리 뷰트                                                                                                                                                            | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------- |
| [[Value]]                                                                                                                                                                       | value                               | - 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값     |
| - 프로퍼티 키를 통해 프로퍼티 값을 변경 하면, [[Value]] 에 값을 재할당 합니다. 이때 프로퍼티가 없다면, 프로퍼티를 동적 생성하고 생성된 프로퍼티의 value에 그 값을 저장해 줍니다 |
| [[Writable]]                                                                                                                                                                    | writable                            | - 프로퍼티 값의 변경 가능여부를 나타내미 불리언 값을 갖는다 |
| - false 인 경우에는 value의 값을 변경할 수 없는 읽기전용 프로퍼티가 됩니다                                                                                                      |
| [[Eumerable]]                                                                                                                                                                   | enurerable                          | - 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖습니다 |
| - false 인 경우에는 for in 이나 Object.key 메서드 등으로 열거 불가능합니다                                                                                                      |
| [[Configrable]]                                                                                                                                                                 | configurable                        | - 프로퍼티 재정의 가능 여부를 나타내며 불리언 값을 가집니다 |
| - false 인경우에는 해단 프로퍼티의 삭제, 값의 변경이 금지된다 단 writable이 ture 인경우에는 value의 변경과 writable을 false로 변경하는 것은 허용된다                            |

- writable 하고 congigurable 차이가 뭐지?

```jsx
const person = {
  name: "Lee",
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 취득한다.
console.log(Object.getOwnPropertyDescriptor(person, "name"));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

### 접근자 프로퍼티

자체적으로 값을 지니고 있지는 않으나, 다른 데이터 프로퍼티 값을 읽거나 저장시에 사용됩니다

| 프로퍼티 어트리 뷰트                                                                                                   | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [[Get]]                                                                                                                | get                                 | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출 됩니다.                                                                                                                             |
| 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 [[Get]]의 값인 getter 함수가 호출되고, 그결과가 프로퍼티 값으로 반환됩니다 |
| [[Set]]                                                                                                                | set                                 | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할때 호출되는 접근자 함수 입니다. 즉 접근자 프로퍼티로 값을 저장하면, [[Set]] 의 값인 setter 가 호출되고 그결과 프로퍼티가 값으로 저장됩니다 |
| [[Eumerable]]                                                                                                          | enurerable                          | 데이터 프로퍼티와 동일                                                                                                                                                                         |
| [[Configrable]]                                                                                                        | configurable                        | 데이터 프로퍼티와 동일                                                                                                                                                                         |

아래의 예제를 통해 확인해볼까요?

```jsx
const person = {
  // 데이터 프로퍼티
  firstName: "Ungmo",
  lastName: "Lee",

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  },
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + " " + person.lastName); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = "Heegun Lee";
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Heegun Lee

// firstName은 데이터 프로퍼티다.
// 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor);
// {value: "Heegun", writable: true, enumerable: true, configurable: true}

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(person, "fullName");
console.log(descriptor);
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```

## 프로퍼티 정의

`Object.defineProperty` 와 같은 메소드를 이용해, 프로퍼티의 어트리 뷰트를 정의 할 수 있습니다. 인수로는 문자열로 된 프로퍼티 키, 그리고 프로퍼티 디스크립터 객체를 전달한다. 이때 일부 프로퍼티를 생략할 수있는데 생략시에는 아래와같은 기본 값이 적용됩니다.

| 프로퍼티 디스크립터 객체의 프로퍼티 | 생략시 기본 값 |
| ----------------------------------- | -------------- |
| value                               | undefined      |
| get                                 | undefined      |
| set                                 | undefined      |
| writable                            | false          |
| enumerable                          | false          |
| configurable                        | false          |

## 객체 변경 방지
