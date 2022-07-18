---
slug: "javascripts-8"
date: "2022-06-20"
title: "모던 자바스크립트 딥다이브 CH08"
tags: ["JavaScript", "ALL"]
---

# #8

## 제어문

### 정의

조건에 따라 코드 블록을 실행 하거나, 반복 실행시에 사용합니다.

## 블록문

### 정의

0개 이강의 문을 중괄호로 묶은 것으로 코드블록 또는 블록이라 부르기도 합니다.

자바스크립트는 블록을 하나의 **실행 단위** 로 취급합니다.

### 블록문의 사용 예시

블록문은 아래와 같이 단독으로도 사용이 가능합니다.

```jsx
*// 블록문*

{

var foo = 10;

}
```

하지만 일반적으로 아래와 같이 제어문이나 함수를 정의할 때 사용하는 것이 일반적입니다

```jsx
// 제어문

var x = 1;

if (x < 10) {
  x++;
}
//while, if else, do while, switch, try~

// 함수 선언문

function sum(a, b) {
  return a + b;
}
```

## 조건문

### 정의

조건문은 주어진 조건식의 평가 결과에 따라 코드 블록의 실행을 결정합니다

### if…else

if…else 는 주어진 조건식의 평과 결과(참 혹은 거짓)에 따라 실행할 코드 블록을 결정합니다. 기본 형태는 아래와 같습니다.

이때, if문의 조건식은 참혹은 거짓인 불리언 값으로 평가되며, **if 문의 조건식이 참, 거짓 외의 값으로 평가되는 경우 자바스크립트 엔진에 의해 암묵적으로 불리언 값으로 강제 변환되어 코드 블록을 결정하게 됩니다.**

```jsx
if (조건식) {
} else {
}
```

else if와 else 문은 일종의 옵션으로, 필요에 따라 사용할 수 있습니다. 그러나 대부분의 if…else문의 경우 삼항 조건 연산자로 대체가 가능합니다.

```jsx
// x가 짝수이면 result 변수에 문자열 '짝수'를 할당하고, 홀수이면 문자열 '홀수'를 할당한다.
var x = 2;
var result;

if (x % 2) {
  // 2 % 2는 0이다. 이때 0은 false로 암묵적 강제 변환된다.
  result = "홀수";
} else {
  result = "짝수";
}

console.log(result); // 짝수
```

위의 코드를 아래의 삼항 조건 연산자로 바꾸어 볼 수 있습니다

```jsx
var x = 2;
var result = x % 2 ? "홀수" : "짝수";
console.log(result); //짝수
```

만약 세가지 경우의 수로 늘어난다면 어떻게 접근을 하는 것이 좋을까요?

```jsx
var num = 2;
var result = num ? (num > 0 ? "양수" : "음수") : "영;";
console.log(result); //양수
```

위에서 삼항 조건 연산자의 경우 값으로 평가되는, 즉 반환되는 값이 있는 표현식을 만들기 때문에, 변수에 할당할 수 있습니다. 하지만 if…else의 경우는 값처럼 사용할 수 없어 변수에 할당할 수 없습니다.

### switch문

switch문은 주어진 표현식을 평가해, 그 값과 일치하는 표현을 지닌 case문으로 실행하게 됩니다.

그런데 이때 이전의 if…else문의 경우에는 참과 거짓으로 진행되었던 반면 switch문의 경우에는 case 즉 상황에 따라서 실핼할 코드 블록을 결정하게 됩니다.

```jsx
// 월을 영어로 변환한다. (11 → 'November')
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = "January";
    break;
  case 2:
    monthName = "February";
    break;
  case 3:
    monthName = "March";
    break;
  case 4:
    monthName = "April";
    break;
  case 5:
    monthName = "May";
    break;
  case 6:
    monthName = "June";
    break;
  case 7:
    monthName = "July";
    break;
  case 8:
    monthName = "August";
    break;
  case 9:
    monthName = "September";
    break;
  case 10:
    monthName = "October";
    break;
  case 11:
    monthName = "November";
    break;
  case 12:
    monthName = "December";
    break;
  default:
    monthName = "Invalid month";
}

console.log(monthName); // November
```

switch문의 경우 break 문을 이용해, 원하는 시점에 해당 코드 블록을 탈출할 수 있습니다. 즉 위의 경우에는 케이스 11에 해당하는 11월이라는 단어를 변수에 할당하고, 블록에서 탈출해 위와같은 결과를 얻게 되는 것입니다.

만약 break 없이 진행 되는 경우에는, 이를 폴스루라고 하며, 11월이 할당되고, 마지막의 default값이 출력 되는 모습을 볼 수 있습니다.

default의 경우에는 break를 생략하는 것이 일반적이나, 이는 default가 마지막에 있는 경우에만 해당되며,default가 맨 밑에 있는 것을 일종의 컨벤션처럼 생각하는 것이 용이합니다.

<aside>
💡 switch ?  if..else? 만약 후자를 사용해 해결이 가능하다면 후자를 사용해주는 것이 용이하나. 조건이 많아 가독성을 위해 전자를 사용해주는 것도 용이합니다

</aside>

## 반복문

### 정의

조건식의 평가 결과가 참인 경우 코드 블록을 실행하고 이후 조건식을 다시 평가해 참이 나온다면 다시 코드 블록을 실행하게됩니다. 조건식이 거짓일때 까지 이 과정을 반복합니다

### for

for문은 기본적으로는 아래와 같은 모습을 하고 있습니다. 하지만 `i++` 와 같은 증감식이 오지 않아도, for문어디에서인가 증감을 할 수 있다면, for문이 진행되는데 큰 문제가 생기지는 않습니다

```jsx
for (var i = 0; i < 2; i++) {
  console.log(i);
}
```

for문에 아무론 조건을 넣지 않는다면 무한 루프가될 수 있습니다.

for문내에 for문을 중첩해 사용할 수 있으며 이를 이중 중첩 for문이라 이야기합니다. 아래는 1-6까지 되어있는, 두 주사위를 던졌을 때 두눈의 합이 6이 나오는 모든 경우의 수를 출력하기 위한 코드입니다.

```jsx
for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) console.log(`[${i}, ${j}]`);
  }
}
/*
'[1, 5]'
'[2, 4]'
'[3, 3]'
'[4, 2]'
'[5, 1]'
*/
```

### while

while 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 반복해 실행합니다. for문의 경우 반복횟수가 명확할 때, 사용하며 while의 경우에는 반복횟수가 불명확한 경우에 주로 사용합니다

```jsx
var count = 0;

// 무한루프
while (true) {
  console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if (count === 3) break;
} // 0 1 2
```

while을 탈출하는 경우에도 break 를 이용해 탈출해 줄 수 있습니다

### do while

do while의 경우에는 do의 코드 블록을 먼저 실행하고 이후의 while내의 조건 식을 평가 합니다.

```jsx
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
do {
  console.log(count);
  count++;
} while (count < 3); // 0 1 2
```

그렇기 때문에 위의 코드에서 do 내의 , 0 이 출력되고 1로 증가한 후에 while 문을 평가 하는 흐름으로 진행되게 됩니다

### break

break는 위에서 보았던 것 처럼, 반복문 내에서 코드 블록을 탈출하는 역할을 합니다.

### 레이블

레이블은 식별자가 붙은문으로 아래와 같은 형태를 지니고 있습니다

```jsx
foo: console.log("foo");
```

레이블은 프로그램의 진행 순서를 제어하는데 사용됩니다 . 주로 중첩된 for문을 탈출하는데 유용하며, 아래와 같이 사용됩니다

```jsx
// outer라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    if (i + j === 3) break outer;
    console.log(`inner [${i}, ${j}]`);
  }
}

console.log("Done!");
/*
'inner [0, 0]'
'inner [0, 1]'
'inner [0, 2]'
'inner [1, 0]'
'Done!'
'inner [1, 1]'

*/
```

현재 위의 함수는 i와 j의 합이 3이 되는 경우 탈출하게 되며, 출력하면 위와같은 결과를 얻게 됩니다.

<aside>
💡 객체와 혼동 되니 유의할 것

</aside>

### continue

반복문의 코드를 현 시점에서 중단하고, 반복문의 증감식으로 실행흐름을 이동시킵니다.
