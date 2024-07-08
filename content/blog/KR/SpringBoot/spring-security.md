---
title: 'Spring boot 정리 #6 - Spring Security'
date: 2023-05-23 15:05:83
category: SpringBoot
thumbnail: { thumbnailSrc }
draft: false
---

## 1. Spring security란?

스프링 시큐리티는 스프링 기반 애플리케이션의 인증과 권한을 담당하는 스프링의 하위 프레임워크이다.

- 인증(Authenticate)은 로그인을 의미한다.
- 권한(Authorize)은 인증된 사용자가 어떤 것을 할 수 있는지를 의미한다.

Spring Security는 보안과 관련해서 체계적으로 많은 옵션을 제공해주기 때문에,
개발자 입장에서 일일이 보안 관련 로직을 작성하지 않아도 된다는 장점이 있다.

Spring Security는 '인증'과 '권한'에 대한 부분을 **Filter** 흐름에 따라 처리하고 있다.

Filter는 Dispatcher Servlet으로 가기 전에 적용되므로 가장 먼저 URL 요청을 받지만, (웹 컨테이너에서 관리)
Interceptor는 Dispatcher와 Controller 사이에 위치한다는 점에서 적용 시기의 차이가 있다. (스프링 컨테이너에서 관리)

Client (request) → Filter → DispatcherServlet → Interceptor → Controller
(실제로 Interceptor가 Controller로 요청을 위임하는 것은 아님, Interceptor를 거쳐서 가는 것)

## 2. Spring Security 동작원리

![](./images/spring-security2.png)

스프링 시큐리티 구조의 처리 과정을 간단히 설명하면 다음과 같다.

1. 사용자가 로그인 정보와 함께 인증 요청을 한다.(Http Request)
2. AuthenticationFilter가 요청을 가로채고, 가로챈 정보를 통해 UsernamePasswordAuthenticationToken의 인증용 객체를 생성한다.
3. AuthenticationManager의 구현체인 ProviderManager에게 생성한 UsernamePasswordToken 객체를 전달한다.
4. AuthenticationManager는 등록된 AuthenticationProvider(들)을 조회하여 인증을 요구한다.
5. 실제 DB에서 사용자 인증정보를 가져오는 UserDetailsService에 사용자 정보를 넘겨준다.
6. 넘겨받은 사용자 정보를 통해 DB에서 찾은 사용자 정보인 UserDetails 객체를 만든다.
7. AuthenticationProvider(들)은 UserDetails를 넘겨받고 사용자 정보를 비교한다.
8. 인증이 완료되면 권한 등의 사용자 정보를 담은 Authentication 객체를 반환한다.
9. 다시 최초의 AuthenticationFilter에 Authentication 객체가 반환된다.
10. Authenticaton 객체를 SecurityContext에 저장한다.

최종적으로 SecurityContextHolder는 세션 영역에 있는 SecurityContext에 Authentication 객체를 저장한다.
사용자 정보를 저장한다는 것은 Spring Security가 전통적인 세션-쿠키 기반의 인증 방식을 사용한다는 것을 의미한다.

## 3. 주요 모듈 설명

### Authentication

인증과정을 거치고 최종적으로 반환되는 객체

> 8. 인증이 완료되면 권한 등의 사용자 정보를 담은 Authentication 객체를 반환한다.
> 9. 다시 최초의 AuthenticationFilter에 Authentication 객체가 반환된다.

현재 접근하는 주체의 정보와 권한을 담는 인터페이스이다. Authentication 객체는 SecurityContext에 저장되며,
SecurityContextHolder를 통해 SecurityContext에 접근하고, SecurityContext를 통해 Authentication에 접근할 수 있다.

```java
public interface Authentication extends Principal, Serializable {
// 현재 사용자의 권한 목록을 가져옴
Collection<? extends GrantedAuthority> getAuthorities();

 // credentials(주로 비밀번호)을 가져옴
Object getCredentials();

 Object getDetails();

    // Principal 객체를 가져옴
    Object getPrincipal();

    // 인증 여부를 가져옴
    boolean isAuthenticated();

    // 인증 여부를 설정함
    void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException;

}
```

### UsernamePasswordAuthenticationToken

> 2.  AuthenticationFilter가 요청을 가로채고, 가로챈 정보를 통해 UsernamePasswordAuthenticationToken의 인증용 객체를 생성한다.
> 3.  AuthenticationManager의 구현체인 ProviderManager에게 생성한 UsernamePasswordToken 객체를 전달한다.

UsernamePasswordAuthenticationToken은 Authentication을 implements한 AbstractAuthenticationToken의 하위 클래스로, User의 ID가 Principal 역할을 하고, Password가 Credential의 역할을 한다. UsernamePasswordAuthenticationToken의 첫 번째 생성자는 인증 전의 객체를 생성하고, 두번째는 인증이 완료된 객체를 생성한다.

```java
public abstract class AbstractAuthenticationToken implements Authentication, CredentialsContainer {
}

public class UsernamePasswordAuthenticationToken extends AbstractAuthenticationToken {

    private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

    // 주로 사용자의 ID에 해당
    private final Object principal;

    // 주로 사용자의 PW에 해당
    private Object credentials;

    // 인증 완료 전의 객체 생성
    public UsernamePasswordAuthenticationToken(Object principal, Object credentials) {
    	super(null);
    	this.principal = principal;
    	this.credentials = credentials;
    	setAuthenticated(false);
    }

    // 인증 완료 후의 객체 생성
    public UsernamePasswordAuthenticationToken(Object principal, Object credentials,
    		Collection<? extends GrantedAuthority> authorities) {
    	super(authorities);
    	this.principal = principal;
    	this.credentials = credentials;
    	super.setAuthenticated(true); // must use super, as we override
    }

}
```

### AuthenticationManager

> 4. AuthenticationManager는 등록된 AuthenticationProvider(들)을 조회하여 인증을 요구한다.

인증에 대한 부분은 AuthenticationManager를 통해서 처리하게 되는데, 실질적으로는 AuthenticationManager에등록된 AuthenticationProvider에 의해 처리된다. 인증에 성공하면 두번째 생성자를 이용해 객체를 생성하여 SecurityContext에 저장한다.

```java
public interface AuthenticationManager {

    Authentication authenticate(Authentication authentication) throws AuthenticationException;

}
```

### AuthenticationProvider

AuthenticationProvider에서는 실제 인증에 대한 부분을 처리하는데, 인증 전의 Authentication 객체를 받아서 인증이 완료된 객체를 반환하는 역할을 한다. 아래와 같은 인터페이스를 구현해 Custom한 AuthenticationProvider를 작성하고 AuthenticationManager에 등록하면 된다.

```java
public interface AuthenticationProvider {

    Authentication authenticate(Authentication authentication) throws AuthenticationException;

    boolean supports(Class<?> authentication);

}
```

### ProviderManager

AuthenticationManager를 implements한 ProviderManager는 AuthenticationProvider를 구성하는 목록을 갖는다.

```java
public class ProviderManager implements AuthenticationManager, MessageSourceAware, InitializingBean {

    public List<AuthenticationProvider> getProviders() {
		return this.providers;
	}
    
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		Class<? extends Authentication> toTest = authentication.getClass();
		AuthenticationException lastException = null;
		AuthenticationException parentException = null;
		Authentication result = null;
		Authentication parentResult = null;
		int currentPosition = 0;
		int size = this.providers.size();
        
        // for문으로 모든 provider를 순회하여 처리하고 result가 나올때까지 반복한다.
		for (AuthenticationProvider provider : getProviders()) { ... }
	}
}
```

### UserDetailsService

> 5.  실제 DB에서 사용자 인증정보를 가져오는 UserDetailsService에 사용자 정보를 넘겨준다.

UserDetailsService는 UserDetails 객체를 반환하는 하나의 메소드만을 가지고 있는데, 일반적으로 이를 implements한 클래스에 UserRepository를 주입받아 DB와 연결하여 처리한다.

```java
public interface UserDetailsService {

    UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;

}
```

### UserDetails

> 6.  넘겨받은 사용자 정보를 통해 DB에서 찾은 사용자 정보인 UserDetails 객체를 만든다.
> 7.  AuthenticationProvider(들)은 UserDetails를 넘겨받고 사용자 정보를 비교한다.

인증에 성공하여 생성된 UserDetails 객체는 Authentication객체를 구현한 UsernamePasswordAuthenticationToken을 생성하기 위해 사용된다. UserDetails를 implements하여 처리할 수 있다.

```java
public interface UserDetails extends Serializable {

    // 권한 목록
    Collection<? extends GrantedAuthority> getAuthorities();

    String getPassword();

    String getUsername();

    // 계정 만료 여부
    boolean isAccountNonExpired();

    // 계정 잠김 여부
    boolean isAccountNonLocked();

    // 비밀번호 만료 여부
    boolean isCredentialsNonExpired();

    // 사용자 활성화 여부
    boolean isEnabled();

}
```

### SecurityContextHolder

SecurityContextHolder는 보안 주체의 세부 정보를 포함하여 응용프로그램의 현재 보안 컨텍스트에 대한 세부 정보가 저장된다.

### SecurityContext

> 10. Authenticaton 객체를 SecurityContext에 저장한다.

Authentication을 보관하는 역할을 하며, SecurityContext를 통해 Authentication을 저장하거나 꺼내올 수 있다.

```java
SecurityContextHolder.getContext().setAuthentication(authentication);
SecurityContextHolder.getContext().getAuthentication(authentication);
```

### GrantedAuthority

GrantedAuthority는 현재 사용자(Principal)가 가지고 있는 권한을 의미하며, ROLE*ADMIN이나 ROLE*USER와 같이 ROLE\_ \*의 형태로 사용한다. GrantedAuthority 객체는 UserDetailsService에 의해 불러올 수 있고, 특정 자원에 대한 권한이 있는지를 검사하여 접근 허용 여부를 결정한다.

## 출처

https://dev-coco.tistory.com/174
