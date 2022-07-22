---
slug: "javascripts-19"
date: "2022-07-11"
title: "모던 자바스크립트 딥다이브 CH19"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# 프로토 타입

자바스크립트는 명령형, 함수형, 프로토 타입 기반 객체 지향 프로그래밍을 지원하는 멀티 패러다임 프로그래밍 언어입니다.  
그렇기 때문에 자바스크립트를 이루는 거의 '모든 것' 이 객체로, 정확하게는 원시 타입을 제외한 나머지 값들을 모두 객체라 할 수 있습니다.

## 객체 지향 프로그래밍

객체 지향 프로그래밍은 실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도해서 시작되었습니다. 즉 실체는 특징이나 성질을 나타내는 **속성** 을 가지고 있어 실체의 인식과 구별에 있어 도움을 줄 수 있습니다.  
그런데 여기서 **속성** 이란, 사람을 예로 들자면 사람의 이름, 주소, 성별, 나이, 신장, 체중 학력등을 이야기합니다. 그런데 이 모든 속성을 사용하는 것이 아닌, 그중 필요한 속성을 추려 냉어 표현하는 것을 **추상화**라고 합니다.  
그래서 아래의 코드에서는 사람의 이름과 주소라는 일부의 속성을 갖는 `person` 이라는 객체를 자바스크립트로 표현한 모습입니다

```javascript
const person = {
  name: "Lee",
  address: "Seoul",
};
console.log(person);
```

위 처럼 여러 **속성을 통해 여러개의 값을 하나의 단위로 구성한 복합적인 자료구조** 를 객체라 부릅니다.  
이번에는 원이라는 개념을 객체로 만들어 볼까요? 원은 반지름(원의 상태), 원의 지름, 둘레, 넓이를 구하는 동작이 존재합니다. 코드로 표현하면 아래와 같을 것 입니다 .

```javascript
const circle = {
  radius: 5, // 반지름

  // 원의 지름: 2r
  getDiameter() {
    return 2 * this.radius;
  },

  // 원의 둘레: 2πr
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },

  // 원의 넓이: πrr
  getArea() {
    return Math.PI * this.radius ** 2;
  },
};

console.log(circle);
// {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}

console.log(circle.getDiameter()); // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea()); // 78.53981633974483
```

객체 지향 프로그래밍은 객체의 상태 그리고 객체의 상태 데이터를 조작할 수 있는 동작을 하나의 논리적 단위로 묶어 생각합니다. 즉 객체는 상태 데이터와 동작을 하나의 논리적 단위로 묶은 복합적인 자료구조라는 것이죠.  
여기서 상태를 프로퍼티, 동작으로 메서드라 부릅니다.

## 상속과 프로토타입

> 💡상속이란 어떤 객체의 프로퍼티 혹은 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 이야기 합니다

현재 여러개의 원을 생성하려 합니다. 그래서 코드의 반복을 방지하고자 우리는 생성자 함수를 사용해 아래와같이 표현하려합니다.

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}

// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
//Circle {radius: 1, getArea: ƒ}
---
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);
//Circle {radius: 2, getArea: ƒ}
```

현재 생성자 함수를 이용해서 서로 다른 반지름을 가지는 원 객체를 만들어 주었습니다. 그렇게 된다면 `circle1` 과 `circle2` 는 모두 `getArea`라는 함수를 가지고 있게 됩니다.  
그런데 이 경우에는`getArea` 가 중복 생성되고, 모든 인스턴스가 이를 중복 소유 하게 됩니다. 즉 **내용이 동일한 메서드가 중복 생성된다는 것**으로, 코드 반복을 방지하고자 생성자 함수를 사용하였으나 다시 반복이 발생하는 것을 확인할 수 있습니다.

그래서 이러한 현상을 방지하기위해 **프로토타입을 기반으로 상속을 구현** 해볼까요?

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

// 인스턴스 생성
const circle1 = new Circle(1);
//Circle {radius: 1}
const circle2 = new Circle(2);
//Circle {radius: 2}
```

이경우에는 위와는 달리 `radius` 라는 프로퍼티를 둘다 지니고 있고, `getArea` 의 경우에는 원래의 생성자 함수의 메소드를 참조를 하게 되어 프로토타입 내에 존재하게 됩니다.  
여기서 `getArea`라는 메서드가 `Circle.prototype` 에 할당 되어 있기 때문에, 생성자 함수가 생성하는 모든 인스턴스는 `getArea`라는 메서드를 상속 받아 사용할 수 있게 된 것입니다.

## 프로토타입 객체

프로토 타입 객체는 객체간 상속을 구현하기 위해 사용됩니다.  
모든 프로토타입은 **[[Prototype]]** 이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조입니다.  
**[[Prototype]]** 에 저장되는 프로토 타입은 객체 생성 방식에 따라 결정됩니다. 이는 프로토타입이 객체의 생성 방식에 따라 결정되고 **[[Prototype]]** 에 저장된다는 것을 의미합니다.  
내부 슬롯에는 직접 접근을 할 수 없지만 우리는 `__proto__` 라는 접근자프로퍼티를 이용해 간접적으로 접근이 가능합니다.

### `__proto__` 접근자 프로퍼티

모든 객체는 `__proto__` 프로퍼티를 통해 자신의 프로토타입 즉 **[[Prototype]]** 내부 슬롯에 간접적으로 접근할 수 있습니다.  
`__proto__` 는 접근자 프로퍼티로 자체적인 값을 갖지 않고, `[[Get]]`&`[[Set]]` 프로퍼티 어트리 뷰트로 구성된 프로퍼티 입니다.그래서 getter/setter 함수를 통해 프로토타입을 취득하거나 할당할 수 있습니다.

#### 1.`__proto__` 접근자 프로퍼티는 상속을 통해 사용됩니다

`__proto__` 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니기 때문에, 상속을 통해서 모든 객체가 사용할 수 있습니다

#### 2.`__proto__` 접근자 프로퍼티는를 통해 프로퍼티에 접근하는이유

```javascript
const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.__proto__ = parent;
// parent의 프로토타입을 child로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
```

이는 상호 참조를 방지하고 프로퍼티 검색에 있어 무한 루프를 방지하기 위함입니다.  
만약 위의 코드에서 에러가 발생하지 않는다면 서로가 자신의 프로토타입이 되는 비정상적인 체인이 생성됩니다.

이를 비정상적인 체인이라 부르는 이유는, 프로토 타입 체인은 단방향 링크드 리스트로 구현 되어야 하기 때문 입니다.
만약 단방향이 아닌, 순환 참조하는 프로토타입 체인이 만들어 지게 된다면, 프로토 타입의 종점이 만들어지지 않게 되면서 프로퍼티를 검색할때 무한 루ㅍ가 발생하게 됩니다.

#### 3.`__proto__` 접근자 프로퍼티를 직접사용하는 것은 권장 되지 않습니다

### 함수객체의 prototype 프로퍼티

**함수객체의 prototype 프로퍼티** 는 생성자 함수가 생성할 인스턴스의 프로토 타입을 이야기합니다.  
함수객체는 prototype 프로퍼티를 가지고 있습니다. 그런데 함수 객체에서의 prototype 프로퍼티는 생성자 함수가 생성할 객체의 프로토 타입을 가지게 됩니다.즉 생성자 함수를 만들기 위한 프로토타입이라는 것으로, non-constructor인 화살표 함수나, 메서드 축약으로 정의된 메서드는 프로토타입 프로퍼티를 소유하지 않음과 동시에 프로토타입도 생성하지 않습니다

### 프로토타입의 constructor프로퍼티와 생성자함수

모든 프로토타입은 constructor프로퍼티를 가지는데, constructor프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가르킵니다.그리고 이러한 연결은 생성자 함수가 생성될때 함수 객체가 생성될때 이루어 집니다.

## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

생성자 함수로 생성된 인스턴스는 프로토타입의 constructor에 의해 생성자 함수와 연결됩니다. 하지만 생성자함수를 이용하지 않고, 리터럴 표기 법을 이용해 인스턴스를 생성하지 않는 객체 생성 방식 역시 존재합니다.

생성자 함수와 달리 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아닙니다. `Function` 생성자 함수를 호출해 함수를 생성한 경우에는 어떻게 될까요?. `Function` 생성자 함수로 생성된 함수는 렉시컬 스코프를 만들지 않고 전역함수인 것 처럼 스코프를 생성해 클로저도 만들지 않게 됩니다. 하지만 이 역시 constructor프로퍼티를 가지고 있는 것을 확인할 수있습니다.

리터럴 표기법에 의해 생성된 객체도 상속을 위한 프로토타입이 필요하므로, 가상적인 생성자 함수를 가지게 됩니다. 그런데 **프로토타입은 생성자 함수와 더불어 생성되므로,프로토 타입과 생성자 함수는 항상 쌍으로 존재**하게 됩니다.

## 프로토타입의 생성시점

바로 위에서 이야기 했듯, 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 항상 쌍으로 존재하기 때문에 프로토타입은 생성자 함수가 생성되는 시점에 더불에 생성됩니다.

아래의 예시를 확인해볼까요?

```javascript
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
  this.name = name;
}
```

현재 위의 함수는constructor로 생성자 함수로 호출할 수 있는 함수입니다. 함수 선언 시점에 이미 프로토 타입이 있기 때문에 위와같이 출력되는 것을 확인할 수 있습니다. 만약 아래의 화살표 함수의 경우에는 `undefined` 가 등장하게 됩니다.

---

> ㅈㅅㅎㄴㄷ 19장이 넘 많아서 2일에 걸쳐 진행하고 있습니다. 진짜 많슴니다 살려주세요ㅋㅋㅋㅋㅋ

## 객체 생성 방식과 프로토타입의 결정

다양한 방식으로 생성된 모든 객체는 모두 추상 연산 OrdinaryObjectCreate에 의해 생산됩니다. 추상 연산 OrdinaryObjectCreate는 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달 받고, 자신이 생성할 객체에 추가할 프로퍼티 목록을 옵션으로 전달할 수 있습니다.

### 객체 리터럴에 의해 생성된 객체의 프로토타입

```javascript
const obj = { x: 1 };
```

위 객체 리터럴이 평가되면 추상 연산 OrdinaryObjectCreate에 의해 다음과 같이 Object 생성자 함수와 Object.prototype과 생성된 객체 사이의 연결이 만들어 집니다.  
즉 객체 리터럴로 생성된 obj객체는 Object.prototype을 프로토타입으로 갖게 되며, 이로써 Object.prototype을 상속 받아, obj가 소유하고 있지 않은 메서드릉 사용할 수 있게 됩니다.

### Object 생성자함수에 의해 생성된 객체의 프로토타입

```javascript
const obj = new Object();
obj.x = 1;
```

Object 생성자 함수에 의해 생성된 객체의 프로토타입과 리터럴에 의해 생성된 객체의 프로토타입은 생성은 둘다 동일한 구조를 가지고 있습니다.하지만 그 둘은 프로퍼티를 추가하는 방식에 있어 차이를 가지고 있습니다.  
즉 전자의 경우에는 빈객체를 생성한 후 프로퍼티를 추가하는 반면 후잔는 객체 리터럴 내부에 프로퍼티를 추가합니다.

### 생성자함수에 의해 생성된 객체의 프로토타입

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");
```

`new` 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 다른 객체 생성방식과 마찬가지로 추상 연산자 OrdinaryObjectCreate가 호출됩니다.이 때 OrdinaryObjectCreate에 전달되는 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩 되어있는 객체 입니다.

즉 위의 코드로 예를 들자면,`Person`의 생성자 함수를 `new` 연산자를 이용해 인스턴스를 만들어 주었다면. `me` 라는 인스턴스는 결국 Person의 프로토타입인 constructor를 상속 받아 프로토타입으로 지니게된다.

<details>
<summary>🤔 그런데 여기서 객체리터럴 &Obejct 생성자 함수 vs생성자 함수?</summary>
<hr/>
<div markdown='1'>
전자의 경우에는 결국 저 객체 자체에  Object.property를 프로토타입이 되는거고 후자는생성자 함수의  property 프로퍼티에 있는 객체를 타고 들어가서 받아오게 되는 거라는거겠지?
</div>
</details>

## 프로토타입 체인

### 의미

자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근 하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Property]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순서적으로 검색하는 것을 의미합니다.

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person("Lee");

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty("name")); // true
```

위의 코드에서 `Person` 생성자 함수에 의해 생성된 `me` 객체는 `Object.propetry` 의 메서드인 `hasOwnProperty` 를 호출 할 수 있는 것 역시 **프로토타입 체인의 종점인 `Object.propetry` 를 상속** 받았기 때문입니다.

그런데 이전에 우리는 스코프체인이라는 것역시 한번 살펴 보았습니다. 스코프 체인과 프로토타입 체인은 어떤 차이가 존재할까요?  
전자는 상속과 프로퍼티 검색을 위해 후자는 식별자 검색을 위한 것이라는 차이가 존재합니다.

## 오버라이딩과 프로퍼티 섀도잉

여기서 오버라이딩이란 상위 클래스가 가지고 있는 매서드를 하위 클래스가 재정의 하여 사용하는 방식을 의미합니다.

```javascript
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person("Lee");

// 인스턴스 메서드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```

위의 코드를 보면 현재 `Person` 이라는 즉시 실행 함수 내에 다시 `Person`이라는 생성자 함수가 존재하고 내부에 `sayHello()` 라는 프로토타입 메서드가 존재합니다.  
이때 `me` 라는 인서턴스에 새롭게 `sayHello()`라는 인스턴스 메서드를 만들어 출력해 보았을때에는 결국 가장 마지막의 매서드가 출력되는 것을 확인할 수 있습니다.

- 프로토티입의 프로퍼티: 프로토타입 프로퍼티
- 인스턴스의 프로퍼티: 인스턴스 프로퍼티

이러한 현상은 프로토타입 체인으로 인해 발생한 것으로, 같은 이름의 프로퍼티를 인스턴스에 추가하면, 프로토타입 체인을 따라 프로터타입 프로퍼티를 검색하게 됩니다.  
이때 프로토타입 프로퍼티를 검색해 프로토타입 프로퍼티를 덮어쓴느 것이 아니라, 인스턴스 프로퍼티로 추가하게 됩니다.

이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 섀도잉이라합니다.

## 프로토타입의 교체
