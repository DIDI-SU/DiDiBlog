---
slug: "/javascripts-37"
date: "2022-08-26"
title: "모던 자바스크립트 딥다이브 CH39"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# 39 DOM

# DOM

### 정의

HTML문서의 계층 적 구조와 정보를 표현하며 이를 제어할수 있는 api로 프로퍼티와 메소드를 제공하는 트리구조 입니다

## 노드

### HTML 요소와 노드객체

아래의 코드를 통해 HTML요소에 대해 확인해 보겠습니다

```html
<div id="greeting">Hello</div>
```

HTML요소는 단어 그대로 HTML문서를 구성하는 개별적인 요소를 미합니다. 위의 `div` 태그가 대표적인 예시가 될 수 있습니다.

HTML 요소는 크게 여는 태그 , 닫는 태그 그리고 컨텐츠로 이루어져 있으며, 자세하게는 별개의 어트리뷰트와 그 값이 존재하기도 합니다.

HTML 요소는 렌더링엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환되는데 이때 HTML 요소의 어트리뷰트는 어트리뷰트 노드로, HTML 요소의 텍스트 컨텐츠는 텍스트 노드로 변환됩니다.

그런데 HTML 문서는 각요소들의 집합으로 이루어지며 이 집합은 중첩 관계를 갖게 됩니다. 이러한 중첩관계는 요소 간의 부자관계를 형성하게 되며 동시에 이를 바탕으로 HTML 요소를 객체화한 모든 노드 객체들을 트리자료 구조로 구성되게 됩니다.

### 트리자료 구조

![tree.png](#39%20DOM%20858d5e8793664e78bf16353536bdd295/tree.png)

트리자료구조는 노드들의 계층 구조로 이루어집니다. 트리자료 구조는 위와같은 모습을 하고 있으며, 보통 부모 노드와 자식 노드로 구성되어 노드간의 계층적 구조를 표현하는데 이용됩니다.

트리는 위와같이 하나의 최상위 노드(root) 에서 시작합니다.그리고 이 최상위노드는 0개이상의 자식노드를 가지며, 만약 없는 경우엔느 리프 노드라 부릅니다.

그래서 위와같이 노드 객체로 구성된 트리 자료구조를 `DOM` 이라 부르며,동시에 DOM트리라고 부르기도 합니다.

### 노드 객체의 타입

만약 아래와 같은 HTML문서를 렌더링 파일에 파싱한다면 이와같은 돔트리를 얻을 수 있을 것입니다

![Dom-Tree-of-An-Example-Web-Page.png](#39%20DOM%20858d5e8793664e78bf16353536bdd295/Dom-Tree-of-An-Example-Web-Page.png)

노드객체는 총 12종류 이나 이중 자주 사용되는 노드 타입은 아래와같습니다

### ✨ 문서노드

문서노드는 DOM 트리의 최상위에 존재하는 루트 노드로 `document` 객체를 가리킵니다. 이때 이 객체는 브라우저가 렌더링한 HTML 문서 전체를 가리키는 객체로 `window` 의 `document` 프로퍼티에 바인딩 되어있습니다.

브라우저 환경의 모든 자바스크립트 코드는 스크립트 태그에 의해 분리되어 있어도 하나의 전역 객체 `window` 를 공유합니다. 따라서 모든 자바스크립트의 코드는 전역객체 `window` 의 `document` 프로퍼티에 바인딩되어있는 하나의 `document` 객체를 바라보게되는데 이때 HTML 문서당 `document` 객체는 유일합니다.

🤔 그래서 이제까 수많은 document~ 그렇게 접근하는게 그랫엇군아 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ

### ✨ 요소노드

요소노드는 HTML을 가르키는 객체로, HTML 요소간의 중첩에 의해 부자관계를 가지며 이 관계를 통해 정보를 구조화합니다.

### ✨ 어트리뷰트 노드

```html
<div id="greeting">Hello</div>
```

HTML 요소의 어트리뷰트를 가르키는 객체입니다. 어트리뷰트 노드는 어트리뷰트가 지정된 HTML 요소의 요소노드와 연결되어있습니다. 즉 위의 경우에는 id 어트리뷰트가 지정된 div의 노드와 연결되었다고 볼 수 있습니다.

<aside>
💡 어트리뷰트노드의 경우 부모나 다른 형제노드에 연결 되어 있지 않기 때문에 어트리뷰트를 이용하기 위해서는 요소 노드에 접근해 이용해 주어야합니다

</aside>

### ✨ 텍스트노드

HTML 요소의 텍스트를 가르키는 객체로, 텍스트 노드는 문서의 정보를 표현합니다. 위의 돔 구조에서 보았듯이 `Jhon` 이라 되어있는 이름이 DOM의 최종단에 있는 것을 확인할 수있습니다. 이를 통해 텍스트노드는 요소노드의 자식 노드이자 자식을 가질 수 없는 리프노드라 할 수 있습니다.

그래서 텍스트 노드를 사용하기 위해서는 그 부모 요소엔 요소노드에 접근해 이용해 주어야합니다

🤔 그러면 결국 내가 원하는 노드에 접근하려면 그 상위에서 밑으로 내려가는 방식으로 접근을 해주는 군아 .,…

### 노드객체의 상속 구조

DOM을 구성하는 노드 객체는 DOM API를 사용할 수 있으며 이를 통해 DOM내의 노드들을 조작하고 탐색할 수 있습니다.

DOM을 구성하는 노드 댇체는 브라우저 환경에서 추가적으로 제공하는 호스트 객체이나 결국 자바스크립트이므로 아래와 같은 상속 구조를 가지게 됩니다

![image.png](#39%20DOM%20858d5e8793664e78bf16353536bdd295/image.png)

<aside>
💡  이부분의 경우에는 책을 읽고 넘어가기만해서 일단은 !이정도로 넘아가겠습니다

</aside>

- 그냥 그런느낌이군아 하고 읽으면서 적은거 🤔
  🤔 결국 책에서 이야기한 것 처럼 input 이라는 요소노드는 관련 프로토 타입 체인에 있는 모든 프로퍼티나 메소드를 상속받아서 이용할수 잇는거군아
  그런데 그걸 밑에서 부터 확인하는 느낌가틈 ㅇㅇ… 긍까 인풋 엘리먼트니까→ 그 상단의 html 엘리먼트=→ 상단의 엘리먼트→ 노드 → 이벤트 타겟→ 오브젝트까지 쭉쭉 타고 사용할 수 있는거군아

## 요소 노드 취득

앞에서 이야기 한 것 처럼 HTML 구조나 내용또는 스타일 등을 동적으로 조작하려면 요소 노드를 먼저 취득해야합니다. 그래서 요소 노드의 취득은 결국 HTML 요소를 조작하는 시작점으로 이를 위해서 DOM은 요소를 취득할 수 있는 다양한 메서드를 제공합니다.

### getElementById

`Document.prototype.getElementById` 는 인수로 전달한 id 값을 갖는 하나의 요소노드를 탐색해 반환합니다.

id의 경우에는 HTML문서 내에 유일한 값이기 때문에 class 처럼 공백 문자로 구분해 여러개의 값을 가질수 없습니다. 그러나 중복 요소를 갖더라도 에러가 발생하지 않아 중복된 id 값이 존재할 수 있으나`Document.prototype.getElementById` 의 경우에는 id값을 갖는 첫번째 요소 노드만 반환하게 되며 존재하지 않는 경우에는 null 을 반환하게 됩니다.

- ???
  HTML요소에 id 어트리뷰트를 부여하면 id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당되게 됩니다 < 이걸 모르겟음 그냥 전역변수가 선언된다는게 객체가 만들어지닉아 그런거야?????

### **getElementsByTagName**

```jsx
document.getElementById("app").innerHTML = `
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </body>
</html>
`;

const list = document.getElementsByTagName("li");
console.log(list);
```

위 메서드는 인수로 전달한 태그이름을 갖는 모든 요소 노드들을 탐색해 반환합니다 검색 범위는 루트 노드를 포함해 전체 다큐먼트를 대상으로 검색하며, 결과적으로는 `Elements` 라는 이름에서 알 수 있듯 여러개의 노드 객체를 갖는 HTMLCollection을 반환하게 됩니다.

아래의 경우 위의 리스트태그를 검색한 결과 입니다

```html
HTMLCollection {0: HTMLLIElement, 1: HTMLLIElement, 2: HTMLLIElement, length: 3, item: ƒ item()…}
0:
<li id="apple">Apple</li>
1:
<li id="banana">Banana</li>
2:
<li id="orange">Orange</li>
length: 3
item: ƒ item() {}
namedItem: ƒ namedItem() {}
<constructor>: "HTMLCollection"
```

`HTMLCollection` 는 유사배열 객체면서 이터러블로, 만약 HTML 문서내의 모든 노드를 취득하려면 `*` 를 인수로 전달해 주어도 됩니다.

```jsx
import "./styles.css";

document.getElementById("app").innerHTML = `
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <ul id="ids">
      <li id="apple">Apple2</li>
      <li id="banana">Banana3</li>
      <li id="orange">Orange4/li>
  </ul>
  </body>
</html>
`;

const list = document.getElementsByTagName("li");
console.log(list);
const ids = document.getElementById("ids");
const lis = ids.getElementsByTagName("li");
console.log(lis);
```

위에서 이 메소드의 검색 범위가 루트 노드를 포함한 전체 다큐먼트라했는데 이는 이 메서드를 `document` 를 통해 호출한 경우만 이에 해당됩니다.

반면`element.prototype~` 의 메서드의 경우에는 특정 노드를 통해 호출하는데 위 코드의 경우에는 ids라는 id의 요소의 자손노드에서 노드를 탐색하게 됩니다.

### **getElementsByClassName**
