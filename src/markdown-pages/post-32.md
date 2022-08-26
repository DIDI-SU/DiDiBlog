---
slug: "/javascripts-32"
date: "2022-08-23"
title: "모던 자바스크립트 딥다이브 CH28-29"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# #28-29

<aside>
💡  내용이 프로퍼티와 메서드 설명을 중심으로 하고 있어서 간단 정리 형식으로 진행합니다

</aside>

# Number

## Number 생성자 함수

```jsx
const numObj = new Number();
console.log(numObj); // Number {[[PrimitiveValue]]: 0}
```

생성자 함수는 아래와 같이 사용해 줄 수 있으며, 인수를 전달하지 않고 `new` 연산자와함께 호출하면 `[[NumberDate]]` 내부 슬롯에 0을 할당한 래퍼 객체를 생성합니다.

만약 숫자를 전달한 경우에는 `[[NumberDate]]` 내부 슬롯에 인수로 전달 받은 숫자를 할당한 `Number` 래퍼 객체를 생성합니다. 만약 인수로 숫자가 아닌 값을 전달하면 인수를 숫자로 강제 변환 후 이용하지만 만약 인수를 숫자로 변경할 수 없다면 `NaN` 을 내부 슬롯에 할당한 `Number` 래퍼 객체를 생성합니다.

## Number 프로퍼티

### Number.EPSILON

1과 1보다 큰 숫자 중 가장 작은 숫자와의 차이와 같으며 부동 소수점으로 인해 발생하는 오차를 해결하기 위해 사용합니다.

### Number.MAX_VALUE

자바스크립트에서 표현할 수 있는 가장 큰 양수의 값으로 이보다 큰 값은 `Infinity` 입니다.

### Number.MIN_VALUE

자바스크립트에서 가장 작은 양수값으로 이보다 작은 값은 0 입니다.

### Number.MAX_SAFE_INTEGER

자바스크립트에서 안전하게 표현할 수 있는 정수 값

### Number.MIN_SAFE_INTEGER

자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수의 값

### Number.POSITIVE_INFINITY / Number.NEGATIVE_INFINITY

음과 양의 무한 대를 나타내는 숫자값 `Infinity` 와 같습니다

### Number.NaN

숫자가 아님을 나타내는 숫자 값입니다

## Number 메서드

### Number.isFinite

```jsx
// 인수가 정상적인 유한수이면 true를 반환한다.
Number.isFinite(0); // -> true
// 인수가 무한수이면 false를 반환한다.
Number.isFinite(Infinity); // -> false
Number.isFinite(-Infinity); // -> false
```

인수로 전달 된 숫자값이 `Infinity` 또는`-Infinity` 가 아닌지 검사하여 그 결과를 불리언 값으로 반환 합니다. 만약 인수가 `NaN` 인 경우에는 언제나 `false` 를 반환 합니다.

### Number.isInteger

```jsx
Number.isInteger(0); // -> true
Number.isInteger(123); // -> true
Number.isInteger(-123); // -> true

// 0.5는 정수가 아니다.
Number.isInteger(0.5); // -> false
// '123'을 숫자로 암묵적 타입 변환하지 않는다.
Number.isInteger("123"); // -> false
```

인수로 전달된 숫자 값이 정수 인지 검사, 그 결과를 불리언 값으로 반환합니다. 검사하기 전 인수를 숫자로 암묵적 타입변환을 하지 않습니다.

### Number.isNaN

인수로 전달된 숫자 값이 `NaN` 인지 검사해 그결과를 불리언으로 반환합니다. 그런데 `Number.isNaN` 의 경우에는 전달 받은 인수를 숫자를 암묵적 타입 변환을 하지 않습니다.

그래서 숫자가 아닌 인수가 주어졌을 때에 반환 값은 `false` 가됩니다.

### Number.isSafeInteger

인수로 전달한 숫자 값이 안전한 정수 인지 검사해 그결과를 불리언 값으러 반환하며 검사하기 전 인수를 숫자로 암묵적 타입 변환하지 않습니다.

### Number.prototype.toExponential

`toExponential` 메서드는 숫자를 지수 표기 법으로 변환하여 문자열로 반환 합니다.

### Number.prototype.toFixed

`.toFixed` 는 숫자를 반올림 해 문자로 반환하며 인수를 생략하면 기본 값 0이 지정됩니다.

### Number.prototype.toPrecision

```jsx
(12345.6789).toPrecision(); // -> "12345.6789"
// 전체 1자리수 유효, 나머지 반올림
(12345.6789).toPrecision(1); // -> "1e+4"
// 전체 2자리수 유효, 나머지 반올림
(12345.6789).toPrecision(2); // -> "1.2e+4"
// 전체 6자리수 유효, 나머지 반올림
(12345.6789).toPrecision(6); // -> "12345.7"
```

인수로 전달 받은 전체 자릿수까지 유효 하도록 나머지 자릿수를 반올림해 문자열로 반환합니다. 만약 인수로 전달 받은 전체 자릿수로 표현할 수 없는 경우 지수 표기 법으로 결과를 반환합니다.

### Number.prototype.toString()

숫자를 문자열로 변환해 반환합니다.

# Math

`Math` 는 생성자 함수가 아니므로, 정적 프로퍼티와 정적 메서드만 제공합니다

## Math 프로퍼티

### Math.PI

원주율 을 반환합니다

## Math 메서드

### Math.abs

전달 된 숫자의 절대 값을 반환합니다. 절대 값은 반드시 0또는 양수여야합니다.

### Math.round

인수로 전달된 숫자의 소숫점이하를 반올림한 정수를 반환 합니다

### Math.ceil

인수로 전달된 숫자의 소수점 이하를 올림한 정수를 반환 합니다.

### Math.floor

인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환합니다

### Math.sqrt

인수로 전달된 숫자의 제곱근을 반환합니다

### Math.random

메서드는 임의의 난수(랜덤 숫자) 를 반환 합니다. Math.random 메서드가 반환한 난수는 0에서 1미만의 실수로 0은 포함되나 1은 포함되지 않습니다

### Math.pow

첫번째 인수를 밑으로 두번째 인수를 지수로 거듭제곱한 결과를 반환합니다

### Math.max

전달받은 인수 중 가장큰 수를 반환합니다. 인수가 전달되지 않으면 `-Infinity` 를 반환 합니다.

만약 배열을 인수로 전달 받아 배열의 요소 중 최대 값을 구하려면, 스프레드 문법을 이용해 주면 좋습니다

### Math.min

전달 받은 인수중 가장 작은 인수를 반환합니다. 만약 인수가 전달되지 않으면 `Infinity` 를 반환 합니다.
