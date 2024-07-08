---
title: 'Spring Boot Summary #7 - Annotations (2)'
date: 2023-05-23 16:05:55
category: SpringBoot
thumbnail: { thumbnailSrc }
draft: false
---

### @PostConstruct

This annotation is used on methods that need to be executed after dependency injection is complete. It ensures that the method runs even if it's not called from other resources.

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

In the example above, `@PostConstruct` is used to initialize `jwtSecret` after dependency injection is finished.

### @Value

The `@Value` annotation injects values from properties files into Spring variables.

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

## Annotations Used to Create Custom Annotations

```java
@Target(ElementType.PARAMETER)
@Retention(RetentionPolicy.RUNTIME)
public @interface UserId {
}
```

### @Target

Specifies where the annotation can be applied.

| ElementType     | Description                                       |
| --------------- | ------------------------------------------------- |
| PACKAGE         | Declaration of packages                           |
| TYPE            | Declaration of types (classes, interfaces, enums) |
| CONSTRUCTOR     | Declaration of constructors                       |
| FIELD           | Declaration of enum constants and fields          |
| METHOD          | Declaration of methods                            |
| ANNOTATION_TYPE | Declaration of annotation types                   |
| LOCAL_VARIABLE  | Declaration of local variables                    |
| PARAMETER       | Declaration of parameters                         |
| TYPE_PARAMETER  | Declaration of parameterized types                |

### @Retention

Specifies how long annotations are to be retained.

1. RetentionPolicy.SOURCE: Discarded at compile time.
2. RetentionPolicy.CLASS: Stored in .class files, discarded at runtime (default for Java).
3. RetentionPolicy.RUNTIME: Retained at runtime.

Example:

```java
import java.lang.annotation.Annotation;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

// Custom annotations with different retention policies
@Retention(RetentionPolicy.SOURCE)
@interface SourceRetention {
    String value() default "Source Retention";
}

@Retention(RetentionPolicy.CLASS)
@interface ClassRetention {
    String value() default "Class Retention";
}

@Retention(RetentionPolicy.RUNTIME)
@interface RuntimeRetention {
    String value() default "Runtime Retention";
}

// Example usage
@SourceRetention
class A {
}

@ClassRetention
class B {
}

@RuntimeRetention
class C {
}

// Main class
public class RetentionPolicyDemo {
    public static void main(String[] args) {
        // Getting annotations
        Annotation[] a = new A().getClass().getAnnotations();
        Annotation[] b = new B().getClass().getAnnotations();
        Annotation[] c = new C().getClass().getAnnotations();

        System.out.println("Number of annotations attached to class A: " + a.length);
        System.out.println("Number of annotations attached to class B: " + b.length);
        System.out.println("Number of annotations attached to class C: " + c.length);
        System.out.println("Annotation attached to class C: " + c[0]);
    }
}
```

Output:

```java
Number of annotations attached to class A: 0
Number of annotations attached to class B: 0
Number of annotations attached to class C: 1
Annotation attached to class C: @RuntimeRetention(value="Runtime Retention")
```
