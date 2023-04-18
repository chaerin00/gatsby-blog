---
title: 'Spring boot 정리 #3 - Spring Annotation'
date: 2023-04-15 18:04:90
category: SpringBoot
thumbnail: { thumbnailSrc }
draft: false
---

# 자바의 컴파일 과정

![](./images/java-complie.png)

1. 개발자가 자바 소스코드(.java)를 작성한다.

2. 자바 컴파일러가 자바 소스코드(.java)파일을 읽어 바이트코드(.class)코드로 컴파일 한다. 바이트코드(.class)파일은 아직 컴퓨터가 읽을 수 없는 JVM(자바 가상 머신)이 읽을 수 있는 코드이다. (java - > class)

3. 컴파일된 바이트코드(.class)를 JVM의 클래스로더(Class Loader)에게 전달한다.

4. 클래스 로더는 동적로딩(Dynamic Loading)을 통해 필요한 클래스들을 로딩 및 링크하여 런타임 데이터 영역(Runtime Data area), 즉 JVM의 메모리에 올린다.

   **클래스 로더 세부 동작**

   로드 : 클래스 파일을 가져와서 JVM의 메모리에 로드한다.

   검증 : 자바 언어 명세(Java Language Specification) 및 JVM 명세에 명시된 대로 구성되어 있는지 검사한다.

   준비 : 클래스가 필요로 하는 메모리를 할당한다. (필드, 메서드, 인터페이스 등등)

   분석 : 클래스의 상수 풀 내 모든 심볼릭 레퍼런스를 다이렉트 레퍼런스로 변경한다.

   초기화 : 클래스 변수들을 적절한 값으로 초기한다. (static 필드)

5. 실행엔진(Execution Engine)은 JVM 메모리에 올라온 바이트 코드들을 명령어 단위로 하나씩 가져와서 실행한다. 이 때 실행 엔진은 두 가지 방식으로 변경한다

   1. 인터프리터 : 바이트 코드 명령어를 하나씩 읽어서 해석하고 실행한다. 하나하나의 실행은 빠르나, 전체적인 실행 속도가 느리다는 단점을 가진다.

   2. JIT컴파일러 : 인터프리터의 단점을 보완하기 위해 도입된 방식으로 바이트 코드 전체를 컴파일하여 바이너리 코드로 변경하고 이후에는 해당 메서드를 더이상 인터프리팅 하지 않고, 바이너리 코드로 직접 실행하는 방식한다. 하나씩 인터프리팅하여 실행하는 것이 아니라 바이트 코드 전체가 컴파일된 바이너리 코드를 실행하는 것이기 때문에 전체적인 실행속도는 인터프리팅 방식보다 빠르다.

# Builder Pattern

## 빌더 패턴을 사용하는 이유

- 불필요한 생성자를 만들지 않고, 객체를 생성
- 데이터의 순서에 상관없이 객체를 생성
- 명시적이고, 이해하기 쉬움
- 유지 보수가 편함

즉 빌더 패턴은 객체 생성을 깔끔하고, 유연하게 하기 위한 기법

점층적 생성자 패턴이나, 자바빈 패턴의 대안으로 나온 것이 빌더 패턴이다.
빌더 패턴이 나오게 된 이유를 먼저 살펴보자.

## 점층적 생성자 패턴

```java
public class Post {

    private String title;
    private String content;
    private LocalDateTime date;

    // 점층적 생성자 패턴
    public Post() {

    }

    public Post(String title) {
        this.title = title;
    }

    public Post(String title, String author) {
        this.title = title;
        this.author = author;
    }

    public Post(String title, String author, LocalDateTime date) {
        this.title = title;
        this.author = author;
        this.date = date;
    }
}
```

test

```java
@SpringBootTest
public class BuilderPatternTest {
  @Test
  public void Test() {
    Post Post1 = new Post("홍길동전");
    Post Post2 = new Post("홍길동전","허균");
    Post Post3 = new Post("홍길동전","허균",LocalDateTime.now());
    Post Post4 = new Post("홍길동전","허균",LocalDateTime.now(),0);
  }
}
```

**단점**

다른 생성자를 호출하는 생성자가 많아질 경우, 인자가 추가될 때 코드 수정이 어렵다.
코드 가독성이 떨어진다 (인자 수가 많은 생성자의 경우, 코드만 보고 의미를 해석하기 어렵다.)

## 자바빈 패턴

```java
public class Post {

    private String title;
    private String content;
    private LocalDateTime date;

    // 자바빈 패턴
     public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDateTime getDate() {
        return this.publishedAt;
    }

    public void setDate(LocalDateTime publishedAt) {
        this.publishedAt = publishedAt;
    }

}
```

```java
@SpringBootTest
public class BuilderPatternTest {
  @Test
  public void Test() {
    Post post = new Post();
    post.setTitle("홍길동전");
    post.setAuthor("허균");
    post.setPublishedAt(LocalDateTime.now());
    post.setPageCount(0);
  }
}
```

**단점**

- 객체 일관성이 깨진다 : 1회의 호출로 객체 생성이 끝나지 않는다. (한번 생성한 객체에 값을 계속 세팅함)
- 변경 불가능 클래스를 만들 수가 없음 : 스레드 안전성을 확보하려면 점층적 패턴보다 많은 일을 해야한다.

이런 점층적 생성자 패턴과 자바빈 패턴의 대안으로 나온 것이 Builder pattern이다.

## Builder 패턴

```java
public Book(BookBuilder bookBuilder) {
        title = bookBuilder.title;
        author = bookBuilder.author;
        publishedAt = bookBuilder.publishedAt;
        pageCount = bookBuilder.pageCount;
    }

    public static class BookBuilder {
        //필수 인자
        private String title;

        //선택적 인자
        private String author = "";
        private LocalDateTime publishedAt = LocalDateTime.now();
        private int pageCount = 0;

        public BookBuilder (String title) {
            this.title = title;
        }

        public BookBuilder author(String value) {
            author = value;
            return this;    //return this로 하면 .으로 인자를 연속적으로 세팅할 수 있다.
        }

        public BookBuilder publishedAt(LocalDateTime value) {
            publishedAt = value;
            return this;
        }

        public BookBuilder title(int value) {
            pageCount = value;
            return this;
        }

        public Book build() {
            return new Book(this);
        }
    }
```

```java
@SpringBootTest
public class BuilderPatternTest {
  @Test
  public void Test() {
    Book book6 = new Book.BookBuilder("홍길동전")
                        .author("허균")
                        .build();

  }
}
```

이러한 빌드 패턴은 lombok의 @Builder 어노테이션을 이용해 간단히 구현이 가능하다.

```java
@Builder
public class User {
    private String title;
    private String author = "";
    private LocalDateTime date = LocalDateTime.now();
    private int pageCount = 0;
}
```

```java
User bag = Bag.builder()
		    .title("title")
        	.author("author")
        	.build();
```

# Annotation

### @Controller, @Service, @Repository

- @Component —구체화—> @Controller, @Service, @Repository
- bean으로 등록
- 해당 클래스가 Controller/Service/Repository로 사용됨을 Spring Framework에 알린다.

### @RestController

@RestController는 @Controller에 @ResponseBody가 추가된 것.
RestController는 Json 형태로 객체 데이터를 반환하기 위해 사용된다. REST API를 개발할 때 주로 사용하며 객체를 ResponseEntity로 감싸서 반환한다.
@Controller에 @ResponseBody를 붙여 똑같이 구현할 수 있다.

`@Controller` + `@ResponseBody` 예시

```java
@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping("/user/{userId}")
    public @ResponseBody String getUser(@PathVariable final Long userId) {
        System.out.println("요청 유저 아이디: " + userId);

        return "유저 조회 성공";
    }
}
```

### @AllArgsConstructor

- 클래스의 모든 필드에 대한 생성자를 자동으로 생성한다.
- access : 접근제한자를 지정한다.

@AllArgsConstructor 적용 전

```java
@Getter
public class EditRequestDto {
    private String title;
    private String content;

    public EditRequestDto(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
```

@AllArgsConstructor 적용 후

```java
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class EditRequestDto {
    private String title;
    private String content;
}
```

### @RequiredArgsConstructor

- 클래스의 final 필드에 대한 생성자를 자동으로 생성한다.
- final 필드는 클래스에서 초기화를 하던지 객체 생성 시 생성자를 이용해 꼭 초기화해줘야 한다.

다음 예시는 생성자 주입 대신 @RequiredArgsConstructor을 사용한 예시이다.

@RequiredArgsConstructor 적용 전

```java
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
```

@RequiredArgsConstructor 적용 후

```java
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
}
```

### @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping

위의 어노테이션들은 request와 핸들러를 매핑하는 어노테이션들이다.

위의 어노테이션들은 모두 `@RequestMapping`으로도 대신할 수 있다.
예를 들어 `@GetMapping("/post/search")`은 `@RequestMapping(value = "/post/search", method = RequestMethod.GET)`을 대신하는 것이다.
하지만 `@GetMapping`, `@PostMapping`이 조금 더 직관적이고 어떤 메소드의 핸들러인지 파악하기 더 쉽다.

`@RequestMapping`은 클래스 레벨, 메소드 레벨 모두에서 사용가능하고
`@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, `@PatchMapping`은 메소드 레벨에서만 사용가능하다는 차이가 있다.

### + PUT과 PATCH의 차이

PUT과 PATCH 메소드는 모두 리소스를 업데이트하는 메소드이지만
PUT 메소드는 리소스 전체를 PATCH는 리소스의 일부만을 수정한다.

```json
{
  "title": "게시물 1",
  "content": "내용 어쩌구",
  "date": "2023-04-18"
}
```

위와 같이 게시물 리소스가 있고 title만 수정하길 원한다면,<br/>
PUT은 title만 수정하고 나머지 필드는 이전 데이터를 유지한채 title, content, date를 모두 받아 수정한다.
만약 한가지라고 비어있는 필드가 있다면 해당 필드는 null값으로 채운다.

`RequestBody`

```json
{
  "title": "게시물 2",
  "content": "내용 어쩌구",
  "date": "2023-04-18"
}
```

반면 PATCH는 title 필드만 RequestBody로 받는다면 content, date의 데이터는 유지하고 title만 수정한다.

```json
{
  "title": "게시물 2"
}
```

### @PathVariable

`@PathVariable`은 요청 URI에서 parameter를 받아 처리하는 것이다.

```java
@GetMapping("/post/{postId}")
```

위와 같이 path에서 `{}`로 감싼 부분은 변수로 사용된다.
만약 `post/123`이런 식으로 요청이 들어왔다면 `postId`는 123으로 맵핑되는 것이다.

```java
@GetMapping("/post/{postId}")
public String getPost(@PathVariable final Long postId) {
    System.out.println("요청 게시물 아이디: " + postId);

    return postService.getDetail(postId);
}
```

위의 예제와 같이 핸들러의 매개변수 이름을 path에서 정의된 변수 이름(postId)과 동일하게 정의하면 path variable이 사용가능하다.

### @RequestParam

`@RequestParam`은 요청 URI에서 query params 형식으로 전달 받게 된다.

```java
@GetMapping("/post/search")
public List<Post> search(@RequestParam final String title) {
    System.out.println("게시물 제목 검색 인자: " + title);

    return postService.search(title);
}
```

위와 같은 GET api가 있다면 요청이 `/post/search?title=게시물1` 형식으로 들어오게 되는 것이다.
`/post/search?title=게시물1&content=어쩌구` 이렇게 여러 개의 parameter를 받을 수도 있다.

```java
public List<Post> search(@RequestParam(required = true, defaultValue = "") final String title) {
    System.out.println("게시물 제목 검색 인자: " + title);

    return postService.search(title);
}
```

위와 같이 required 여부, default value도 설정할 수 있다. `required=true`가 default이기 때문에 요청에서 title이 없다면 400 Bad Request 에러가 발생한다.

### @RequestBody

@RequestBody는 HTTP 요청에서 body에 담겨져 오는 데이터를 받아올 때 사용된다.

@RequestBody는 클라이언트가 전송하는 JSON(application/json) 형태의 HTTP Body 내용을 Java Object로 변환시켜주는 역할을 한다.
가장 큰 특징은 바인딩이 아닌 변환을 시키는 것이기 때문에 변수들의 Setter 함수가 없어도 정상적으로 저장된다.

```java
 @PostMapping("/post")
    public String register(@RequestBody final RegisterRequestDto request) {
        // 서비스 계층에 유저를 등록하는 메서드를 호출
        Long postId = postService.register(request);
        System.out.println(request.getId() + request.getContent() + request.getTitle());
    }
```

위의 코드에서와 같이 @RequestBody로 받아온 데이터는 RegisterRequestDto라는 Java Object로 변환하여 getter와 같은 메소드를 사용할 수 있게 되는 것이다.

### @Getter

`@Getter`를 사용하면 `get[멤버변수명]()`으로 getter를 만들어준다. 예제에서는 사용하진 않았지만 @Setter를 사용하면 `set[멤버변수명]()`으로 setter를 만들어준다.

```java
@PutMapping("/post/{postId}")
public String editPost(@PathVariable final Long postId, @RequestBody final EditRequestDto request) {
    System.out.println(request.getTitle() + request.getContent());

    return postService.edit(postId, request);
}
```

위의 예시는 EditRequestDto에서 @Getter를 사용했기 때문에 멤버 메소드를 따로 정의하지 않고도 `getTitle()`,`getContent()`를 사용한 예시이다.
