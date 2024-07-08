---
title: 'Understanding JWT Tokens'
date: 2022-05-19 19:05:00
category: development
thumbnail: { thumbnailSrc }
draft: false
---

# Frontend Authentication Logic

In frontend development, I often implement login logic using the following steps:

1. Obtain Access Token and Refresh Token from the Login API's response.
2. Store Access Token and Refresh Token in local storage or cookies.
3. Include the Access Token in the HTTP Request header's Authorization field in the format `Bearer + <Access Token>` when making API calls.

JWT tokens are predominantly used as Access Tokens and Refresh Tokens in this scenario. Let's delve into the structure of a JWT token.

# JWT Token Structure

A JWT token consists of three parts separated by `.`: Header, Payload, and Signature. Each part is represented in Base64URL encoding.

![](./images/encoded-jwt3.png)

## Base64url Encoding

Base64url encoding converts data to a string format using a specific set of characters (A-Z, a-z, 0-9, -, and \_) to represent 6 bits of data per character. [base64](https://en.wikipedia.org/wiki/Base64)

For example, encoding the word **Man** proceeds as follows:

![](./images/base64_example.png)

Based on this example, when encoding objects using the base64Url method, the `{` character is always included as the first character. Thus, it seems reasonable to expect that all tokens start with the string `ey` 🧐.

```
{ 'name': 'Anna' }
```

```
eyAnbmFtZSc6ICdBbm5hJyB9
```

## Components of JWT Token

As mentioned earlier, a JWT token is divided into Header, Payload, and Signature. Let's explore the meaning of each part.

### 1. Header

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

The Header specifies the type (`typ`) of the token and the signing algorithm (`alg`) such as HMAC-SHA256 or RSA. The algorithm specified here is used to create the Signature in the next part.

### 2. Payload

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

The Payload is also in object format and contains claims, which are key-value pairs. Claims are categorized into three types: Registered Claims, Public Claims, and Private Claims.

- **Registered Claims**

  Registered Claims are predefined claims such as issuer (`iss`), expiration time (`exp`), subject (`sub`), and audience (`aud`). Their usage is optional.

  ```
  {
    "iss": <issuer: token issuer>,
    "exp": <expiration time: token expiration time>,
    "sub": <subject: token subject>,
    "aud": <audience: token audience>,
  }
  ```

  [Other registered claims](https://datatracker.ietf.org/doc/html/rfc7519#section-4.1)

- **Public Claims**

  Public Claims are defined by users of JWT tokens and can be registered in the [IANA JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) or can use URI format to prevent name collisions.

  Example of a public claim:

  ```
  {
      "name": "Anna An", // Claim defined in the IANA JSON Web Token Registry
      "https://chaerin.dev/jwt_claims/is_admin": true
  }
  ```

- **Private Claims**

  Private Claims are neither Registered nor Public. They are agreed upon between parties and typically represent custom information exchanged between servers and clients.

  ```
  {
      "username": "chaerin00"
  }
  ```

### 3. Signature

Header and Payload are Base64 encoded and can be decoded by anyone to view the contents. Therefore, the Signature exists to verify the integrity of the token and prevent tampering. To create the Signature, use the encoded Header, encoded Payload, a secret key, and the signing algorithm specified in the Header.

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

The example above illustrates how to create a Signature using the `HS256` HMAC SHA256 algorithm as specified in the Header.

Concatenating Header, Payload, and Signature with `.` forms the complete JWT token.

<hr/>

Exploring JWT tokens has helped me identify potential issues with the authentication logic I commonly use. I realize I need to further study topics such as where to store tokens and how Refresh Tokens work.
