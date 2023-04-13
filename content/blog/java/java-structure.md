---
title: Java 용어 정리
date: 2023-04-12 16:04:94
category: java
thumbnail: { thumbnailSrc }
draft: false
---

- [리터럴(Literal)](#리터럴literal)
- [this, this()](#this-this)
- [super, super()](#super-super)
- [자바의 원시 타입 참조 타입](#자바의-원시-타입-참조-타입)

## 리터럴(Literal)

### 리터럴(Literal)이란?

자바에서 리터럴은 상수를 뜻한다. 이는 상수 변수에 할당될 수 있다. 리터럴은 고정된 값을 나타내며 수정이 불가능하다. 리터럴은 boolean, character, numeric, string 데이터의 문법적 표현이다.

```java
int count = 0;
```

위의 코드에서 `int count`는 int 타입의 변수이고 `0`은 리터럴이다.

### 리터럴의 종류

1. 정수 리터럴 Integral Literals<br/>
   정수 리터럴은 일반적인 십진수 ex.1,2,6,9 와 8진수, 16진수, Binary까지 포함된다.

   ```java
   int count = 987;

   int octalVal= 007;

   int hexaVal = 0x7e4;

   int binary = 0b11010;
   ```

2. 부동소수점 리터럴 Floating-Point Literals<br/>
   부동 소수점 리터럴은 소수점 이하의 값을 가지는 값이다. float 형식(4 bytes)은 끝에 **f**또는 **F**를 붙여서 나타내고, double 형식(8 bytes)은 끝에 **d** 또는 **D**를 붙여서 나타낸다. d나 f를 붙이지 않고 나타내는 decimal 형식도 있고 이 decimal 형식은 **-**나 **e**, **E**와 같이 exponent 기호와 함께 사용될 수 있다.

   ```java
   float floatVal = 4534.99f;

   double doubleVal = 19765.567;

   float expVal = 122.32E5;
   ```

3. 문자 리터럴 Char Literals
   문자 리터럴은 escape 문자 ex. \n, \r 혹은 **'** single quote로 감싸진 문자 그리고 16진수로 표현된 unicode (from 0 to 65535)를 의미한다.

   ```java
   char alpha = 'p';
   char ch1 = '\u0021';
   char ch2 = 1456;
   ```

4. 문자열 리터럴 String Literals
   String은 **"** double quote로 감싸진 문자들의 정렬이다.

   ```java
   String str = "Java";
   ```

5. Boolean Literals
   boolean 리터럴은 **true**와 **false**, 2가지의 value만을 가지는 데이터 타입이다.

   ```java
   boolean boolVal = true;
   ```

## this, this()

this는 자기 자신을 가리키는 키워드이다.

### this

매개 변수와 객체 자신이 가지고 있는 변수의 이름이 같은 경우 이를 구분하기 위해 자신의 변수에 this를 사용한다.
static 메소드에서는 사용할 수 없다.

```java
public class Person {
    String name;
    int age;
    String phone;

    public Person(String name, int age, String phone) {
        this.name = name;
        this.age = age;
        this.phone = phone;
    }
}
```

위와 같이 생성자 함수 혹은 setter 메소드에서 주로 사용했다.

### this()

this()는 자기 자신의 생성자를 가리키고 같은 클래스에 오버로딩된 다른 생성자를 호출할 때 사용할 수 있다.

```java
 String name;
    int age;
    String phone;

    public Person(String name){
      this(name, 24, 010-1111-2222)
    }

    public Person(String name, int age, String phone) {
        this.name = name;
        this.age = age;
        this.phone = phone;
    }

```

위의 예제는 현재 this()가 호출되고 있는 매개변수가 2개인 생성자에서 매개변수가 4개인 생성자를 호출하고 있는 경우이다.

## super, super()

super는 상속받은 부모를 가리킨다. 부모 클래스로부터 상속받은 필드나 메소드를 자식 클래스에서 참조하는 데 사용된다.

### super

```java
class Parent { int a = 10; }

class Child extends Parent {
    int a = 20;

    void display() {
        System.out.println(a); // 20
        System.out.println(this.a); // 20
        System.out.println(super.a); // 10

    }

}
```

위의 예시와 같이 super 키워드를 사용하면 부모의 필드를 참조할 수 있다.

### super()

`super()`는 부모의 생성자를 호출할 때 사용된다.
만약 부모에서 기본 생성자가 아닌 매개변수를 가지는 생성자를 하나라도 선언했다면 자식 클래스에서도 동일한 매개변수를 갖는 생성자를 선언해주어야 한다. 이때 super() 사용할 있다.

```java
class Parent {
    int a;
    Parent(int n) {
       a = n;
    }
}

class Child extends Parent {
    int b;
    Child() {
        super();
        b = 20;
    }
}
```

위와 같이 수정하면 부모 클래스의 멤버에 대한 초기화 코드를 중복하여 작성해주지 않아도 된다.

## 자바의 원시 타입, 참조 타입

자바의 숫자를 다루기 위한 타입은 원시타입(Primitive type), 참조타입(Reference type) 크게 두가지로 나뉜다.

1. 원시타입

> int, double, boolean...

2. 참조타입

> Integer, Double, Boolean...

```java
int i = Integer.valueOf(1);
Integer integer = i;
```

사실 원시타입과 참조타입은 함께 사용해도 오토박싱, 언박싱이 되기 때문에 함께 사용해도 큰 어려움이 없다.

그러나 이 둘은 실제 코드 구현 시에 차이가 있다.

1. Null 할당 가능 여부

   ```java
   int i = null;//불가능
   Integer integer = null; //가능

   ```

위의 예시와 같이 원시타입은 null을 할당할 수 없다.

2. Generic 타입에서의 사용

   ```java
   List<int> i;//불가능
   List<Integer> integer;//가능
   ```

이런 차이가 생기는 이유는 원시타입은 Stack 메모리에 값이 존재하고, 참조타입은 하나의 인스턴스이기 때문에 다른 클래스 인스턴스들과 마찬가지로 Stack에는 참조값만 존재하고 실제값은 힙메모리에 존재하기 때문이다.

그렇기 때문에 성능에서 차이가 발생한다.

1. 접근속도 <br/>
   Stack에 바로 값이 존재하는 원시타입은 접근속도가 빠르다. 반면 참조타입은 stack에는 참조값만 있고 실제 값은 heap 영역에 존재하기 때문에 값을 필요로 할 때마다 언박싱의 과정을 거쳐야한다. 그렇기에 참조타입의 접근속도는 원시타입의 접근속도보다 느리다.

   <br/>

2. 차지하는 메모리의 양 <br/>
   차지하는 메모리의 양도 참조타입이 원시타입보다 많다.
   ![](./images/primitive-reference.png)

Null을 할당해야 하거나 제네릭 타입으로 사용하는 경우에는 원시타입을 그렇지 않은 경우에는 원시타입을 사용하면 된다.
