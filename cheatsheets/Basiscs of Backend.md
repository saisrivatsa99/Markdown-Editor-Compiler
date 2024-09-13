# Fundamentals of Backend Programming

## HTTP Basics

### HTTP Methods
- **GET**: Retrieve data from the server.
- **POST**: Send data to the server to create a resource.
- **PUT**: Update an existing resource on the server.
- **DELETE**: Remove a resource from the server.
- **PATCH**: Apply partial modifications to a resource.
- **HEAD**: Retrieve metadata of a resource (headers without body).
- **OPTIONS**: Describe the communication options for the target resource.

### HTTP Status Codes
- **1xx Informational**:
  - `100 Continue`: Server received the initial part of the request and the client should continue.
  - `101 Switching Protocols`: Switching to the protocol requested by the client.
- **2xx Success**:
  - `200 OK`: The request succeeded.
  - `201 Created`: The request succeeded and a new resource was created.
  - `204 No Content`: The request succeeded but there is no content to send in the response.
- **3xx Redirection**:
  - `301 Moved Permanently`: The resource has been moved to a new URL permanently.
  - `302 Found`: The resource is temporarily located at a different URL.
  - `304 Not Modified`: The resource has not been modified since the last request.
- **4xx Client Errors**:
  - `400 Bad Request`: The server could not understand the request due to invalid syntax.
  - `401 Unauthorized`: Authentication is required and has failed or has not been provided.
  - `403 Forbidden`: The client does not have access rights to the content.
  - `404 Not Found`: The server can not find the requested resource.
  - `409 Conflict`: The request conflicts with the current state of the server.
- **5xx Server Errors**:
  - `500 Internal Server Error`: The server has encountered a situation it doesn't know how to handle.
  - `502 Bad Gateway`: The server was acting as a gateway and received an invalid response.
  - `503 Service Unavailable`: The server is not ready to handle the request.

## Response Methods
- **JSON (JavaScript Object Notation)**:
  - Common format for sending and receiving data between a client and a server.
  - Example:
    ```json
    {
      "status": "success",
      "data": {
        "id": 1,
        "name": "John Doe"
      }
    }
    ```
- **XML (eXtensible Markup Language)**:
  - Another format for data interchange, though less common than JSON in modern applications.
  - Example:
    ```xml
    <response>
      <status>success</status>
      <data>
        <id>1</id>
        <name>John Doe</name>
      </data>
    </response>
    ```

## Authentication Methods

### Basic Authentication
- **Description**: Transmits credentials as `username:password` encoded in Base64.
- **Example**:
  `
  Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
  `

### Token-Based Authentication
- **Bearer Token**:
  - Tokens are passed in the `Authorization` header.
  - Example:
    `
    Authorization: Bearer your_token_here
    `

- **JSON Web Tokens (JWT)**:
  - Tokens contain encoded JSON objects.
  - Example:
    `
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
    `

### OAuth 2.0
- **Description**: Authorization framework enabling third-party applications to obtain limited access to a user's resources.
- **Flow**:
  1. **Authorization Code Grant**: Most common flow, used by web and mobile apps.
  2. **Implicit Grant**: Simplified flow, used by client-side apps.
  3. **Resource Owner Password Credentials Grant**: Used when the user trusts the client app.
  4. **Client Credentials Grant**: Used for machine-to-machine authentication.

### Multi-Factor Authentication (MFA)
- **Description**: Requires multiple verification methods, increasing security.
- **Methods**:
  - SMS or Email Code
  - Authenticator Apps (e.g., Google Authenticator)
  - Biometric Verification (e.g., fingerprints, facial recognition)

## Data Storage
- **Relational Databases**: Use tables to store data with predefined schemas (e.g., MySQL, PostgreSQL).
- **NoSQL Databases**: Store data in various formats without fixed schemas (e.g., MongoDB, Redis).

### Common Operations
- **CRUD Operations**:
  - **Create**: Insert new records into a database.
  - **Read**: Retrieve records from a database.
  - **Update**: Modify existing records in a database.
  - **Delete**: Remove records from a database.

## Security Practices
- **Encryption**: Use SSL/TLS to encrypt data in transit.
- **Hashing**: Hash passwords using algorithms like bcrypt before storing them in the database.
- **Input Validation**: Validate and sanitize user inputs to prevent SQL injection, XSS, and other attacks.
- **Rate Limiting**: Limit the number of requests a user can make to protect against DDoS attacks.

## Common Tools and Frameworks
- **Backend Frameworks**:
  - Node.js (with Express.js)
  - Django (Python)
  - Ruby on Rails (Ruby)
  - Spring Boot (Java)

- **API Documentation**:
  - Swagger/OpenAPI
  - Postman

- **Version Control**:
  - Git (GitHub, GitLab, Bitbucket)

## REST vs GraphQL
- **REST (Representational State Transfer)**:
  - Uses standard HTTP methods.
  - Endpoints represent resources.
  - Example: `GET /users/1`

- **GraphQL**:
  - Allows clients to request specific data.
  - Single endpoint for queries and mutations.
  - Example:
    ```graphql
    {
      user(id: 1) {
        name
        email
      }
    }
    ```


# Cross-Site Request Forgery (CSRF)

## What is CSRF?

Cross-Site Request Forgery (CSRF) is a type of security vulnerability that allows an attacker to perform unauthorized actions on behalf of a user without their knowledge. This attack exploits the trust a web application has in a user's browser, using the user's credentials to execute unwanted actions.

## How CSRF Works

1. **Victim Authentication**:
   - The victim logs into a web application (e.g., a banking website) and establishes an authenticated session.

2. **Attacker's Setup**:
   - The attacker creates a malicious website or email containing a hidden request to the web application.

3. **Triggering the Request**:
   - The victim visits the malicious website while still logged into the web application.
   - The malicious website automatically sends a forged request to the web application using the victim's session cookies.

4. **Execution of the Request**:
   - The web application, trusting the user's authenticated session, executes the request as if it were initiated by the user.

### Example Scenario

- **Banking Website**: `https://bank.com`
- **Malicious Website**: `http://attacker.com`

**Victim Logs In**:
- The victim logs into `https://bank.com` and has an authenticated session.

**Malicious Action**:
- The attacker hosts a form on `http://attacker.com` that sends a request to `https://bank.com/transfer`:
  ```html
  <form action="https://bank.com/transfer" method="POST">
    <input type="hidden" name="account" value="attacker_account">
    <input type="hidden" name="amount" value="1000">
  </form>
  <script>
    document.forms[0].submit();
  </script>
  ```

**Victim Visits Malicious Website**:
- The victim visits `http://attacker.com` while still logged into `https://bank.com`.
- The hidden form automatically submits, transferring money from the victim's account to the attacker's account.

## Preventing CSRF

### CSRF Tokens

- **Description**: Unique tokens are generated and included in forms and requests. The server validates these tokens to ensure the request is legitimate.
- **Implementation**:
  - **Server-Side**: Generate a CSRF token and include it in the session or user context.
  - **Client-Side**: Include the CSRF token in every form submission or AJAX request.
  - **Validation**: The server checks the token's validity for each request.

  ```html
  <!-- Example HTML form with CSRF token -->
  <form action="/transfer" method="POST">
    <input type="hidden" name="csrf_token" value="unique_csrf_token">
    <input type="text" name="account">
    <input type="text" name="amount">
    <button type="submit">Transfer</button>
  </form>
  ```

### SameSite Cookie Attribute

- **Description**: The `SameSite` attribute on cookies restricts how cookies are sent with cross-site requests, reducing CSRF risk.
- **Implementation**:
  - **Strict**: Cookies are only sent with same-site requests.
  - **Lax**: Cookies are sent with same-site requests and top-level navigation GET requests.

  `
  Set-Cookie: sessionid=abc123; SameSite=Strict
  `

### Additional Measures

- **Referer Header Validation**: Verify the `Referer` header to ensure the request originated from the same site.
- **Custom Headers**: Require custom headers for state-changing requests (e.g., `X-Requested-With: XMLHttpRequest`).
- **Double Submit Cookies**: Send the CSRF token as both a cookie and a request parameter, then validate them on the server.

## Conclusion

CSRF is a serious vulnerability that can lead to unauthorized actions being performed on behalf of users. Implementing preventive measures such as CSRF tokens, the SameSite cookie attribute, and additional header checks can help protect web applications from CSRF attacks.
