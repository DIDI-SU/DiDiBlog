---
slug: "my-seventh-post"
date: "2022-06-20"
title: "모던 자바스크립트 딥다이브 CH12"
tags: ["JavaScript", "ALL"]
---

# #12

# 함수

### 정의

함수는 일련의 과정을 문으로 구현하고 코드 블록으로 감싸 하나의 실행 단위로 정의한 것입니다.

### 형태와 사용

```jsx
//함수 정의
// f(x, y) = x + y
function add(x, y) {
  return x + y;
}
//함수 선언문
// f(2, 5) = 7
add(2, 5); // 7
```

<aside>
💡  중복제거와 코드 재 사용성 코드 신뢰성 등의 효과를 위해 함수를 이용합니다

</aside>

### 함수 정의

함수를 정의하는 방법은 아래와 같으며, 각각의 차이가 존재합니다

## 함수 선언문

```jsx
function add(x, y) {
  return x + y;
}
```

함수 선언문은 함수의 이름을 생략할 수 없습니다. 즉 익명 함수가 불가능 합니다. **함수 선언문은 표현식이 아닌문으로, 선언 문이 실행되면 undefined가 출력**됩니다.

함수 선언문 이기 때문에, 변수에 할당할 수 없으나, 아래와 같은 병우에는 마치 변수에 할당되는 것 처럼 보입니다

```jsx
var add = function add(x, y) {
  return x + y;
};
```

하지만 위의 경우에는 함수 선언 문이아닌, 특정 값으로, 리터럴으로 해석 되어서 그럴 수도 있다는 것입니다. 즉 코드의 문맥에 따라서, 자바스크립트가 자동적으로 인식해 해석해 간다는 것입니다.

![Untitled](#12%205324e061a4284cf28f525e290de2e5e6/Untitled.png)

자바스크립트 엔진은 함수를 호출하기 위해 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고, 거기에 함수 객체를 할당합니다. 하지만 식별자와 함수 이름이 다른 를 경우에는 다르게 적용 될 수도 있습니다.

## 함수 표현식

함수 표현식은 아래와 같은 모습을 지니고 있습니다

```jsx
var add = function (x, y) {
  return x + y;
};

console.log(add(2, 5)); // 7
```

### 함수 생성 시점과 호이스팅

```jsx
// 함수 참조
console.dir(add); // ƒ add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function (x, y) {
  return x - y;
};
```

현재 add는 함수 전체만 올라가지만 sub는 값이 할당 되기 전이므로 `var sub;` 까지만 호이스팅 되는 것을 확인 할 수 있습니다.

### 생성자함수

### 화살표 함수

## 함수 호출
