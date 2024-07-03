---
title: '[Java] static, final, static final'
date: 2023-04-13 18:04:21
category: java
thumbnail: { thumbnailSrc }
draft: false
---

# final

final은 최종적인 이라는 뜻으로 한번 값이 저장되면 변경이 안된다는 의미이다.

```java
public class Shop{

  final int closeTime = 21;
  final int openTime;

  public Shop(int openTime){
    this.openTime = openTime;
  }
}

```

위의 예제는 가게는 오픈시간은 Shop이라는 인스턴스를 생성하면서 정할 수 있지만 변경가능한 closeTime과는 다르게 한번 저장된 후에는 변경이 불가능하다.

## final 변수

변수에 `final`을 붙이면 이 변수는 수정할 수 없다는 의미가 된다. 수정할 수 없기 때문에 초기화가 필수적이고 생성자, static 메소드를 이용한 초기화도 허용된다.

초기화한 후 변경하려고 하면 compile 에러가 난다.

```java
final String hello = "Hello world";

hello = "See you around" // compile error!
```

## final arguments

final로 선언된 인자는 메소드 내에서 변경이 불가능하다. 따라서 다음과 같이 final int로 선언한 number는 읽을 수 있지만, number = 2처럼 값을 변경하려고 하면 컴파일 에러가 발생한다.

```java
public void func(final int number) {
    System.out.println(number);

    number = 2; // compile error!
}
```

## final class

클래스에 final을 붙이면 다른 클래스가 상속할 수 없는 클래스가 된다. 다음과 같이 final 클래스를 상속하려고 하면 컴파일 에러 발생한다.

```java
final class Person {
    final String name;
    Person() {
        this.name = "Chaerin";
    }
}

class Student extends Person() { // compile error!
}

```

## final method

final 메소드는 Override가 안되도록 한다. 예를 들어 다음과 같이 Person 클래스를 상속하는 Student 클래스에서는 sayHi()를 재정의할 수 없다. Override하려고 하면 컴파일 에러가 발생한다.

```java
public class Person {
    final String sayHi() {
        return "hi";
    }
}

class Student extends Person() {
  @Override
  String sayHi() { // compile error !
    return "See you";
  }
}

```

# static

static 멤버는 클래스에 고정된 멤버로서 객체를 생성하지 않고 사용할 수 있는 필드와 메서드를 말한다.

![](./images/java-memory.png)

Static 키워드를 통해 생성된 정적멤버들은 Heap영역이 아닌 Static영역에 할당됩니다. Static 영역에 할당된 메모리는 모든 객체가 공유하여 하나의 멤버를 어디서든지 참조할 수 있는 장점을 가지지만 Garbage Collector의 관리 영역 밖에 존재하기에 Static영역에 있는 멤버들은 프로그램의 종료시까지 메모리가 할당된 채로 존재하게 된다. 그렇기에 Static을 너무 남발하게 되면 만들고자 하는 시스템 성능에 악영향을 줄 수 있다.

## static field 사용 예시

```java
class Number{
    static int num = 0; //클래스 필드
    int num2 = 0; //인스턴스 필드
}

public class Static_ex {

    public static void main(String[] args) {
    	Number number1 = new Number(); //첫번째 number
    	Number number2 = new Number(); //두번쨰 number

    	number1.num++; //클래스 필드 num을 1증가시킴
    	number1.num2++; //인스턴스 필드 num을 1증가시킴
    	System.out.println(number2.num); //두번째 number의 클래스 필드 출력
    	System.out.println(number2.num2); //두번째 number의 인스턴스 필드 출력

      //출력결과: 1 0
    }
}
```

위의 예시의 출력결과가 1, 0 인 이유는 static 변수는 static 공간에 할당되어 모든 instance들이 공유하기 때문에 number1에서 증가시킨 value가 남아있게 된다.

```java
class Name{
    static void print() { //클래스 메소드
	    System.out.println("내 이름은 홍길동입니다.");
    }

    void print2() { //인스턴스 메소드
	    System.out.println("내 이름은 이순신입니다.");
    }
}

public class Static_ex {

    public static void main(String[] args) {
        Name.print(); //인스턴스를 생성하지 않아도 호출이 가능

        Name name = new Name(); //인스턴스 생성
        name.print2(); //인스턴스를 생성하여야만 호출이 가능
    }
}
```

위의 예시와 같이 static 메소드는 따로 인스턴스를 생성하지 않고 `클래스이름.메소드이름` 으로 사용할 수 있다.

## 🚨 static과 관련하여 발생했던 이슈

```java
  @Value("${api-key}")
  static private String accessKey;
```

위와 같이 application.properties에 있는 api-key값을 가지고 오는 과정에서 멤버 필드를 static으로 정의했을 때 값이 null로 들어오는 이슈가 있었다. application.properties 파일이 읽히기 전에 클래스가 로드되기 때문에 api-key의 value가 null로 들어왔고 static 영역에 메모리가 할당되어 이후에 변경이 일어나지 않은 것이다. 만일 static이 없다면 instance가 생성될 때 해당 값을 application.properties에서 읽어오기 때문에 정상작동한다.

# static final

static final은 static 영역에 할당되며 수정불가능 하다는 뜻이므로 상수를 선언할 때 사용된다.

```java
static final double PI = 3.141592;
```

`PI` 변수는 객체마다 저장될 필요없고 하나의 값만을 가질 수 있다.
