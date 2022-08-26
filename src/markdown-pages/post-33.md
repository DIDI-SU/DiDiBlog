---
slug: "/javascripts-33"
date: "2022-08-24"
title: "모던 자바스크립트 딥다이브 CH30"
tags: ["JavaScript", "ALL"]
featuredimage:
  src: "../images/thumbnail/JM.png"
  alt: "모던자바스크립트"
---

# #30

<aside>
💡  내용이 프로퍼티와 메서드 설명을 중심으로 하고 있어서 간단 정리 형식으로 진행합니다

</aside>

# Date

`Date` 는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체 이면서 생성자 함수를 이야기합니다.

## Date 생성자 함수

`Date` 생성자 함수로 생성한 `Date` 객체는 기본적으로 현재 날짜와 시간을 나타내는 정수 값을 가집니다. 현재날짜와 시간이 아닌 다른 날짜와 시간을 다루고 싶은 경우 원하는 날짜와 시간을 인수로 지정해 이용해 줄 수 있습니다.

### new Date()

```javaScript
new Date(); //Tue Aug 09 2022 09:51:20 GMT+0900 (한국 표준시)
Date(); //'Tue Aug 09 2022 09:51:40 GMT+0900 (한국 표준시)'
```

`date` 생성자 함수를 인수 없이 `new` 연산자를 이용해 출력하는 경우에는 현재 날짜와 시간을 가지는 `Date` 객체를 반환해줍니다. 위와같이 `new` 없이 호출하는 경우에는 날짜와 시간 정보를 나타내는 문자열을 반환합니다.

### new Date(milliseconds)

`Date` 생성자 함수에 숫자 타입의 밀리초를 인수로 전달하면, 1970년 1월1일을 기점으로 인수로 전달된 밀리초만큼 경과된 날짜와 시간을 나타내는 Date 객체를 반환합니다.

### new Date(dateString)

```javaScript
new Date("May 26, 2020 10:00:00");
// -> Tue May 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

new Date("2020/03/26/10:00:00");
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

Date 생성자 함수에 날짜와 시간을 나타내는 문자열을 인수로 전달하면, Date 객체를 반환합니다. 이때 인수로 전달한 문자열은 `Date.parse` 에 의해 해석 가능한 형태여야 합니다.

### new Date(year,month,[day, hour,minitue,second,millisecond])

```javaScript
// 월을 나타내는 2는 3월을 의미한다. 2020/3/1/00:00:00:00
new Date(2020, 2);
// -> Sun Mar 01 2020 00:00:00 GMT+0900 (대한민국 표준시)

// 월을 나타내는 2는 3월을 의미한다. 2020/3/26/10:00:00:00
new Date(2020, 2, 26, 10, 00, 00, 0);
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)

// 다음처럼 표현하면 가독성이 훨씬 좋다.
new Date("2020/3/26/10:00:00:00");
// -> Thu Mar 26 2020 10:00:00 GMT+0900 (대한민국 표준시)
```

Date 생성자 함수에 연,월,일,시,분,초,밀리초를 의미하는 숫자를 인수로 전달하면 지정된 날짜와 시간을 나타내는 `Date` 객체를 반환합니다. 이때 연,월을 반드시 지정해야하며 지정하지 않은 옵션은 0또는 1로 초기화 됩니다

## Date 메서드

### Date.now

1970년 1월1일을 기준으로 현재시간까지 경과한 밀리초를 숫자로 반환합니다

### Date.parse

1970년 1월1일을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환합니다.

### Date.UTC

1970년 1월1일을 기점으로 인수로 전달된 지정 시간까지의 밀리초를 숫자로 반환합니다.

`new Date(year,month,[day, hour,minitue,second,millisecond])` 과같은 형식의 인수를 사용해 주어야합니다. 이때 `Date.UTC` 의 경우에는 로컬 타임이 아닌 `UTC` 로 인식되며, 월의 경우 0부터 시작을 합니다.

### Date.protoytype.getFullYear

`Date` 객체의 연도를 나타내는 정수를 반환합니다

### Date.prototype.setFullYear

`Date` 객체에 연도를 나타내는 정수를 설정합니다. 이때 연도 이외의 월,일 역시 설정할 수 있습니다

### Date.prototype.getMonth /setMonth

`Date` 객체의 월을 나타내는 0~11까지의 정수를 반환합니다 . 혹은 `Date` 객체에 월을 나타내는 0~11의 정수를 설정합니다. 워리외의 옵션으로 일도 설정할수 있습니다.

### Date.prototype.getDate/setDate

`Date` 객체의 날짜를 나타내는 정수를 반환합니다. 혹은 `Date` 객체에 날짜(1~31)를 나타내는 정수를 설정합니다

### Date.prototype.getDay

객체의 요일을 나타내는 정수를 반환하는데 이때, 일요일부터 시작되며 일요일은 0에 해당됩니다.

### Date.prototype.getHours /Date.prototype.setHours

`Date` 객체의 시간을 나타내는 정수를 반환합니다. 이때 시간은 0~23까지 입니다. 혹은

`Date` 객체에 시간을 나타내는 정수를 설정합니다. 시간 이외에 옵션을 분,초, 밀리초로도 설정할 수 있습니다

### Date.prototype.getMinutes /setMinutes

`Date` 객체의 분을 나타내는 정수를 반환합니다. 혹은 객체에 분을 나타내는 정수를 설정할 수 있습니다. 분이외에 옵션으로 초, 밀리초도 설정할 수 있습니다

### Date.prototype.getMilliseconds/setMilliseconds

`Date` 객체의 밀리초를 나타내는 정수를 반환합니다. 객체에 밀리초를 나타내는 정수를 설정합니다.

### Date.prototype.getTime /setTime

1970.1.1 을 기점으로 `Date` 객체의 시간까지 경과된 밀리초를 반환하거나 경과된 밀리초를 설정할 수 있습니다.

### Date.prototype.getTimezoneOffset

UTC와 Date 객체에 지정된 로컬시간과의 차이를 분 단위로 반환합니다. (결국 시차 나오는거인것 가틈)

### Date.prototype.toDateString

사람이 읽을 수 있는 형식의 문자열로 `Date` 객체의 날짜와 시간을 반환합니다

### Date.prototype.toTimeString

사람이 읽을 수 있는 형식으로 `Date` 객체의 시간을 표현한 문자열을 반환합니다

### Date.prototype.toISOString

ISO 8601 형식으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환합니다

### Date.prototype.toLocalString

```javaScript
const today = new Date("2020/7/24/12:30");

today.toString(); // -> Fri Jul 24 2020 12:30:00 GMT+0900 (대한민국 표준시)
today.toLocaleString(); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString("ko-KR"); // -> 2020. 7. 24. 오후 12:30:00
today.toLocaleString("en-US"); // -> 7/24/2020, 12:30:00 PM
today.toLocaleString("ja-JP"); // -> 2020/7/24 12:30:00
```

인수로 전달한 로컬을 기준으로 Date 객체의 날짜와 시간을 표현한 문자열을 반환합니다

### Date.prototype.toLocaleTimeString

인수로 전달한 로컬을 기준으로 `Date` 객체의 시간을 표현한 문자열을 반환합니다 , 인수를 생략한 경우 브라우저가 동작중인 시스템의 로컬을 적용합니다.
