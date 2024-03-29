---
slug: "/my-fourth-post"
date: "2022-06-20"
title: "모던 자바스크립트 딥다이브 CH06"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# #6

## 데이터 타입에서의 원시 타입

### 숫자 타입

JS에서는 모든 수를 실수로 처리 하며, 정수만을 표현하기 위한 별도의 데이터 타입이 존재하지 않습니다.

```jsx
var int = 10;
var double = 10.12;
var negative = -10;
```

자바 스크립트는 2진수 8진수 16진수를 표현하기 위한 데이터 타입을 제공하지 않아 이를 참조하면 모두 10진수로 해석됩니다. 또한 자바스크립트에서는 `NaN` , `Infinity` 모두 숫자 타입에 해당됩니다.

### 문자열 타입

문자열은 작은 따옴표(’’) , 큰 따옴표(” “), 또는 백틱(` `)으로 감싸서 사용 합니다.

```jsx
var st = "hello";
var st2 = "hello";
var st3 = `hello`;
```

ES6부터는 템플릿 리터럴이 등장해, 백틱을 이용해 여러 줄의 문자열을 작성(멀티라인 문자열)하거나, 표현식을 삽입 하는 등의 행동을 가능해졌습니다.

```jsx
var str = `lee`;
console.log(`my name is ${str}`);
//my name is lee
```

### 불리언

`true` 와 `false`만 존재 합니다.

### undefined

`undefined` 타입은 `undefined` 가 유일 합니다. 하지만 undefined 의 경우에는 의도적으로 할당 되는 값이 아닌, 자바스크립트 엔진이 변수를 초기화 하기 위해 사용되는 값이기 때문에 변수에 값이 없다는 것을 명시하고자 하는 경우에는 `null` 을 선언해 주는 것이 용이합니다.

### null

null역시 null이 유일합니다. null 의 경우 함수가 유효한 값을 반환할 수 없는 경우에는 명시적으로 null을 반환하기도 합니다.

### symbol

ES6에서 추가된 타입으로, 다른 값과 중복되지 않으며 변경 불가능한 타입의 값입니다.

```jsx
var a = Symbol("abc");
var b = Symbol("abc");
a === b; ///false
```

<aside>
💡 객체의 경우 양이 많아 별도의 파트에서 다룰 예정입니다

</aside>

## 데이터 타입의 필요성과 불변 값

> 불변 값=== 하나의 값이 하나의 메모리에 저장되는 형태

```jsx
var a = 100;
var b = 100;
```

위의 경우에서 변수는 어떻게 저장이 되는 걸 까요? .

예를 들어 현재 100이라는 값이 특정 0x123에 저장이 되었다고 합니다. 그렇다면 변수 a와 b 모두 그 100이라는 값이 저장된 0x123을 바라보고 있는 게 현재의 상태라 할 수 있습니다 .

```jsx
0x123 :100을 저장
a와 b는 서로 다른 공간에 저장 되어있으나 바라보는 주소는 동일합니다.
0x111: 식별자는 a이나, 값의 경우 100을 저장한 0x123이라는 주소를 보고 있음
0x112: 식별자는 b이나, 값의 경우 100을 저장한 0x123이라는 주소를 보고 있음
```

그렇다 보니 현재 100은 불변한 값이 되어 있다 할 수 있습니다. 즉 문자열과 숫자와 같은 기본형 값들의 경우 하나의 값에 대한 하나에 메모리에 저장을 하고, 그 메모리의 주소를 변수들이 보고 있기 때문입니다.

<aside>
💡 동일한 값을 저장한 변수는 서로 다른 공간에 저장되어 있으나 바라보는 주소는 동일합니다

</aside>

## 동적 타이핑

자바스크립트는 동적 타입의 언어로, 어떠한 데이터 타입의 값이라도 자유롭게 할당할 수 있습니다.

즉 자바 스크립트 에서 변수는 선언이 아닌 할당에 의해 타입이 결정, 추론 됩니다. 그리고 재할당에 의해 그 변수의 타입은 언제든지 동적으로 변할 수 있습니다. 이러한 ㅌ특징을 동적 타이핑이라하며, 이러한 특징을 가진 언어를 동적 타입 언어라고 합니다.
