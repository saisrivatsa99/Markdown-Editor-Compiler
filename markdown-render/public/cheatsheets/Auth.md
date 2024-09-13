# Identification vs Authentication vs Authorization

## Identification
Identification is the process of claiming an identity. It is how a user asserts who they are.

- **Purpose**: To state who the user is.
- **Examples**:
  - Username
  - User ID
  - Email address

## Authentication
Authentication is the process of verifying the claimed identity. It ensures that the user is who they claim to be.

- **Purpose**: To confirm the user's identity.
- **Examples**:
  - Passwords
  - PINs
  - Biometric verification (fingerprints, facial recognition)
  - Two-factor authentication (2FA)

## Authorization
Authorization is the process of granting or denying access to resources based on the authenticated identity. It determines what actions a user is permitted to perform.

- **Purpose**: To control access to resources.
- **Examples**:
  - Access control lists (ACLs)
  - Role-based access control (RBAC)
  - Permissions (read, write, execute)

## Summary
- **Identification**: "Who are you?"
- **Authentication**: "Prove it."
- **Authorization**: "What can you do?"

By understanding these three concepts, organizations can better secure their systems and ensure that users have appropriate access to resources.




Here's an explanation of tokens and the difference between JWT and Bearer tokens in markdown format:

# Tokens

Tokens are a type of security credential used to identify and authenticate users or services, and to authorize their access to resources. They are often used in web and mobile applications to manage user sessions.

## Types of Tokens

### 1. JWT (JSON Web Token)
JSON Web Token (JWT) is a compact, URL-safe token format used for securely transmitting information between parties as a JSON object.

- **Structure**: JWT consists of three parts separated by dots:
  1. **Header**: Contains the type of token and the signing algorithm used.
  2. **Payload**: Contains the claims, which are statements about an entity (typically, the user) and additional metadata.
  3. **Signature**: Ensures that the token has not been altered. It is created by encoding the header and payload, and then signing them using a secret key or a public/private key pair.

- **Usage**: Commonly used for authentication and information exchange.
- **Example**:
  ```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c```

### 2. Bearer Token
Bearer tokens are a type of access token that allows the bearer (the holder of the token) to access a resource.

- **Structure**: Bearer tokens are usually opaque strings, meaning their content is not meant to be interpreted by clients or users.
- **Usage**: Typically used in OAuth 2.0 for granting access to resources.
- **Example**:
  ```
  Authorization: Bearer <token>
  ```

## Differences between JWT and Bearer Tokens

| Aspect             | JWT                                              | Bearer Token                                     |
|--------------------|--------------------------------------------------|--------------------------------------------------|
| **Format**         | JSON object, URL-safe, and self-contained        | Opaque string                                    |
| **Structure**      | Three parts: Header, Payload, Signature          | Single string                                    |
| **Readability**    | Human-readable (base64-encoded JSON)             | Not human-readable                               |
| **Validation**     | Can be validated locally by decoding             | Validation typically requires checking with the  |
|                    | and verifying the signature 						|  server 										   |
| **Information**    | Can contain claims (user data and metadata)      | Does not inherently contain user information     |
| **Usage**          | Used for both authentication and information     | Mainly used for authentication                   |
|					 | exchange 										|                    							   |
| **Security**       | Signature ensures token integrity                | Relies on secure transmission and storage        |
| **Self-contained** | Yes, contains all the necessary information      | No, relies on server-side validation             |

Understanding these differences helps in choosing the right type of token for specific use cases in authentication and authorization processes.



CSRF : https://securityzines.com/zines/csrf.html


Spring Security Tutorial: https://www.toptal.com/spring/spring-security-tutorial


