---
slug: "javascripts-1920"
date: "2022-07-13"
title: "모던 자바스크립트 딥다이브 CH20"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# Stric Mode

```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

현재 위의 코드의 실행 결과는 무엇일까요? x를 선언해주지 않고 사용해 주고 있다 생각이 들어 처음에 보앗을 때에는 저는 오류가 나올 것 같았습니다.

위의 코드는 foo 함수가 실행 될시에, 함수 스코프에 x의 변수의 선언을 검색합니다. 하지만 foo 함수 스코프에는x 변수의 선언이 없으므로, 그 상위인 전역 스코프에서 x 변수의 선언을 검색하게됩니다. 하지만 전역에도 x가 없으므로, 저는 오류가 발생할 것이라는 생각이 들었지만 반대로 10이 출력되는 것을 확인할 수 있습니다.

위와 같은 현상은 **암묵적 전역** 으로 단어 그대로 암묵적으로 전역 객체에 x프로퍼티를 동적 생성한 현상을 이야기합니다.

이처럼 개발자의 의도와 반대로 혹은 조금 다르게 코드가 실행되는 것을 방지하기위해 ES5 부터 strict mode가 추가되었습니다.

## strict mode의 적용

```javascript
"use strict";

function foo() {
  x = 10;
}
foo();
```

strict mode를 이용해 주기 위해서는 위와같이 전역의 상단 혹은 함수 몸체의 상단에 `"use strict";` 를 추가 사용해 주어야 합니다.

### 전역에서의 strict mode를 지양할것

하지만 전역에 사용해주는 것은 지양해주어야합니다.
이는 strict mode가 스크립트 단위로 적용되어 해당 스크립트에 한정되어 적용 됩니다. 하지만 non-strict moded와 strict mode를 혼용하는 경우 라이브러리에서 오류가 발생할 수 있으므로 , 해당 스크립트에서만 적용될 수 있도록 유의해 주어야합니다

### 함수 단위로 strict mode 적용을 지양할 것

```javascript
(function () {
  // non-strict mode
  var lеt = 10; // 에러가 발생하지 않는다.

  function foo() {
    "use strict";

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
})();
```

함수 단위에서의 사용역시 문제가 발생할 수도 있으므로 위와같이 사용해 주는 것이 용이합니다.

## strict mode가 발생시키는 에러

### 암묵적 전역

선언하지 않은 변수를 참조시 ReferenceError가 발생합니다

### 변수 함수 매개 변수의 삭제

delete 연산자로 변수, 함수, 매개 변수를 삭제시 SyntaxError가 발생합니다

### 매개변수 이름의 중복

중복된 매개변수 이름을 사용시 SyntaxError가 발생합니다

## strict mode 적용에 의한 변화

### 일반 함수의 this

```javascript
(function () {
  "use strict";

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }
  new Foo();
})();
```

함수를 일반함수로서 호출하면 this에 undefined가 바인딩 됩니다.

### arguments 객체

```javascript
(function (a) {
  "use strict";
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```

매개변수에 전달된 인수를 재할당에 변경해도 arguments 객체에 반영되지 않습니다.
