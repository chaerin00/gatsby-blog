---
title: 'Spring Boot Summary #4 - Annotations (1)'
date: 2023-04-18 19:04:06
category: SpringBoot
thumbnail: { thumbnailSrc }
draft: false
---

### @Controller, @Service, @Repository

- @Component specialization: @Controller, @Service, @Repository
- Registers a bean.
- Indicates to the Spring Framework that the class is used as a Controller/Service/Repository.

### @RestController

@RestController combines @Controller and @ResponseBody.
It is used to return object data in JSON format and is commonly used when developing REST APIs. It wraps objects in ResponseEntity for return.
Equivalent implementation with @Controller + @ResponseBody:

```java
@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/user/{userId}")
    public @ResponseBody String getUser(@PathVariable final Long userId) {
        System.out.println("Requested user ID: " + userId);

        return "User retrieval successful";
    }
}
```

### @AllArgsConstructor

- Automatically generates a constructor for all fields in the class.
- `access` attribute: Specifies the access modifier.

Before @AllArgsConstructor:

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

After @AllArgsConstructor:

```java
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class EditRequestDto {
    private String title;
    private String content;
}
```

### @RequiredArgsConstructor

- Automatically generates a constructor for final fields in the class.
- Final fields must be initialized either in the class or through constructor injection.

Example using @RequiredArgsConstructor instead of constructor injection:

Before @RequiredArgsConstructor:

```java
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
```

After @RequiredArgsConstructor:

```java
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
}
```

### @GetMapping, @PostMapping, @PutMapping, @DeleteMapping, @PatchMapping

These annotations map requests to handlers.

These annotations can all be replaced by `@RequestMapping`. For example, `@GetMapping("/post/search")` is equivalent to `@RequestMapping(value = "/post/search", method = RequestMethod.GET)`.
However, `@GetMapping`, `@PostMapping`, etc., are more intuitive and make it easier to understand which method handles which request.

`@RequestMapping` can be used at both class and method levels, whereas `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`, `@PatchMapping` are used only at the method level.

### + Difference between PUT and PATCH

PUT and PATCH methods both update resources, but:

- PUT updates the entire resource. For example, if you want to update only the `title` of a post resource while keeping `content` and `date` unchanged, PUT would require you to send all fields (`title`, `content`, `date`). If any field is empty, it will be set to null.

  RequestBody:

  ```json
  {
    "title": "Post 1",
    "content": "Some content",
    "date": "2023-04-18"
  }
  ```

- PATCH updates part of the resource. If you send only the `title` field in the RequestBody, PATCH will update only the `title` field while leaving `content` and `date` unchanged.

  RequestBody:

  ```json
  {
    "title": "Post 2"
  }
  ```

### @PathVariable

`@PathVariable` extracts variables from the request URI.

```java
@GetMapping("/post/{postId}")
public String getPost(@PathVariable final Long postId) {
    System.out.println("Requested post ID: " + postId);

    return postService.getDetail(postId);
}
```

In this example, `postId` from the path `/post/{postId}` is mapped to `Long postId`.

### @RequestParam

`@RequestParam` retrieves parameters from the request URI in query params format.

```java
@GetMapping("/post/search")
public List<Post> search(@RequestParam final String title) {
    System.out.println("Search parameter: " + title);

    return postService.search(title);
}
```

For example, if there is a GET API like this `/post/search`, requests can be made like `/post/search?title=Post1`. Multiple parameters can be received as `/post/search?title=Post1&content=SomeContent`.

```java
public List<Post> search(@RequestParam(required = true, defaultValue = "") final String title) {
    System.out.println("Search parameter: " + title);

    return postService.search(title);
}
```

You can set `required` and `defaultValue`. `required=true` is the default, so if `title` is missing in the request, it will result in a 400 Bad Request error.

### @RequestBody

`@RequestBody` retrieves data sent in the HTTP request body.

`@RequestBody` converts JSON (application/json) content from the HTTP body sent by the client into a Java Object.
The key feature is conversion rather than binding, so variables do not need setter functions to be stored correctly.

```java
@PostMapping("/post")
public String register(@RequestBody final RegisterRequestDto request) {
    Long postId = postService.register(request);
    System.out.println(request.getId() + request.getContent() + request.getTitle());
}
```

In this code, data received via `@RequestBody` is converted into a Java Object (`RegisterRequestDto`) so that methods like `getTitle()`, `getContent()` can be used.

### @Getter

`@Getter` generates getters using `get[FieldName]()`. Although not used in the example, `@Setter` generates setters using `set[FieldName]()`.

```java
@PutMapping("/post/{postId}")
public String editPost(@PathVariable final Long postId, @RequestBody final EditRequestDto request) {
    System.out.println(request.getTitle() + request.getContent());

    return postService.edit(postId, request);
}
```

In this example, because `@Getter` is used in `EditRequestDto`, methods like `getTitle()`, `getContent()` are automatically generated without explicitly defining them.
