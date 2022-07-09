---
slug: "my-seventh-post"
date: "2022-06-20"
title: "모던 자바스크립트 딥다이브 CH11"
tags: ["JavaScript", "ALL"]
---

# #11

# 원시 값과 객체의 비교

## 원시 값

### 변경 불가능한 값

원시 값은 변경 불가능한 값입니다. 그런데 여기서 값을 변경할 수 없다는 것이 무엇일까요?

아래 코드를 통해 확인해 보겠습니다.

```jsx
// const 키워드를 사용해 선언한 변수는 재할당이 금지된다. 상수는 재할당이 금지된 변수일 뿐이다.
const o = {};
```

위의 const 를 이용해 선언한 변수는 재할당이금지됩니다. 재선언을 하게 되면 `Uncaught TypeError: Assignment to constant variable.` 라는 에러를 만나게 되지요. 하지만 아래와같은 경우에는 가능합니다

```jsx
o.a = 1;
console.log(o); // {a: 1}
```

여기서 변경 불가능 한 값이라는 의미는 ,**변수가 아닌 값에 대한 진술**로 `o={}` 에서 `{}` 라는 값 자체를 변경 할 수 없다는 것이지, 사실 변수라는 단어에 의미대로, 변수는 언제 든지 재할당을 통해 변수 값을 교체할 수 있습니다. 하지만 위의 경우는 상수이기 때문에, 상수의 경우에는 재할당이 금지되어있는 변수이기 때문에 위와같은 에러를 만나게 되는 것 입니다.

이제 변경 불가능하다 라는 의미를 알아 보았으니, 원시 값이 왜 변경이 불가능한지 확인해볼까요?

### 예제

```jsx
var score = 80;
```

현재 위의 score라는 식별자를 가진 변수 공간을 특정주소 , 이제 부터 a라고 이야기하겠습니다.

첫 변수 선언시에 a에 식별자 score라는 이름을 가지고 undeifined라는 값을 할당해 줍니다.

식별자가 가르키는 위치 : a→ 식별자:score, 값:undeifined( 저장위치:0x0000F2)

이후 80이라는 값을 할당하게 되며, 아래와같은 모습을 보이게 됩니다

식별자가 가르키는 위치 : a→ 식별자:score, 값:80(저장위치 :0x000001332)

즉 위와같이 값이 변화되어도, 식별자가 가르키는 위치의 변화는 발생하지 않으며 단순 값이 저장된 위치만 바뀐다는 것입니다.

이때 **값이 수정되고, 사용 되지 않는 메모리 공간들의 경우 garbage collector가 처리**하게 됩니다.

즉 **불변성을 지니는 원시값을 할당은 변수는 재할당 이외에는 변수 값을 변경할 방법이 없기 때문에 이를 변경 불가능한 값**이라 합니다.

### 문자열과 불변성

다른 언어들과는 다르게, 자바스크립트는 문자열을 원시형으로 분류하고 있습니다.

즉 아래의 코드의 경우에는 Hello 라는 값이 저장된 공간을 가르키다가 , 이후 world 라는 값이 저장된 메모리를 가르키도록 변경이 된다는 것입니다.

```jsx
var str = "Hello";
str = "world";
```

### 유사배열 객체

문자열은 유사 배열객체 이면서, 이터러블이므로 배열과 유사하게 각 문자에 접근할 수 있습니다.

여기서 **유사 배열 객체란 배열처럼 인덱스로 프로퍼티 값에 접근 할 수있고, length 프로퍼티를 갖는객체를 이야기**합니다. 즉 length를 지니고 있으나, 별개의 배열 메소드를 지니고 있지 않습니다.

그런데 이때, 원시 값을 객체처럼 사용하면 아래와같은 모습을 보이게 됩니다

```jsx
var str = "Hello";
str.slice(2, 3);
//---
//내부: 내부에서는 원시 값을 감싸는 래퍼 객체로 자동변환됩니다
//즉 new 연산자를 이용해 위의 str을 Stirng으로 감싸는 것을 이야기합니다.
//그러면  Hello가 {"Hello"}가 되게되는 것입니다.
//그후 필요한 메소드를 이용해 작업을진행해주고, 반환후 사용해준 레퍼 객체는 패기해 줍니다
const temp = new String(str);
return temp.slice(2, 3);
//반환후 temp는 날려보냅니다
```

### 값(메모리주소)에 의한 전달

<aside>
💡 **자바스크립트의 경우에는 변수에는 값이 전달되는 것이 아닌, 메모리 주소가 전달 되므로, 변수와 같은 식별자는  메모리 주소를 기억**하고 있습니다

</aside>

```jsx
var score = 80;
var copy = score;

console.log(score); // 80
console.log(copy); // 80

score = 100;

console.log(score); // 100
console.log(copy); // ?
```

위의 경우 score에 100을 재할당 한다면 copy는 어떻게 될까요? 결론적으로는 80이 됩니다. 즉 score의 경우 100이 들어있는 주소를 보게 되지만, 80의 경우 주소 변경 없이 유지됩니다 .

## 객체

### 변경 가능한 값

객체타입의 값은 변경 가능한 값 입니다. 아래와 같이 변수를 객체에 할당하면 어떤일이 발생할까요?

```jsx
var person = {
  name: "Lee",
};
```

0x0000a: person(변수) →0x0000F2(객체)

0x0000F2(객체): 0x00001332 ~? (실제 값의 변수)

0x00001332:name →0x0000555( 실제 값의 값)

0x0000555: `Lee`

먼저 식별자가 특정 메모리( 0x0000a)에 저장되고, 그 식별자는 `{}` 가 있는 주소(0x0000F2)를 바라보게 됩니다. 즉 원시값의 경우에는 바로, 그 값이 있는 주소를 가르키게 되지만, 객체의 경우에는 변수가 객체를 바라보고 있게 됩니다.

그리고 그 객체가, 내부의 프로퍼티를 바라보게 되고, 프로퍼티가 마지막으로 실제 값을 바라보게 되는 것 입니다 .

원시 값에 있어서 변수의 값을 변경 하려면, 재할당외에는 방법이 없습니다. 하지만 객체를 할당한 변수는 변수를 재할당 없이 객체를 직접 변경할 수 있습니다

<aside>
💡  불변 객체? 결국 바꿀 때마다, 매번 객체를 만들어 이용해 주어야 합니당

</aside>

### 얕은 복사, 깊은 복사

얕은 복사는, 한단계만 복사를 하지만,깊은 복사란, 객체에 들어있는 모든 프로퍼티의 내부의 참조 가능한 것들을 모두 재귀적으로 원시 값까지 모두 복사하는 것을 깊은 복사라 합니다.

### 참조에 의한 전달

```jsx
var person = {
  name: "Lee",
};

// 참조값을 복사(얕은 복사)
var copy = person;
```

현재 위의 경우에는 얕은 복사로, 참조 값이 복사되어 전달되는 현상이 발생합니다. t설명을 위해 위의 설명을 데려와보겠습니다

0x0000a: person(변수) →0x0000F2(객체)

0x0000F2(객체): 0x00001332 ~? (실제 값의 변수)

0x00001332:name →0x0000555( 실제 값의 값)

0x0000555: `Lee`

현재 상황에서는 `0x00001332` 라는 주소 값을 서로 공유하고 있기 때문에 만약 `person` 내의 객체의 값을 바꾸게 된다면 copy까지 영향을 미치는 상황이 발생하게 됩니다.