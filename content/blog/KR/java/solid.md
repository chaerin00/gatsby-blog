---
title: SOLID 원칙과 예제
date: 2023-04-12 13:04:69
category: java
thumbnail: { thumbnailSrc }
draft: false
---

## SOLID 원칙: 객체 지향 프로그래밍의 5대 원칙

### - SRP(Single Responsibility Principle): 단일 책임 원칙<br/>

> 하나의 클래스는 하나의 책임만 가져야 한다.

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

위의 예제는 SPR을 위반한 예시이다. 왜냐하면 게시물 생성, 수정, 삭제 등을 담당해야하는 해당 클래스에서 데이터베이스 생성까지 책임지고 있기 때문이다. 만일 데이터베이스가 MySQL에서 MongoDB로 바뀐다면 데이터베이스의 생성 로직을 수정하는 문제가 발생한다. 그렇기 때문에 위의 코드는 Spring에서 다음과 같이 사용될 수 있다.

```java
public class PostService {

  @Autowired
  private DataSource database;

  //로그를 출력하고 저장하는 비즈니스 로직
  ...

}

```

위와 같이 수정하여 @Autowired 어노테이션을 통해 Datasource 인터페이스를 필드 주입 방식으로 주입한다.(생성자 주입을 권장하지만 위는 단순 예시이기 때문에 넘어가겠습니다)<br/>
이렇게 데이터베이스 생성에 대한 책임을 삭제하고 게시물과 관련된 로직만 담당하도록 수정할 수 있다.

### - OCP(Open Closed Priciple): 개방 폐쇄 원칙<br/>

> 소프트웨어 요소는 확장에는 열려있으나 변경에는 닫혀있어야 한다.

```java
public class PostService {

  private DataSource database = new MySQLDataSource();

  ...

}

```

아까 봤던 SRP 위반과 같은 예시이다. 위의 예시는 SRP와 OCP를 모두 위반한 예시이다. 먼저는 MySQL database만 사용가능하기 때문에 확장에 닫혀있다. 또한 데이터베이스를 MongoDB로 수정하고자 한다면 해당 클래스를 수정 해야하는 수정에는 열려있는 구조이기 때문이다.

```java
public class PostService {

  @Autowired
  private DataSource database;

  //로그를 출력하고 저장하는 비즈니스 로직
  ...

}

```

따라서 위와 같이 수정하면 OCP도 지키게 된다.

### - LSP(Listov Substitution Priciple): 리스코프 치환 원칙<br/>

> B가 A의 자식 타입이면, 부모 타입인 A객체는 자식 타입인 B로 치환해도 작동에 문제가 없어야 한다.

다음은 사각형과 정사각형 예시이다.

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

만일 직사각형을 정사각형에 대입한다고 하면 넓이를 구하는 getArea()의 로직이 달라진다. 그렇기 때문에 직사각형을 정사각형으로 치환한다고 하면 직사각형의 작동에 문제가 생기는 것이다. 위를 해결하기 위해서는 Shape라는 클래스를 만들어야한다.

```java
public abstract class Shape {
    public abstract int getArea();
}

public class Square extends Shape  {
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

위의 코드는 Shape라는 추상 클래스를 Rectangle과 Square가 각각 상속 받아서 getArea() 메소드의 동작에 문제가 생기지 않고, 또한 Shape는 각각 Rectangle과 Square로 치환이 가능하다.

### - ISP(Interface Segregation Principle): 인터페이스 분리 원칙<br/>

> 특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫다.

인터페이스 분리 원칙은 만일 클라이언트가 사용하지 않는 메소드가 인터페이스에 포함되어 있다면 하나의 인터페이스를 2개 혹은 여러개로 나누어야 한다는 원칙이다.

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

위의 예시에서 보면 Printer 클래스가 SmartDevice라는 interface를 구현해야 하기 때문에 필요없는 Fax(), Scan()을 구현하고 있다. 이런 경우에는 interface를 분리하여 코드를 리팩토링 해야한다.

```java
public interface Print {
    public abstract void print();
}
```

```java
public interface Fax {
    public abstract void fax();
}
```

```java
public interface Scan {
    public abstract void scan();
}
```

```java
public class Printer implements Print
{
    @Override
    public void print()
    {
        //Yes I can print.
    }
}
```

```java
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

### - DIP(Dependency Inversion Principle): 의존 역전 원칙<br/>

> 상위 모듈은 하위 모듈에 의존해서는 안된다.

DIP를 한 문장으로 정리하면 **자신보다 변하기 쉬운 것에 의존하지 마라**라고 정리할 수 있다.

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

상위 모듈인 PayService가 SamsungPay에 의존하고 있다. 그렇기 때문에 SamsungPay로 구체화하지 않고 Pay라는 interface로 추상화 해보자.

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

위와 같이 수정하여 SamsungPay는 Pay로 추상화 하였고, PayService는 SamsungPay가 변경된다고 해도 영향을 받지 않게 되었다.
