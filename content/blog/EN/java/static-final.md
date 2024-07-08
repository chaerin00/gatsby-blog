Here's the translated version of your document titled "[Java] static, final, static final":

---

title: '[Java] static, final, static final'
date: 2023-04-13 18:04:21
category: java
thumbnail: { thumbnailSrc }
draft: false

---

# final

The `final` keyword signifies that once a value is assigned to it, it cannot be changed.

```java
public class Shop {

  final int closeTime = 21;
  final int openTime;

  public Shop(int openTime) {
    this.openTime = openTime;
  }
}
```

In the above example, `closeTime` cannot be modified once initialized, while `openTime` can be initialized through the constructor but cannot be changed afterwards.

## final variables

When applied to a variable, `final` means it cannot be modified. It must be initialized, either directly or through constructors or static methods.

Attempting to change a `final` variable after initialization results in a compile-time error.

```java
final String hello = "Hello world";

hello = "See you around"; // compile error!
```

## final arguments

Arguments declared as `final` in a method cannot be modified within the method. For example, in the following code, `number` can be read but cannot be reassigned.

```java
public void func(final int number) {
    System.out.println(number);

    number = 2; // compile error!
}
```

## final class

A `final` class cannot be subclassed by other classes. Attempting to extend a `final` class results in a compile-time error.

```java
final class Person {
    final String name;
    Person() {
        this.name = "Chaerin";
    }
}

class Student extends Person { // compile error!
}
```

## final method

A `final` method in a superclass cannot be overridden by subclasses. Attempting to override a `final` method results in a compile-time error.

```java
public class Person {
    final String sayHi() {
        return "hi";
    }
}

class Student extends Person {
    @Override
    String sayHi() { // compile error!
        return "See you";
    }
}
```

# static

A `static` member belongs to the class rather than instances of the class, allowing access without creating an object.

![](./images/java-memory.png)

Static members are allocated in the Static area rather than the Heap. They are shared among all instances of the class and exist until the program terminates. While providing convenience in accessing shared resources, excessive use of `static` can impact system performance negatively.

## Example of static field usage

```java
class Number {
    static int num = 0; // static field
    int num2 = 0; // instance field
}

public class Static_ex {

    public static void main(String[] args) {
        Number number1 = new Number(); // first number
        Number number2 = new Number(); // second number

        number1.num++; // increment static field num
        number1.num2++; // increment instance field num2
        System.out.println(number2.num); // print static field of second number
        System.out.println(number2.num2); // print instance field of second number

        // Output: 1 0
    }
}
```

The output `1 0` in the above example demonstrates that static variables are shared among instances, while instance variables are unique to each instance.

```java
class Name {
    static void print() { // static method
        System.out.println("My name is Hong Gil-dong.");
    }

    void print2() { // instance method
        System.out.println("My name is Yi Sun-sin.");
    }
}

public class Static_ex {

    public static void main(String[] args) {
        Name.print(); // can be called without instance creation

        Name name = new Name(); // instance creation
        name.print2(); // requires instance creation to call
    }
}
```

As shown in the example above, `static` methods can be accessed using `ClassName.methodName` without creating an instance.

## 🚨 Issue encountered with static

```java
@Value("${api-key}")
static private String accessKey;
```

Defining a member field as `static` when retrieving a value from `application.properties` caused an issue where the value was null. This occurred because the class was loaded before `application.properties` was read, resulting in the static memory area being allocated with null. Without `static`, the value would be read correctly when an instance is created.

# static final

`static final` variables are constants allocated in the static area and cannot be changed after initialization.

```java
static final double PI = 3.141592;
```

The variable `PI` can hold only one value and does not need to be stored per object instance.
