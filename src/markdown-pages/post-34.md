---
slug: "/javascripts-34"
date: "2022-08-24"
title: "모던 자바스크립트 딥다이브 CH31"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# #31

# RegExp : 정규식

## 정규표현식이란?

정규 표현식은 문자열을 대성으로 패턴 매칭기능을 제공합니다. 그런데 여기서 패턴 매칭 기능이란 특정 패턴과 일치하는 문자열을 검색하거나 추출또는 치환 할 수 있는 기능을 이야기합니다.

## 정규 표현식의 생성

### 정규 표현식 리터럴

```javaScript
/regexp/i;
```

정규 표현식 리터럴은 위와 같이 표현하는데 이때 , 정규 표현식은 패턴과 플래그로 구성됩니다. 여기서 ‘/’ 의 경우에는 시작과 종료기호를 그 사이의 `regexp` 의 경우에는 패턴을 마지막의 i는 플래그를 의미합니다.

만약 `is` 라는 문자열이 존재하는 확인하는 정규 표현식의 경우에는 아래와 같이 표현할 수 있습니다

```javaScript
const target = "Is this all there is?";

// 패턴: is
// 플래그: i => 대소문자를 구별하지 않고 검색한다.
const regexp = /is/i;

// test 메서드는 target 문자열에 대해 정규표현식 regexp의 패턴을 검색하여 매칭 결과를 불리언 값으로 반환한다.
regexp.test(target); // -> true
```

생성자 함수를 이용해서도 가능합니다.

```javaScript
const target = "Is this all there is?";

const regexp = new RegExp(/is/i); // ES6
// const regexp = new RegExp(/is/, 'i');
// const regexp = new RegExp('is', 'i');

regexp.test(target); // -> true
```

## RegExp 메서드

### RegExp.prototype.exec

인수로 전달 받은 문자열에 대해 정규 표현식의 패턴을 검색해 매칭 결과를 배열로 반환합니다

```javaScript
const target = "Is this all there is?";
const regExp = /is/;

regExp.exec(target); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

`exec` 의 경우에는 문자열내의 모든 패턴을 검색하더라도, **첫번째 매칭 결과만 반환** 하므로 주의해 주어야합니다

### RegExp.prototype.test

인수로 전달 받은 문자열에 대해 정규 표현식의 패턴을 검색해 매칭결과를 불리언 값으로 반환합니다

```javaScript
const target = "Is this all there is?";
const regExp = /is/;

regExp.test(target); // -> true
```

### String.prototype.match

대상 문자열과 인수로 전달 받은 정규 표현식과의 매칭결과를 배열로 반환합니다

```javaScript
const target = "Is this all there is?";
const regExp = /is/;

target.match(regExp); // -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

`match` 의 경우에는 `g` 플래그로 지정하는경우 모든 매칭결과를 배열로 반환합니다

```javaScript
const target = "Is this all there is?";
const regExp = /is/g;
target.match(regExp); // ['is', 'is']
```

## 플래그

| i   | ignore case | 대소 문자를 구별하지 않고 패턴을 검색합니다                     |
| --- | ----------- | --------------------------------------------------------------- |
| g   | global      | 대상 문자열내에서 패턴과 일치하는 모든 문자열을 전역 검색합니다 |
| m   | multi line  | 문자열의 행이 바뀌더라도 패턴 검색을 계속합니다                 |

### 플래그별 예제

```javaScript
const target = "Is this all there is?";

// target 문자열에서 is 문자열을 대소문자를 구별하여 한 번만 검색한다.
target.match(/is/);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 한 번만 검색한다.
target.match(/is/i);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]

// target 문자열에서 is 문자열을 대소문자를 구별하여 전역 검색한다.
target.match(/is/g);
// -> ["is", "is"]

// target 문자열에서 is 문자열을 대소문자를 구별하지 않고 전역 검색한다.
target.match(/is/gi);
// -> ["Is", "is", "is"]
```

## 패턴

정규 표현식의 패턴은 문자열의 일정한 규칙을 표현하기 위해 사용되며 패턴은 위에서 언급했던 것 처럼 `/` 로 열고 닫으며, 이 사이에는 메타문자또는 기호로도 표현할 수 있습니다 . 다양한 예제를 통해 패턴에 대해 익혀 볼까요

### 문자열 검색

정규 표현식의 패턴에 문자 또는 문자열을 지정하면, 패턴으로 지정한 문자또는 문자열을 검색합니다.

### 플래그가 생략된 경우

```javaScript
const target = "Is this all there is?";

// 'is' 문자열과 매치하는 패턴. 플래그가 생략되었으므로 대소문자를 구별한다.
const regExp = /is/;

// target과 정규 표현식이 매치하는지 테스트한다.
regExp.test(target); // -> true

// target과 정규 표현식의 매칭 결과를 구한다.
target.match(regExp);
// -> ["is", index: 5, input: "Is this all there is?", groups: undefined]
```

### 플래그가 존재하는 경우

플래그 i

```javaScript
const target = "Is this all there is?";

// 'is' 문자열과 매치하는 패턴. 플래그 i를 추가하면 대소문자를 구별하지 않는다.
const regExp = /is/i;

target.match(regExp);
// -> ["Is", index: 0, input: "Is this all there is?", groups: undefined]
```

플래그 ig

```javaScript
const target = "Is this all there is?";

// 'is' 문자열과 매치하는 패턴.
//대소문자를 구별하지 않고
// 플래그 g를 추가하면 대상 문자열 내에서 패턴과 일치하는 모든 문자열을 전역 검색한다.
const regExp = /is/gi;

target.match(regExp); // -> ["Is", "is", "is"]
```

### 임의의 문자열을 검색하는경우

`.` 은 임이의 문자 한개를 의미하는데, 이때 문자의 내용은 무엇이든 상관 없습니다. 점의 갯수에 따라 문자열의 길이가 결정됩니다

```javaScript
const target = 'Is this all there is?';
// 임의의 3자리 문자열을 대소문자를 구별하여 전역 검색한다.
const regExp = /.../g;
target.match(regExp);
//['Is ', 'thi', 's a', 'll ', 'the', 're ', 'is?']

----

const target2 = 'Is this all there is?';
// 임의의 2자리 문자열을 대소문자를 구별하여 전역 검색한다.
const regExp2 = /../g;
target2.match(regExp2);
//(10) ['Is', ' t', 'hi', 's ', 'al', 'l ', 'th', 'er', 'e ', 'is']
```

### 반복 검사

`{m,n}` 은 앞선 패턴이 최소 m번 ,최대 n번 반복되는 문자열을 의미합니다 콤마뒤에 공백이 있으면 정상 동작하지 않으므로 주의해 주어야 합니다

```javaScript
const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 1번, 최대 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{1,2}/g;

target.match(regExp); // -> ["A", "AA", "A", "AA", "A"]
```

만약 `{n}` 만 있는 경우에는 결국 n번 반복되는 문자열을 의미해 아래와 같은 결과를 얻을 수 있습니다

```javaScript
const target = "A AA B BB Aa Bb AAA";

// 'A'가 2번 반복되는 문자열을 전역 검색한다.
const regExp = /A{2}/g;

target.match(regExp); // -> ["AA", "AA"]
```

`{n,}` 의 경우에는 앞선 패턴이 최소 n번 반복되는 문자열을 의미합니다

```javaScript
const target = "A AA B BB Aa Bb AAA";

// 'A'가 최소 2번 이상 반복되는 문자열을 전역 검색한다.
const regExp = /A{2,}/g;

target.match(regExp); // -> ["AA", "AAA"]
```
