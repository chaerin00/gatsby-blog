---
title: 'Spring boot 정리 #7 - Annotation(2)'
date: 2023-05-23 16:05:55
category: SpringBoot
thumbnail: { thumbnailSrc }
draft: false
---

### @PostConstruct

종속성 주입이 완료된 후 실행되어야 하는 메서드에 사용된다. 이 어노테이션은 다른 리소스에서 호출되지 않아도 수행된다.

```java
@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @PostConstruct
    protected void init() {
        jwtSecret = Base64.getEncoder()
                .encodeToString(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
    ...
```

위의 코드에서는 의존성 주입이 완료된 후 `jstSecret`을 초기화 하기 위해 사용하였다.

### @Value

`@Value` 어노테이션은 properties 파일에 세팅한 내용을 Spring 변수에 주입하는 역할을 한다.

```java
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;
```

application.yaml

```yaml
jwt:
  secret: asdfdskjfsdkjflkdjfkjsdfsdfjaas
```

## 커스텀 annotation을 만들기 위한 사용한 annotation들

```java
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface UserId {
}
```

### @Target

어노테이션이 생성될 수 있는 위치를 지정하는 어노테이션입니다.

| ElementType     | 설명                                     |
| --------------- | ---------------------------------------- |
| PACKAGE         | 패키지 선언 시                           |
| TYPE            | 타입(클래스, 인터페이스, 열거형) 선언 시 |
| CONSTRUCTOR     | 생성자 선언 시                           |
| FIELD           | 열거형 상수를 포함 멤버변수 선언 시      |
| METHOD          | 메소드 선언 시                           |
| ANNOTATION_TYPE | 어노테이션 타입 선언 시                  |
| LOCAL_VARIABLE  | 파라미터 선언 시                         |
| PARAMETER       | 파라미터 선언 시                         |
| TYPE_PARAMETER  | 파라미터 타입 선언 시                    |

### @Retention

어노테이션이 언제까지 유효할지 정하는 어노테이션입니다

1. RetentionPolicy.SOURCE: runtime에 discard 됩니다.
2. RetentionPolicy.CLASS: .class파일 안에서 저장되며 runtime시 discard됩니다. java에서 default retention policy입니다.
3. RetentionPolicy.RUNTIME: runtime동안 유지됩니다.

Implementation:
SOURCE - A, CLASS - B, RUNTIME - C

Example

```java

import java.lang.annotation.Annotation;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

// Here we will be creating 3 annotations with
// RetentionPolicy as SOURCE, CLASS, & RUNTIME

// Retention Annotation 1 - SOURCE
@Retention(RetentionPolicy.SOURCE)
@interface SourceRetention
{
    String value() default "Source Retention";
}

// Retention Annotation 2 - CLASS
@Retention(RetentionPolicy.CLASS)
@interface ClassRetention
{
    String value() default "Class Retention";
}

// Retention Annotation 3 - RUNTIME
@Retention(RetentionPolicy.RUNTIME)
@interface RuntimeRetention
{
    String value() default "Runtime Retention";
}

// Annotating classes A, B, and C
// with our custom annotations
@SourceRetention
class A {
}

@ClassRetention
class B {
}

@RuntimeRetention
class C {
};

// Main class
public class RetentionPolicyDemo {

    // Main driver method
    public static void main(String[] args)
    {


        // 배열 a와 b는 런타임 이전에 비워지게 됩니다. (SOURCE, CLASS)
        // 배열 c는 런타임에도 유지됩니다. (RUNTIME)
        Annotation a[]
            = new A().getClass().getAnnotations();
        Annotation b[]
            = new B().getClass().getAnnotations();
        Annotation c[]
            = new C().getClass().getAnnotations();


        System.out.println(
            "Number of annotations attached to "
            + "class A at Runtime: " + a.length);

        System.out.println(
            "Number of annotations attached to "
            + "class B at Runtime: " + b.length);

        System.out.println(
            "Number of annotations attached to "
            + "class C at Runtime: " + c.length);

        // 클래스 C는 runtime에도 접근 가능합니다.
        System.out.println(
            "Annotation attached to class C: " + c[0]);
    }
}
```

output

```java
Number of annotations attached to class A at Runtime: 0
Number of annotations attached to class B at Runtime: 0
Number of annotations attached to class C at Runtime: 1
Annotation attached to class C: @RuntimeRetention(value="Runtime Retention")
```
