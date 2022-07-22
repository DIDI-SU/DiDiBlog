---
slug: "javascripts-1902"
date: "2022-07-13"
title: "모던 자바스크립트 딥다이브 CH19"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# 프로토 타입

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

me.sayHello(); // Hey! My name is Lee
```

위의 코드를 보면 현재 `Person` 이라는 즉시 실행 함수 내에 다시 `Person`이라는 생성자 함수가 존재하고 내부에 `sayHello()` 라는 프로토타입 메서드가 존재합니다.  
이때 `me` 라는 인서턴스에 새롭게 `sayHello()`라는 인스턴스 메서드를 만들어 출력해 보았을때에는 결국 가장 마지막의 매서드가 출력되는 것을 확인할 수 있습니다.

- 프로토티입의 프로퍼티: 프로토타입 프로퍼티
- 인스턴스의 프로퍼티: 인스턴스 프로퍼티

이러한 현상은 프로토타입 체인으로 인해 발생한 것으로, 같은 이름의 프로퍼티를 인스턴스에 추가하면, 프로토타입 체인을 따라 프로터타입 프로퍼티를 검색하게 됩니다.  
이때 프로토타입 프로퍼티를 검색해 프로토타입 프로퍼티를 덮어쓴느 것이 아니라, 인스턴스 프로퍼티로 추가하게 됩니다.

이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 섀도잉이라합니다.

> 🚀 프로토타입 프로퍼티를 변경 또는 삭제하려면 하위 객체를 통해 프로토타입 체인으로 접근하는 것이 아니라 프로토타입에 직접 접근해야 합니다.

## 프로토타입의 교체

프로토타입은 임의의 다른 객체로 변경할 수있습니다.

### 생성자 함수에 의한 프로토타입의 교체

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person("Lee");
/*
console.dir(Person)
VM187:1 
ƒ Person(name)
arguments: null
caller: null
length: 1
name: "Person"
prototype: {sayHello: ƒ}*/
```

현재 `Person.prototype`에 객체 리터럴을 할당해, 프로토 타입을 교체해 주었습니다. 그리고 `Person`을 확인 해보면 `prototype: {sayHello: ƒ}` 를 확인할 수 있습니다. constructor 프로퍼티 대신 교체된 프로퍼티가 들어가게 된 것이죠.

### 인스턴스에 의한 프로토타입의 교체

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

// ① me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee
```

위의 함수는 인스턴스의 `__proto__` 접근자 프로퍼티를 통해 접근해 프로토 타입을 교체한 모습입니다.  
`me`의 객체를 `parent` 라는 객체로 교체한 모습으로 생성자 함수로 교체한 것과 유사하게 me에는 `constructor`가 없습니다. 결과적으로는 생성자 함수로 교체 하는 것과 인스턴스로 교체하는 것의 차이가 크지 않아 보이지만, 전자는 앞으로 생성되는 인서턴스에서만 교체가 되는 것 후자는 앞으로 생성되는 인스턴스에는 교체가 발생하지 않는다는 차이가 존재합니다.

## instanceof 연산자

`instanceof` 연산자는 아래와 같은 기본 형태를 가집니다.

> 객체 instanceof 생성자 함수

좌변에 객체를 가르키는 식별자, 우변에 생성자 함수를 가르키는 식별자를 피연산자를 받습니다.

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

console.log(me instanceof Person); // true

console.log(me instanceof Object); // true
```

현재 `Person` 은 me 객체의 프로토타입 체인 내의 존재하므로 `true` 가 출력 됩니다. 그리고 `Object` 역시 체인내의 존재하게 되므로 `true` 가 출력되는 것을 확인할 수 있습니다.

`instanceof` 연산자는 생성자 함수의 protoype에 바인딩된 객체가 프로토타입 체인상에 존재하는지 확인합니다.

위의 코드의 프로토 타입을 교체해 `instanceof` 연산자의 동작을 확인해 봅시다.

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person("Lee");

// 프로토타입으로 교체할 객체
const parent = {};

// 프로토타입의 교체
Object.setPrototypeOf(me, parent);
```

현재 me의 프로토 타입은 parent로 교체 된 상태입니다. 이제 연산자를 이용해 확인해 볼까요

```javascript
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false
```

현재 `Person` 생성자 함수와 parent객체는 연결되어 있지 않으므로 false가 출력되는 것을 확인할 수 있습니다

```javascript
console.log(me instanceof Object); // true
```

하지만 Object의 경우에는 프로토타입의 체인상에 존재하므로 true가 존재합니다.

---

직접상속 부터는 ㄹㅇ내용적으로는 그렇구나 라는 생각은 들지만 그래서 이걸 어디서 사용하게 될까 하는 생각이 들엇 일단은 멈추기로 했습니다
