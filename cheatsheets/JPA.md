
# JPA Full Form

## Full Form
JPA stands for **Java Persistence API**.

## Overview
JPA is a specification for accessing, persisting, and managing data between Java objects/classes and a relational database. It provides a standard approach for ORM (Object-Relational Mapping) in Java, allowing developers to work with database records using Java objects without needing to write complex SQL queries.

## Key Features
- **Annotations**: JPA uses annotations to map Java classes to database tables.
- **Entity Manager**: Provides an interface for performing CRUD (Create, Read, Update, Delete) operations on entities.
- **JPQL**: Java Persistence Query Language, a query language similar to SQL but operates on entity objects rather than tables.
- **Transaction Management**: JPA handles database transactions and ensures data integrity.

## Example Usage
```java
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String password;

    // Getters and setters
}
```

```java
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class UserService {
    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("my-persistence-unit");

    public void saveUser(User user) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
        em.close();
    }
}
```

JPA provides a robust and flexible way to handle database operations in Java applications, promoting clean and maintainable code.
```