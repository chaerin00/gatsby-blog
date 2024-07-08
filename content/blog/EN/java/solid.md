---
title: SOLID Principles and Examples
date: 2023-04-12 13:04:69
category: java
thumbnail: { thumbnailSrc }
draft: false
---

## SOLID Principles: The Five Principles of Object-Oriented Programming

### - SRP (Single Responsibility Principle)

> A class should have only one reason to change.

```java
public class PostService {

  private DataSource database = new MySQLDataSource();

  ...

}

```

```java
public class PostService {

  private DataSource database = new MongoDBDataSource();

  ...

}

```

The above examples violate the SRP because the `PostService` class is responsible not only for operations related to posts (creation, update, deletion) but also for managing the database creation logic. If the database changes from MySQL to MongoDB, the class needs modification. In Spring, this can be refactored as follows:

```java
public class PostService {

  @Autowired
  private DataSource database;

  // Business logic for logging and saving
  ...

}

```

By refactoring like this, using the `@Autowired` annotation to inject the `DataSource` interface via field injection (constructor injection is preferred but omitted here for simplicity), we remove the responsibility of database creation from this class, focusing only on post-related logic.

### - OCP (Open Closed Principle)

> Software entities should be open for extension, but closed for modification.

```java
public class PostService {

  private DataSource database = new MySQLDataSource();

  ...

}

```

This example, as seen earlier, violates both SRP and OCP. It is closed for extension because it only supports MySQL, and any change to MongoDB would require modifying this class.

```java
public class PostService {

  @Autowired
  private DataSource database;

  // Business logic for logging and saving
  ...

}

```

Thus, refactoring as shown above ensures compliance with OCP by allowing the `PostService` class to be extended to support different databases without modifying its code.

### - LSP (Liskov Substitution Principle)

> Objects in a program should be replaceable with instances of their subtypes without altering the correctness of the program.

Consider the example of rectangle and square:

```java
class Rectangle {
    int width;
    int height;

    public int getArea() {
    	return width * height;
    }
}

class Square extends Rectangle {

    @Override
    public int getArea() {
    	return width * width;
    }
}
```

Substituting a rectangle with a square changes the behavior of the `getArea()` method, violating LSP. To resolve this, introduce an abstract `Shape` class:

```java
public abstract class Shape {
    public abstract int getArea();
}

public class Square extends Shape {
    private int width;

    @Override
    public int getArea() {
    	return width * width;
    }
}

public class Rectangle extends Shape {
    private int width;
    private int height;

    @Override
    public int getArea() {
		return width * height;
    }
}
```

By abstracting to `Shape`, both `Rectangle` and `Square` can be substituted interchangeably without altering expected behavior.

### - ISP (Interface Segregation Principle)

> Clients should not be forced to depend on interfaces they do not use.

The Interface Segregation Principle states that if a client does not use certain methods in an interface, it should be split into multiple smaller interfaces.

```java
public interface SmartDevice
{
    public abstract void print();

    public abstract void fax();

    public abstract void scan();
}
```

```java
public class AllInOnePrinter implements SmartDevice
{
    @Override
    public void print()
    {
         // Printing code.
    }

    @Override
    public void fax()
    {
         // Beep booop biiiiip.
    }

    @Override
    public void scan()
    {
         // Scanning code.
    }
}
```

In this example, `AllInOnePrinter` implements `SmartDevice`, but implements unnecessary methods (`fax()` and `scan()`) for its functionality. Refactor by segregating interfaces:

```java
public interface Print {
    void print();
}

public interface Fax {
    void fax();
}

public interface Scan {
    void scan();
}

public class Printer implements Print
{
    @Override
    public void print()
    {
        //Yes I can print.
    }
}

public class AllInOnePrinter implements Print, Fax, Scan
{
    @Override
    public void print()
    {
         // Printing code.
    }

    @Override
    public void fax()
    {
         // Beep booop biiiiip.
    }

    @Override
    public void scan()
    {
         // Scanning code.
    }
}
```

By splitting the interfaces, unnecessary dependencies are avoided, adhering to ISP.

### - DIP (Dependency Inversion Principle)

> High-level modules should not depend on low-level modules. Both should depend on abstractions.

Summarizing DIP in one sentence: **Do not depend on concrete implementations; depend on abstractions.**

```java
class SamsungPay {
    String payment() {
        return "samsung";
    }
}
```

```java
public class PayService {
    private SamsungPay pay;

    public void setPay(final SamsungPay pay) {
        this.pay = pay;
    }

    public String payment() {
        return pay.payment();
    }
}
```

The `PayService` high-level module depends directly on `SamsungPay`, violating DIP. To adhere to DIP, abstract `Pay` as follows:

```java
public interface Pay {
    String payment();
}
```

```java
class SamsungPay implements Pay {
    @Override
    public String payment() {
        return "samsung";
    }
}
```

```java
public class PayService {
    private Pay pay;

    public void setPay(final Pay pay) {
        this.pay = pay;
    }

    public String payment() {
        return pay.payment();
    }
}
```

By abstracting `SamsungPay` into `Pay`, `PayService` is no longer affected by changes in `SamsungPay`, demonstrating adherence to DIP.
