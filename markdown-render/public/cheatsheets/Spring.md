package by layers/ seperation of concerns
- models
	- User
	- Task
	- Notet
- Repositories
	- UserRepo
	- TaskRepo
	- NoteRepo
- Controllers
	- UserController
	- TaskController
	- NotesController
- services
	-UserService
	-TaskService
	-NotesService

for smaller and older projects we use this



package by features/ seperation by domain
- users
	-user
	-UserRepo
	-UserService
	-UserController
- tasks
	-Task
	-TaskRepo
	-TaskService
	-TaskController
- notes
	-Notes
	-NotesRepo
	-NotesService
	-NotesController
	
For newer projects we use this as it is easier to split the project  into microservices
https://medium.com/sahibinden-technology/package-by-layer-vs-package-by-feature-7e89cde2ae3a
https://phauer.com/2020/package-by-feature/

Difference between DTO and model :
DTO is generally the object that will travel over the api. The model itself can also be the DTO in some cases.
Sometimes the DTO might have some wrapper interface also so as to add metadata or any other information that might be needed.

models and data are POJO (Plain Old Java Object) - since they are only used for encapsulation and do not have any functions running on them


DTO - data transfer object

Serialization and deserialization in Java are mechanisms used for converting objects to a format that can be easily stored or transmitted, and then reconstructing those objects from that format.

### Serialization

Serialization is the process of converting an object into a byte stream, which can then be easily saved to a file, sent over a network, or stored in a database. In Java, this is typically done using the `java.io.Serializable` interface.

To serialize an object, the following steps are usually taken:

1. Implementing Serializable: The class of the object must implement the `Serializable` interface. This is a marker interface, meaning it does not contain any methods but indicates that the class can be serialized. 
2. Creating an Output Stream: An `ObjectOutputStream` is used to write the object to an `OutputStream` (such as a `FileOutputStream`).
3. Writing the Object: The `writeObject()` method of `ObjectOutputStream` is used to serialize the object.

Example:
```java
import java.io.*;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;  // Recommended for version control
    String name;
    int age;

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class SerializeExample {
    public static void main(String[] args) {
        Person person = new Person("John Doe", 30);

        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("person.ser"))) {
            out.writeObject(person);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### Deserialization

Deserialization is the process of reconstructing the object from a byte stream. This involves reading the byte stream and converting it back into an object.

To deserialize an object, the following steps are usually taken:

1. Creating an Input Stream: An `ObjectInputStream` is used to read the object from an `InputStream` (such as a `FileInputStream`).
2. Reading the Object: The `readObject()` method of `ObjectInputStream` is used to deserialize the object.

Example:
```java
import java.io.*;

public class DeserializeExample {
    public static void main(String[] args) {
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("person.ser"))) {
            Person person = (Person) in.readObject();
            System.out.println("Name: " + person.name);
            System.out.println("Age: " + person.age);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
```

### Why Serialization and Deserialization are Needed and Used

1. Persistence: Serialization allows objects to be persisted (saved to disk) so they can be restored later. This is useful for saving the state of an application, caching, or maintaining user sessions.
2. Communication: In distributed systems, objects need to be sent over a network. Serialization enables objects to be converted into a format that can be transmitted over a network and then reconstructed on the receiving end.
3. Deep Cloning: Serialization can be used to create deep copies of objects. By serializing and then deserializing an object, a new instance with the same state can be created.
4. Interoperability: Serialized objects can be exchanged between different JVMs or different versions of the same application, facilitating interoperability.

### Key Considerations

- Security: Deserialization of untrusted data can lead to security vulnerabilities, such as remote code execution. It’s important to validate and sanitize data before deserializing.
- Versioning: Changes to class structure (adding/removing fields) can affect serialization. Using `serialVersionUID` helps maintain version control.
- Performance: Serialization and deserialization can be resource-intensive, so their use should be optimized as needed.

Serialization and deserialization are powerful features in Java that provide a flexible way to handle object persistence and communication, making them integral to many applications.

Spring has internal support for serialization and deserialization using JACKSON. Alternatives : GSON, Moshi





REST (Representational State Transfer) APIs are a set of rules and conventions for building and interacting with web services. Here’s a concise but detailed explanation:

### What is a REST API?

A REST API is an architectural style for designing networked applications. It uses standard HTTP methods and is stateless, meaning each request from a client to a server must contain all the information the server needs to fulfill that request.

### Key Characteristics:

1. Stateless: Each request is independent and contains all the necessary information, so the server doesn't store any client context between requests.
2. Client-Server Architecture: The client and server are separate entities, allowing them to evolve independently.
3. Uniform Interface: REST APIs use standard methods (GET, POST, PUT, DELETE) and conventions for URIs to interact with resources.
4. Resources and Representations: Resources (e.g., users, orders) are identified by URIs. Clients interact with these resources by using representations (e.g., JSON, XML).
5. Layered System: The architecture can have multiple layers, such as security, load balancing, or caching layers, without affecting the client-server interaction.
6. Cacheable: Responses can be marked as cacheable to improve performance by reducing the need for repeated requests.


REST -> nouns, verbs
nouns -> resources or entities
verbs -> actions for the HTTP method


### HTTP Methods and CRUD Operations:

- GET: Retrieve a resource.
- POST: Create a new resource.
- PUT: Update an existing resource.
- DELETE: Remove a resource.

### Example:

Consider a REST API for managing books in a library:

- GET /books: Retrieve a list of all books.
- GET /books/1: Retrieve details of the book with ID 1.
- POST /books: Add a new book.
- PUT /books/1: Update the book with ID 1.
- DELETE /books/1: Delete the book with ID 1.

### Benefits:

- Simplicity: Uses standard HTTP methods and status codes.
- Scalability: Statelessness and client-server separation enhance scalability.
- Interoperability: JSON or XML representations make it easy for different systems to communicate.

In summary, REST APIs provide a standardized way for clients and servers to communicate over the web using simple HTTP methods, making them widely used for web services and application integration.

REST APIs are used for CRUD based information systems. 
|--------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
|        | /users                                                                                                | /users/23                                                                                                                              |
|--------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| GET    | get all users                                                                                         | get user whose id is 23                                                                                                                |
|		 |	/users?name=Arnav : fetch users with name Arnav														 | 														  																				  |
|		 |	/users?minAge=20 : fetch users with age > 20														 | 														  																				  |
|--------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| POST   | create a new user  																					 | ---NA---																																  |
|		 | request must contain a new user object                                                                |																																		  |			
|		 | NOTE: Server will generate id of new object 					                                         |                                                                                                                                        |
|--------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| PUT    | ---NA---                                                                                              | create a new user with id =23  																										  |
|		 |																										 | overwrite if a user already exists with the id  																						  |
|		 |																										 | NOTE: only if server lets client set id of new objects  																				  |
|--------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| PATCH  | ---NA---                                                                                              | update the fields of user with id =23   																								  |
|		 | 																										 | fields which are supplied in request body are merged to existing object                        										  |
|--------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| DELETE | ---NA---                                                                                              | Delete user with id =23                                                                                                                |
|--------|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|

PUT vs PATCH 
---------------------------------
PUT 
old 			new
{A:10, B:20}  	{B:10, C: 20}
result : {B:10, C: 20}
---------------------------------
PATCH 
old 			new
{A:10, B:20}  	{B:10, C: 20}
result : {A:10, B:10, C: 20}

NOTE: PATCH *may* not work if no existing object
varies from API to API
---------------------------------




DEPENDENCY INJECTION


# Dependency Injection in Java and Spring Boot

## Overview
Dependency Injection (DI) is a design pattern used to implement IoC (Inversion of Control), allowing the creation of dependent objects outside of a class and providing those objects to the class. DI helps in creating loosely coupled and easily testable code.

## Types of Dependency Injection
1. **Constructor Injection**: Dependencies are provided through a class constructor.
2. **Setter Injection**: Dependencies are provided through setter methods.
3. **Field Injection**: Dependencies are directly injected into fields.

## Dependency Injection in Java

### Constructor Injection

```java
public class Service {
    private Repository repository;

    public Service(Repository repository) {
        this.repository = repository;
    }

    // Other methods
}

public class Repository {
    // Repository implementation
}

// Using the classes
Repository repo = new Repository();
Service service = new Service(repo);
```

### Setter Injection

```java
public class Service {
    private Repository repository;

    public void setRepository(Repository repository) {
        this.repository = repository;
    }

    // Other methods
}

// Using the classes
Repository repo = new Repository();
Service service = new Service();
service.setRepository(repo);
```

### Field Injection (Not recommended for plain Java due to lack of immutability)

```java
public class Service {
    @Autowired
    private Repository repository;

    // Other methods
}

public class Repository {
    // Repository implementation
}

// In Spring, the context would automatically inject the repository
```

## Dependency Injection in Spring Boot

Spring Boot simplifies dependency injection with annotations.

### Constructor Injection (Recommended)

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyService {
    private final MyRepository myRepository;

    @Autowired
    public MyService(MyRepository myRepository) {
        this.myRepository = myRepository;
    }

    // Other methods
}

import org.springframework.stereotype.Repository;

@Repository
public class MyRepository {
    // Repository implementation
}
```

### Setter Injection

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyService {
    private MyRepository myRepository;

    @Autowired
    public void setMyRepository(MyRepository myRepository) {
        this.myRepository = myRepository;
    }

    // Other methods
}

import org.springframework.stereotype.Repository;

@Repository
public class MyRepository {
    // Repository implementation
}
```

### Field Injection (Not recommended for production code)

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyService {
    @Autowired
    private MyRepository myRepository;

    // Other methods
}

import org.springframework.stereotype.Repository;

@Repository
public class MyRepository {
    // Repository implementation
}
```

### Configuration with Spring Boot

1. **Main Application Class**

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

2. **Using Components**

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {
    private final MyService myService;

    @Autowired
    public MyController(MyService myService) {
        this.myService = myService;
    }

    @GetMapping("/hello")
    public String hello() {
        return myService.greet();
    }
}
```

3. **Service Implementation**

```java
import org.springframework.stereotype.Service;

@Service
public class MyService {
    private final MyRepository myRepository;

    @Autowired
    public MyService(MyRepository myRepository) {
        this.myRepository = myRepository;
    }

    public String greet() {
        return "Hello, World!";
    }
}
```

4. **Repository Implementation**

```java
import org.springframework.stereotype.Repository;

@Repository
public class MyRepository {
    // Repository logic
}
```

## Advantages of Dependency Injection
- **Loose Coupling**: Reduces the dependency between components.
- **Improved Testability**: Makes it easier to inject mock dependencies for testing.
- **Flexibility**: Easily switch between different implementations of a dependency.

## Conclusion
Dependency Injection is a powerful design pattern that promotes loose coupling and enhances the modularity and testability of your code. Spring Boot provides extensive support for DI through annotations, making it easier to manage dependencies in your applications.
