---
slug: "/my-first-post"
date: "2022-06-20"
title: "모던 자바스크립트 딥다이브 CH04"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

## 변수 ?

### 변수의 정의와 용어

하나의 값을 저장하기 위해 확보한 메모리 공간 자체 도는 그 메모리 공간을 식별하기 위해 붙인 이름입니다.

정의를 통해 우리는 변수가 전자인 **메모리 공간 자체** 후자인 **메모리 공간 식별을 위한 이름**이라는 두 가지 의미로 활용되는 것을 확인할 수 있습니다 .

```javascript
const result = 10 + 20;
```

위와 같은 코드는 메모리에 조금 다르게 저장됩니다. 10 ,20 각각의 숫자가 별개의 메모리 주소에 저장 되어 있으며, 그 결과가 되는 30 역시 별개의 메모리 주소에 저장되어있는 모습을 보이고 있습니다.

여기서 `result` 는 **메모리 공간을 식별하기 위한 고유의 이름**으로, 이를 **변수명/변수 이름**이라 부르며, 결과인 **30을 변수 값**이라 부릅니다. 그런데 이때 **변수에 값을 저장하는 것**을 **할당(대입,저장)** 이라하며, 변수에 **저장된 값을 읽어오는 것을 참조**라 부릅니다.

### 변수에서의 식별자

식별자란?. **식별자**는 **어떤 값을 구별해서 식별할 수 있는 고유한 이름**을 이야기합니다.그런데 변수가 메모리 공간 그 자체이기 때문에 **식별자는 값이 아니라 메모리 주소를 기억**하고 있습니다.

### 변수 선언

변수를 사용하려면 반드시 선언이 필요합니다. 자바스크립트에서는 `var` `let` `const` 가 사용되고 있습니다.

```javascript
var score;
```

위와 같이 단순 변수를 선언하면 어떤 일이 생길까요? 바로 실행 컨텍스트의 `enviromentRecord` 에 `score` 가 등록 되면서 변수에 자동으로 undeifined 가 할당 됩니다. 여기서 변수에 자동으로 undeifined 가 할당 되는 이유는 var는 선언과 초기화가 동시에 진행되기 때문에,score을 선언함과 동시에 undeifined 을 할당해주게 됩니다.

### 변수 선언의 실행 시점과 변수 호이스팅

```javascript
console.log(score);
var score;
```

자바스크립트에서 코드는 한 줄씩 순차적으로 진행 됩니다. 위의 경우 어떻게 보면 참조 에러가 발생할 것이라 예상할 수도 있지만 에러가 발생하지 않고 undeifined이 출력 되는 것을 확인할 수 있습니다.

이는 호이스팅이 발생했기 때문입니다. 즉 enviromentRecord의 변수 수집 과정이 가장 먼저 실행되기 때문에 , 이미 컴퓨터는 `score`가 선언이 되어 있다고 인식을 하고 있는 것이지요, 그래서 score 변수를 찾을 때, 자동으로 할당되어 있는 undeifined 가 출력 되게 됩니다.

결론적으로는 변수 선언이 코드의 순차적으로 실행되는 시점인, 런타임 내의 순서대로 진행 되는 것이 아니라, 그 이전 단계에서 실행되어 위와 같은 상황이 발생하게 되었다는 것입니다.

그리고 이러한 상황으로 인해 변수 선언문이 코드의 선두로 끌어올린 것처럼 동작하는 호이스팅 현상이 발생하게 됩니다. 🙂

### 값의 할당

변수에서 값을 할당 할 때에는 할당 연산자 `=` 를 사용해 줍니다. 이때 할당 연산자는 오른쪽의 값을 왼쪽의 변수에 할당해줍니다.

```javascript
var score;
score = 80;
```

위의 코드에서는 80을 `score` 에 적용한다는 의미겠지요 .

이 때 선언과 할당에서의 차이는, 변수의 선언은 소스 코드가 순차적으로 실행되는 시점인 런타임 이전에 실행 되지만, 값의 할당은 소스 코드가 순차적으로 실행되는 런타임에 실행된다는 것입니다.

```javascript
console.log(score); // undeifined
score = 80;
var score;
console.log(score); //80
```

위에서 80이 나오게 된 흐름을 순서대로 작성해 보았습니다

```javascript
var score;
console.log(score);
socre = 80;
console.log(score);
```

먼저 호이스팅 되어 undeifined가 할당, 출력 되고 그것에 다시 80이 할당되므로 80이 출력 된 것 입니다. 그런데 만약 단순 선언이 아니라 할당까지 함께 이루어 진다면 어떤 일이 발생하게 될까요?

```jsx
console.log(score); // undeifined
score = 80;
var score = 50;
console.log(score); //80
```

아마 아래와 같은 흐름으로 진행 될 것 입니다

```jsx
var score;
console.log(score);
socre = 80;
socre = 50;
console.log(score);
```

### 값의 재할당

var키워드로 선언된 변수는 값을 재 할당 해 줄 수 있습니다. 반대로 값을 재 할당 할 수 없는 변수의 경우 이를 상수라 불러 줍니다. 보통 const를 이용해 선언한 변수는 재할당이 금지되어, 이를 이용해 상수를 표현하곤 하지만 , const가 반드시 상수를 위해서만 사용되지는 않습니다
