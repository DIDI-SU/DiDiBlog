---
slug: "/javascripts-28"
date: "2022-08-18"
title: "모던 자바스크립트 딥다이브 CH25-1"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# #25-1

# 클래스

## 클래스와 생성자 함수

자바스크립트는 프로토타입 기반의 객체 지향언어로, 여기서 프로토타입 기반의 객체 지향언어란 **클래스가 필요 없는 객체 지향 프로그래밍 언어**를 의미합니다. 그렇기 때문에 자바스크립트는 클래스 없이도, 생성자 함수와 프로토 타입을 이용해 객체 지향언어의 상속을 구현할 수 있습니다.

클래스와 생성자 함수는 매우 유사하게 동작을 하지만 몇가지 차이점이 존재 합니다. 차이점은 아래와 같습니다.

1. 클래스를 `new` 연산자 없이 호출하면 에러가 발생한다. 하지만 생성자 함수를 `new` 연산자 없이 호출하면 일반함수로서 호출 된다.

⇒ 생성자 함수의 경우에는 호출이 가능하지만 클래스를 `new` 없이 호출하는 경우 `TypeError: Class constructor Person2 cannot be invoked without 'new'` 라는 에러를 만나게 됩니다. 즉 new 없이는 호출이 불가능 하다는 것을 보여 줍니다

1. 클래스는 상속을 지원하는 extends 와 super 키워드를 제공합니다. 하지만 생성자 함수는 지원하지 않습니다
2. 클래스는 호이스팅이 발생하지 않는 것 처럼 동작하지만, 함수 선언문으로 정의 된 생성자 함수는 함수 호이스팅이, 함수 표현식으로 정의한 생성자 함수는 변수 호이스팅이 발생합니다( 원인:TDZ)
3. 클래스 내의 모든 코드에는 암묵적으로 `stric mode` 가 지정되어 실행되며, 해제할 수 없습니다. 하지만 생성자 함수는 암묵적으로 지정되지 않습니다
4. 클래스의 constructor , 프로토 타입 메서드, 정적 메서드 모두 프로퍼티 어트리뷰트 [[Enumerable]] 의 값이 false로 , 열거가 불가능

## 클래스의 정의

### 클래스의 선언과 표현문

클래스는 아래와 같이 선언해 줄 수 있습니다. 또한 익명 함수 처럼, 표현식으로도 클래스를 선언해 줄 수 있습니다

```javaScript
//클래스 선언문
class Person {}
//익명 클래스
const Person = class {};
//기명 클래스
const Person2 = class MyClass {};
```

클래스는 함수로, 값처럼 사용할 수 있는 일급 객체 입니다. 클래스의 몸체에는 0개 이상의 메서드만 정의할 수 있습니다. 클래스 몸체에서 정의 가능한 메서드는 아래와 같습니다

### constructor(생성자)

```javaScript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
  }
}
```

`constructor` 는 생성자 함수의 역할을 해주는 메소드라 보면 용이합니다

### 프로토타입 메서드

```javaScript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}
```

### 정적 메서드

```javaScript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
  // 정적 메서드
  static sayHello() {
    console.log("Hello!");
  }
}
```

정적 메서드의 경우에는, 프로토타입 체인을 통해 접근 할 수 없어 `me.sayHello()` 로는 접근이 불가능 하나, `Person.sayHello()` 로는 접근이 가능합니다.

## 클래스 호이스팅

클래스를 `typeof` 로 확인한 결과 `function` 이라는 자료형을 얻게됩니다. 이는 클래스는 함수로 평가 된다는 의미입니다. 그렇다면 함수처럼 클래스 역시 호이스팅이 발생할까요?

```javaScript
console.log(Person);
// ReferenceError: Cannot access 'Person' before initialization

// 클래스 선언문
class Person {}
```

위 코드를 통해, 우리는 클래스에서는 마치 호이스팅이 발생하지 않는 것 처럼 보이는 것을 확인할 수 있습니다. 하지만 클래스는 `const` 나 `let` 키워드로 선언한 변수 처럼 호이스팅 됩니다. 이 말의 의미는 클래스 역시 호이스팅은 되지만 일시적 사각 지대에 빠져호이스팅이 발생하지 않는 것처럼 동작하게 된다는 것입니다.

## 정적 인스턴스 생성

클래스는 생성자 함수이며, `new` 연산자와 함께 호출되어 인스턴스를 생성합니다.

```javaScript
class Person {}

// 인스턴스 생성
const me = new Person();
console.log(me); // Person {}
```

하지만 위에서 확인해 보았듯이, 클래스의 경우 `new` 없이 호출 하는 경우에는, 에러가 발생하게 됩니다.

## 클래스에서의 메서드

### constructor(생성자)

```javaScript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
  }
  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}
```

`constructor` 는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드로, 이 `constructor` 라는 이름은 변경할 수 없습니다.

위에서 확인해 보았듯이, 클래스는 인스턴스를 생성하기 위한 생성자 함수로 , 결국 클래스 역시 함수 객체 임을 의미합니다. 그렇기 때문에 클래스 역시 함수 객체 고유의 프로퍼티를 모두 지니고 있으며, 자신의 스코프 체인을 구성하고 있습니다.

```javaScript
// 인스턴스 생성
const me = new Person("Lee");
console.log(me);
```

클래스의 `constructor` 는 생성자 함수와 마찬가지로, `constructor` 내부에서 this에 추가한 프로퍼티는 인스턴스 프로퍼티가 됩니다. 즉 `constructor` 내부의 this는 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스를 가르킨다는 것입니다.

위의 경우에는 `[me.name](http://me.name)` 이 `Lee` 이므로, 결과적으로는 'Hi! My name is Lee’ 라는 값이 출력된느 것을 확인할 수 있습니다

### constructor의 특징

```javaScript
class Person {
  constructor() {}
  constructor() {}
}
//SyntaxError: A class may only have one constructor
```

1. `constructor` 는 클래스 내에 최대 한개만 존재할 수 있습니다. 한개 초과를 지니게 된다면 에러가 발생합니다

```javaScript
class Person {}
```

2. `constructor` 는 생략이 가능합니다

이 때, `constructor` 를 생략한 클래스는 암묵적으로 정의된 빈 `constructor` 에 의해 빈객체를 생성하게 됩니다.

```javaScript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
    return {};
  }
}
```

1. `constructor` 는 별도의 반환문을 갖지 않아야 합니다

`new` 연산자와 함께 클래스가 호출되면, 생성자 함수와 동일하게 암묵적으로 this, 즉 인스턴스를 반환하는데, 이때 별도의 반환문으로, 위와 같이 다른 객체를 명시적으로 반환하면, 인스턴스가 아닌 명시한 객체가 반환됩니다. 하지만 만약 객체가 아닌 원시값을 넣게 된다면, 원시값은 무시되고 this가 반환됩니다.

### 프로토타입 메서드

이전 생성자 함수에서는 별개의 명시적인 프로토타입 메서드를 추가해야했으나.클래스의 경우에는 몸체에 메서드를 작성해 주면 됩니다.

```javaScript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}
```

위와 같이 작성해 주면되는데, 이 때 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 되어, 인스턴스에는 name 프로퍼티만 존재하고 프로토타입 메서드 내에서 `sayHi` 를 확인 할 수 있습니다.

### 정적 메서드

```javaScript
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public하다.
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
  // 정적 메서드
  static sayHello() {
    console.log("Hello!");
  }
}
```

정적 메서드의 경우에는, 프로토타입 체인을 통해 접근 할 수 없어 `me.sayHello()` 로는 접근이 어려워, 클래스 자체로 접근하는, `Person.sayHello()` 로는 접근이 가능합니다.

### 정적메서드와 프로토타입 메서드

아래의 코드를 통해 정적 메서드와 프로토타입 메서드의 차이를 확인해볼까요?

### 정적 메서드 예시

```javaScript
class Square {
  // 정적 메서드
  static area(width, height) {
    return width * height;
  }
}

console.log(Square.area(10, 10)); // 100
```

### 프로토타입 메서드 예시

```javaScript
class Square {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  // 프로토타입 메서드
  area() {
    return this.width * this.height;
  }
}

const square = new Square(10, 10);
console.log(square.area()); // 100
```

두 메소드 모두 `area` 를 구해주는 함수로, 둘다 같은 결과를 보이고 있습니다. 하지만 두 메서드는 아래와 같은 차이점을 지니고 있습니다

1. 정적 메서드와 프로토타입 메서드는 자신이 속해 있는 프로토타입 체인이 다르다

<aside>
💡 정적 메서드⇒ 클래스/ 프로토타입⇒인스턴스 에 존재 합니다

</aside>

⇒ 정적 메서드는 클래스에 바인딩 되어있기 때문에, 인스턴스의 프로토타입 체인상에 존재하지 않으며 반대로, 프로토타입 메서드는 인스턴스에 프로토타입 체인상에는 클래스가 존재하지 않아 인스턴스 클래스의 메서드를 상속 받을 수 없습니다

1. 정적 메서드는 클래스로 호출하고, 프로토타입 메서드는 인스턴스로 호출한다

```javaScript
//정적 메서드에서의 호출
console.log(Square.area(10, 10)); // 100
//프로토타입 메서드 에서의 호출
const square = new Square(10, 10);
console.log(square.area()); // 100
```

1. 정적 메서드는 인스턴스 프로퍼티를 참조할 수 없으나 프로토타입 메서드는 프로퍼티를 참조할 수 있다

⇒ 프로토타입 메서드의 경우에는 인스턴스로 호출해야하므로, this는 인스턴스를 가르키게 되고 정적 메서드는 인스턴스가 아닌 class를 가르키게 됩니다. 즉 프로토타입 메서드와 정적 메서드는 바라보는 대상이 다르다는 것을 의미합니다

### 클래스에서 정의한 메서드 특징

1. `function` 키워드를 생략한 메서드 축약 표현을 사용합니다
2. 객체 리터럴과는 달리 클래스에 메서드를 정의할때에는 콤마가 필요하지 않습니다
3. 암묵적으로 `strict mode` 로 실행됩니다
4. 클래스의 constructor , 프로토 타입 메서드, 정적 메서드 모두 프로퍼티 어트리뷰트 [[Enumerable]] 의 값이 false로 , 열거가 불가능 합니다
5. 내부 메서드 [[Constructor]]을 갖지 않아 new 연산자와 함께 호출 할 수 없습니다

## 클래스의 인스턴스 생성과정

클래스의 인스턴스 생성 과정은 생성자 함수에서의 인스턴스 생성 과정과 유사하게 흘러갑니다.

1. 인스턴스 생성과 this 바인딩

`new` 연산자와 클래스를 호출하면, constructor 내부 코드가 실행되기 앞서 암묵적으로 빈 객체가 생성됩니다. 이때 여기의 빈 객체가 생성한 인스턴스가 됩니다.

이후 클래스가 생성한 인스턴스의 프로토타입으로 클래스의 프로토타입 프로퍼티가 가르키는 객체가 설정됩니다.

마지막으로 결국 인스턴스는 this에 바인딩 되어, constructor의 this는 인스턴스를 가르키게됩니다

1. 인스턴스 초기화

constructor내부 코드가 실행되어 this에 바인딩 되어있던 인스턴스를 초기화 합니다. this에 바인딩되어있는 인스턴스에 프로퍼티를 추가하고, constroctor가 인수로 전달 받은 초기 값으로 인스턴스의 프로퍼티 값을 초기화 합니다.

1. this를 암묵적으로 반환합니다.

- 🤔 그런데 여기서 인스턴스에 프로퍼티를 추가한다 라는 말이 좀 ?? 하는 것 같음..
