---
slug: "/javascripts-30"
date: "2022-08-19"
title: "모던 자바스크립트 딥다이브 CH25-2"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# #25-2

# Class - 프로퍼티

## 인스턴스 프로퍼티

인스턴스 프로퍼티 constructor내부에서 정의 해야하며, 보통 아래와 같은 모습을 하고 있으며 언제나 public합니다.

```javaScript
class Person {
  constructor(name) {
    // 인스턴스 프로퍼티
    this.name = name;
  }
}

const me = new Person("Lee");
console.log(me); // Person {name: "Lee"}
```

<aside>
💡 여기서 `public` 과 `private` 란 전자의 경우에는 어디에서라도 접근이 가능하다는 것을 이야기하며 후자의 경우 클래스 내부에서만 접근이 가능하다는 것을 의미합니다.

</aside>

## 접근자 프로퍼티

접근차 프로퍼티는 자체적으로 값을 지니지 않고, 다른 데이터의 프로퍼티를 읽고나 저장할 때 사용하는 접근자 함수로, 대표적으로는 getter와 setter 함수가 존재합니다. 그런데 이런한 접근자 프로퍼티는 아래와 같이 클래스에서도 사용이 가능합니다.

```javaScript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
}

const me = new Person("Ungmo", "Lee");
```

현재 위의 함수는 constructor과 접근자 프로퍼티로 구성되어져 있습니다. `me` 라는 변수는 인스턴스가 되어 아래와 같이 접근자 프로퍼티를 확인할 수 있습니다

```javaScript
// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(`${me.firstName} ${me.lastName}`); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
me.fullName = "Heegun Lee";
console.log(me); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(me.fullName); // Heegun Lee

// fullName은 접근자 프로퍼티다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
console.log(Object.getOwnPropertyDescriptor(Person.prototype, "fullName"));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

그래서 마지막으로 `fullName` 를 객체의 속성을 확인하는 메소드인 `getOwnPropertyDescriptor` 를 통해 확인해보면, 접근자 프로퍼티 어트리뷰트를 가지는 것을 확인할 수 있습니다.

## 클래스 필드 정의 제한

```java
// 자바의 클래스 정의
public class Person {
  // ① 클래스 필드 정의
  // 클래스 필드는 클래스 몸체에 this 없이 선언해야 한다.
  private String firstName = "";
  private String lastName = "";

  // 생성자
  Person(String firstName, String lastName) {
    // ③ this는 언제나 클래스가 생성할 인스턴스를 가리킨다.
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public String getFullName() {
    // ② 클래스 필드 참조
    // this 없이도 클래스 필드를 참조할 수 있다.
    return firstName + " " + lastName;
  }
}
```

자바의 경우에는 클래스 필드가 마치 클래스 내부의 변수 처럼 이용됩니다. 여기서 클래스 필드가 클래스의 내부 변수 처럼 이용된다는 것은 위의 코드 처럼, 1에 정의 되어있는 클래스 필드를의 변수를 this 없이 선언, 하거나 this 없이 참조하는 것을 의미합니다.

하지만 자바스크립트의 경우에는 인스턴스의 프로퍼티를 참조하는 경우에는 반드시 this 를 이용해주거나, 몸체에는 메서드만 선언해주어야 합니다.

하지만 최근의 아래의 코드의 경우에는 에러 없이 정상출력되는 것을 확인해 볼 수 있습니다.

```javaScript
class Person {
  // 클래스 필드 정의(ES2022)
  name = "Lee";
}

const me = new Person("Lee");
```

그래서 반대로 아래와 같이 `class` 를 정의 하는 경우에는 에러를 만나게 됩니다

```javaScript
class Person2{ this.name='Lee'};
//Uncaught SyntaxError: Unexpected token '.'
```

만약 클래스 필드를 참조하는 경우에는, `this` 를 이용해 접근해 주어야 합니다

```javaScript
class Person2 {
  // 클래스 필드 정의(ES2022)
  name = "Lee";
  constructor() {
    console.log(this.name);
  }
}

const me = new Person2("Lee");
```

인스턴스를 생성할 때 외부의 초기값으로 초기화 해 주어야하는 경우에는 아래와 같이 이용해 주어야 합니다

```javaScript
class Person2 {
  name;
  constructor(name) {
    console.log(this.name);
  }
}

const me = new Person2("Lee");
```

그런데 만약, 인스턴스를 생성하는 단계에서 클래스 필드를 초기화 할 필요가 있다면,

`constructor` 밖에서 클래스 필드를 초기화 하는 것보다 아래와 같이, `constructor` 내부에서 바로 클래스 필드를 참조해 초기값을 할당 하게 되어 인스턴스에 자동추가 되므로, 아래와 같이도 사용해 줄 수 있습니다.

```javaScript
class Person2 {
  constructor(name) {
    console.log(this.name);
  }
}

const me = new Person2("Lee");
```

### 클래스 필드와 화살표 함수

<aside>
💡  진짜 여긴 잘 모르겠음…좀 으잉 싶은 느낌

</aside>

```javaScript

document.body.innerHTML += '<button class='btn'>0</button>'
    class App {
      constructor() {
        this.$button = document.querySelector('.btn');
        this.count = 0;

        // increase 메서드를 이벤트 핸들러로 등록
        // 이벤트 핸들러 increase 내부의 this는 DOM 요소(this.$button)를 가리킨다.
        // 하지만 increase는 화살표 함수로 정의되어 있으므로
        // increase 내부의 this는 인스턴스를 가리킨다.
        this.$button.onclick = this.increase;

        // 만약 increase가 화살표 함수가 아니라면 bind 메서드를 사용해야 한다.
        // $button.onclick = this.increase.bind(this);
      }

      increase () {this.$button.textContent = ++this.count;}
    }
    new App();
```

만약 위의 코드처럼 `increase` 를 화살표 함수가 아닌 일반 함수로 사용하는 경우에는 에러가 발생합니다. 그 이유는 `this.$button` 가 `undefined` 로 나왔기 때문인데요, 여기서 this는 결국 `<button class='btn'>0</button>` 를 가르키게 됩니다. 그런데 현재 `<button class='btn'>0</button>` 에는 `$button` 이 없으므로 에러가 발생하게 되는 것입니다.

그래서 화살표 함수로 바꾸게 된다면, 인스턴스가 this가 되므로 무사히 동작되게 될 것 입니다.

## Private 필드 정의 제안

자바스크립트의 인스턴스 프로퍼티는 인스턴스를 통해 클래서 외부에서 언제나 참조할 수 있는 `public` 의 성격을 보이고 있습니다

```javaScript
class Person {
  constructor(name) {
    this.name = name; // 인스턴스 프로퍼티는 기본적으로 public하다.
  }
}

// 인스턴스 생성
const me = new Person("Lee");
console.log(me.name); // Lee
```

그래서 현재, 외부에서도 `me.name` 에 쉽게 접근 할 수 있습니다. 클래스 필드 역시 유사하지만 현재 `private` 필드를 정의할 수 있는 새로운 방법이 제안되어 아래와 같이 사용해 주면 됩니다.

```javaScript
class Person {
  // private 필드 정의
  #name = "";

  constructor(name) {
    // private 필드 참조
    this.#name = name;
  }
}

const me = new Person("Lee");

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
console.log(me.#name);
// SyntaxError: Private field '#name' must be declared in an enclosing class
```

하지만 이 경우, 클래스 내부에서만 참조 가능하며, 자식 클래스에서도 접근이 불가능 합니다.

## Static 필드 정의 제안

`static` 필드 역시 도입이 되어, `static` 한 `private` 역시 등장하게 되었습니다

```javaScript
class MyMath {
  // static public 필드 정의
  static PI = 22 / 7;

  // static private 필드 정의
  static #num = 10;

  // static 메서드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
```

## 상속에 의한 클래스 확장

상속에 의한 클래스의 확장이란, 단어 그대로 기존 클래스를 상속 받아 새로운 클래스를 확장해 정의 하는 것입니다. 현재 아래는 `Animal` 이라는 클래스를 상속받은 `Bird` 라는 클래스 입니다

```javaScript
class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() {
    return "eat";
  }

  move() {
    return "move";
  }
}

class Bird extends Animal {
  fly() {
    return "fly";
  }
}
const bird = new Bird(2, 13);

console.log(bird.age);
console.log(bird.eat());
console.log(bird.move());
console.log(bird.fly());
```

`bird` 의 경우에는 `Animal` 이라는 클래스가 지니고 있던 값들 뿐만아니라, 자신의 fly까지 사용할 수 있습니다. `bird` 를 자세히 확인하면 아래와 같습니다

![Untitled](#25-2%20a3ce3a1ad71c429e9455c593c1d94b6b/Untitled.png)

<aside>
💡 서브 클래스: 확장 된 클래스 혹은 자식 클래스 
수퍼 클래스: 상속된 클래스 혹은 부모 클래스

</aside>

### 동적 상속

`extends` 키워드는 클래스 뿐만아니라, 생성자 함수를 상속 받아 클래스를 상속받을 수 있습니다. 단 `extends` 키워드 앞에는 반드시 클래스가 와야합니다.

```javaScript
// 생성자 함수
function Base(a) {
  this.a = a;
}
// 생성자 함수를 상속받는 서브클래스
class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```

결국 `extends` 키워드 다음에 [[Constructor]] 내부 메서드를 갖는, 함수 객체로 평가 되는 표현식을 모두 사용할 수 있습니다.

🙂 결국에는 생성자 함수, 일반 함수도 가능한데 화살표 함수는 안될 듯!

## super 키워드

`super` 은 수퍼클래스(부모클래스)의 `constructor` 을 호출 하며, 이를 참조하면 수퍼 클래스의 메서드를 호출 할 수 있습니다. 그래서 아래와 같이 사용해 줄 수도 있습니다

```javaScript
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

class Derived extends Base {
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }
}

const result = new Derived(1, 2, 3);

console.log(result); //Derived {a: 1, b: 2, c: 3}
```

위의 경우에는 현재 부모 클래스에서 추가한 프로퍼티와 자식 클래스에서 추가한 프로퍼티를 갖는 인스턴스인 경우에는 `constructor` 를 필수적으로 작성해 주어야합니다.

```javaScript
// 수퍼클래스
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
}

// 서브클래스
class Derived extends Base {
  // 다음과 같이 암묵적으로 constructor가 정의된다.
  // constructor(...args) { super(...args); }
}

const derived = new Derived(1, 2);
console.log(derived); // Derived {a: 1, b: 2}
```

하지만 만약 , 위와같이 부모클래스의 프로퍼티를 그대로 가지는 자식 클래스를 이용해 주는 경우에는, 자식 클래스를 호출하며 전달한 인수는 자식 클래스에서 암묵적으로 정의된 `constructor` 의 `super` 호출을 통해 모두 부모 클래스의 `constructor` 에 전달됩니다.

### super 호출 시 주의 사항

```javaScript
class Base {}

class Derived extends Base {
  constructor() {
    console.log("constructor call");
  }
}

const derived = new Derived();
//Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
/*
class Base {}

class Derived extends Base {}

const derived = new Derived();
console.log(derived);*/
```

1. 자식 클래스에서 `constructor` 를 생략하지 않는 경우 자식 클래스의 `constructor` 에서는 반드시 `super` 을 호출해 주어야합니다

```javaScript
class Base {}

class Derived extends Base {
  constructor() {
    // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
    this.a = 1;
    super();
  }
}

const derived = new Derived(1);
```

1. 자식 클래스 에서 `super` 을 호출하기 전까진 `this` 를 참조할 수 없습니다.

```javaScript
class Base {
  constructor() {
    super(); // SyntaxError: 'super' keyword unexpected here
  }
}

function Foo() {
  super(); // SyntaxError: 'super' keyword unexpected here
}
```

1. super은 반드시 자식 클래스의 `constructor` 에서만 호출 합니다. 서브 클래스가 아닌 `constructor` 나 함수에서 호출시 에러가 발생합니다

### super 참조

메서드 내에서 `super` 을 참조하면 부모 클래스의 메서드를 호출할 수 있습니다

1. 자식 클래스의 프로토타입 메서드 내에서 `super.sayHi()` 는 부모 클래스의 프로터타입 메서드 `sayHi()` 를 가르킨다

```javaScript
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  sayHi() {
    return `${super.sayHi()}.how are you doing`;
  }
}
const derived = new Derived("Lee");
console.log(derived.sayHi()); // Hi! Lee. how are you doing?
```

아래의 코드는 위의 코드와 동일하게 동작합니다.

```javaScript
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}`;
  }
}

class Derived extends Base {
  sayHi() {
    // __super는 Base.prototype을 가리킨다.
    const __super = Object.getPrototypeOf(Derived.prototype);
    return `${__super.sayHi.call(this)} how are you doing?`;
  }
}
```

`super` 의 경우에는 자신을 참조하고 있는 메서드가 바인딩 되어 있는 객체의 프로토 타입을 가르킵니다. 즉 위의 코드를 풀어 이야기하자면, `super` 은 Derived의 `sayHi()` 가 바인딩 되어 있는 `Derived.prototype` 의 프로토타입인 `Base.prototype` 을 가르킨다는 것으로, `super.sayHi()` 는 결국 `Base.prototype.sayHi()` 를 가르키게 됩니다. 단 `Base.prototype.sayHi()` 를 호출할대에는 call을 이용해 this를 전달해 주어야합니다.

```javaScript
class Derived extends Base {
  sayHi() {
    // __super는 Base.prototype을 가리킨다.
    const __super = Object.getPrototypeOf(Derived.prototype);
    return `${__super.sayHi(this)} how are you doing?`;
  }
}

const hi = new Derived("lee");

console.log(hi.sayHi()); //Hi! undefined how are you doing?
```

call 을 이용하지 않고 this를 전달하는 경우에는, 그 `this` 가 `Base.prototype.sayHi()` 의 `this` 를 가르키게 됩니다. 하지만 `name` 프로퍼티는 인스턴스에 존재하므로 `call` 메서드를 이용해 전달해 주어야합니다.

1. 자식 클래스의 정적 메서드 내에서 `super.sayHi()` 는 부모 클래스의 정적 메서드 `sayHi()` 를 가르킵니다

```javaScript
// 수퍼클래스
class Base {
  static sayHi() {
    return "Hi!";
  }
}

// 서브클래스
class Derived extends Base {
  static sayHi() {
    // super.sayHi는 수퍼클래스의 정적 메서드를 가리킨다.
    return `${super.sayHi()} how are you doing?`;
  }
}

console.log(Derived.sayHi()); // Hi! how are you doing?
```

## 상속 클래스의 인스턴스 생성 과정

아래의 코드를 통해, 상속 클래스의 인스턴스 생성 과정을 살펴봅시다. 화이팅…………정리가 끝나가….

```javaScript
//가로, 세로를 얻는 constructor 와  넓이를 구하는 메소드, 길이를 보여주는 메소드
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  toString() {
    return `width = ${this.width}, height = ${this.height}`;
  }
}

// 부모 클래스를 상속 받는 자식 클래스
class ColorRectangle extends Rectangle {
  // 부모에게 가로 세로 받고, 추가적으로   color을 받아 이용
  constructor(width, height, color) {
    super(width, height);
    this.color = color;
  }

  // 메서드 오버라이딩
  toString() {
    return super.toString() + `, color = ${this.color}`;
  }
}

const colorRectangle = new ColorRectangle(2, 4, "red");
console.log(colorRectangle); // ColorRectangle {width: 2, height: 4, color: "red"}

// 상속을 통해 getArea 메서드를 호출
console.log(colorRectangle.getArea()); // 8
// 오버라이딩된 toString 메서드를 호출
console.log(colorRectangle.toString()); // width = 2, height = 4, color = red
```

### 1. 서브 클래스의 super 호출

자바스크립트 엔진은 클래스를 평가할 때, 부모 클래스와 자식 클래스를 구분하기위해 ‘base’ 또는 ‘derived’ 를 값으로 갖는 내부 슬롯 [[ConstruvtorKind]] 를 가집니다. 그래서 부모클래스의 경우에는 전자를 자식 클래스를 후자의 값으로 설정 되어있어, 자바스크립트는 그 값을 이용해 부모클래스와 자식 클래스를 구분합니다.

원래의 클래스는 `new` 연산자와 함께 호출 되었을 때 암묵적으로 빈객체, 즉 인스턴스를 생성하고 이를 `this` 에 바인딩합니다. 하지만 자식 클래스의 경우에는 자신이 직접 인스턴스를 생성하지 않고, 부모 클래스에게 인스턴스 생성을 위임합니다.

그래서 자식 클래스의 `constructor` 에서 반드시 `super` 을 호출해 주어야합니다. 즉 인스턴스를 생성하는 것은 결국 부모 클래스 이므로, 부모 클래스의 `constructor` 를 호출해주는 `super` 을 호출하지 않으면 인스턴스를 생성할 수 없기 때문입니다.

<aside>
💡  결국 자식 클래스가 인스턴스를 생성하기 위해서, super을 이용해서 부모 클래스의  `constructor` 를 호출해 주어야 하므로,  위에서 반드시 `super` 을 호출해 주어야한다는 이야기가 있던 거였음 ㅇㅇ

</aside>

### 2. 수퍼클래스의 인스턴스 생성과 this 바인딩

부모 클래스의 `constructor` 내부의 코드가 실행 되기전, 암묵적으로 빈객체 즉 인스턴스를 생성합니다. 그래서, 그 인스턴스가 this에 바인딩 되어 부모 클래스의 `constructor` 내부의 this는 생성된 인스턴스를 가르키게 됩니다.

아래의 코드는 부모 클래스에서, 인스턴스가 생성되고 this가 바인딩되는 것을 보여주는 코드입니다

```javaScript
// 수퍼클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle
```

여기서 생성되는 인스턴스 즉 `this` 는 부모 클래스가 생성한 것이지만, `new` 연산자와 함께 호출된 함수는 자식 클래스 이므로, `new.target` 은 `ColorRectangle` 를 가르키게 됩니다.

### 3. 수퍼클래스 인스턴스 초기화

```javaScript
// 수퍼클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle

    // 생성된 인스턴스의 프로토타입으로 ColorRectangle.prototype이 설정된다.
    console.log(Object.getPrototypeOf(this) === ColorRectangle.prototype); // true
    //이부분은 결국 this는 인스턴스고, 그인스턴스가 ColorRectangle 닉아
		// 그런데 부모에서 만든 인스턴스를 자식이 그대로 쓰닉아
    //이런 흐름이 되는건가 ..?
		console.log(this instanceof ColorRectangle); // true
    console.log(this instanceof Rectangle); // true

    // 인스턴스 초기화
    this.width = width;
    this.height = height;

    console.log(this); // ColorRectangle {width: 2, height: 4}
  }
```

수퍼클래스의 `constructor` 가 실행되어 `this` 에 바인딩 외었는 인스턴스가 초기화 됩니다. 이때 `this` 에 바인딩 되어있는 인스턴스에 프로퍼티를 추가하고 `constructor` 가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화 합니다.

### 4. 서브클래스 `constructor` 로의 복귀와 바인딩

super의 호출이 종료, `super` 가 반환한 인스턴스가 `this` 에 바인딩 됩니다. 서브 클래스는 별도의 인스턴스를 생성하지 않고 `super` 가 반환한 인스턴스를 `this` 에 바인딩해 그대로 사용합니다.

```javaScript

// 서브클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);

    // super가 반환한 인스턴스가 this에 바인딩된다.
    console.log(this); // ColorRectangle {width: 2, height: 4}

```

결국 `super` 가 호출되지 않으면, 인스턴스가 생성되지 않고, this 바인딩도 불가능합니다.

### 5. 서브 클래스의 인스턴스 초기화

`super` 호출 이후, 서브 클래스의 `constructor` 에 기술되어있는 인스턴스가 초기화 됩니다. this에 바인딩 되어있던 인스턴스에 프로퍼티를 추가하고 `constructor` 가 인수로 전달 받은 초기값으로 인스턴스의 프로퍼티를 초기화합니다.

### 6. 인스턴스 반환

```javaScript
// 서브클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);

    // super가 반환한 인스턴스가 this에 바인딩된다.
    console.log(this); // ColorRectangle {width: 2, height: 4}

    // 인스턴스 초기화
    this.color = color;

    // 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
    console.log(this); // ColorRectangle {width: 2, height: 4, color: "red"}
  }
```

클래스의 모든 처리가 끝나면, 완성된 인스턴스가 바인딩된 `this`가 암묵적으로 반환 됩니다.
