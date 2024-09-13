# SOLID Principles

## Single Responsibility Principle (SRP)
- A class should have only one reason to change.
- Each class should encapsulate only one responsibility.
- Separation of concerns is key to maintainability and readability.
- Example: A class that handles both data storage and user interface updates violates SRP. Separate into two classes: one for data storage and another for UI updates.

## Open/Closed Principle (OCP)
- Software entities should be open for extension but closed for modification.
- Existing code should not be modified to add new functionality.
- Use inheritance, composition, and abstraction to achieve this.
- Example: Instead of modifying existing code to add new payment methods, create an interface for payments and implement new payment methods without modifying existing code.

## Liskov Substitution Principle (LSP)
- Subtypes must be substitutable for their base types without altering the correctness of the program.
- Objects of a superclass should be replaceable with objects of its subclasses without affecting functionality.
- Follows the "is-a" relationship in inheritance.
- Example: If a function accepts a base class object, it should work correctly with any subclass object without causing errors.

## Interface Segregation Principle (ISP)
- Clients should not be forced to depend on interfaces they don't use.
- Interface should be specific to the needs of the client.
- Avoid fat interfaces with unnecessary methods.
- Example: Instead of having a single large interface for a printer that includes methods for printing, scanning, and faxing, split it into smaller interfaces for each functionality.

## Dependency Inversion Principle (DIP)
- High-level modules should not depend on low-level modules. Both should depend on abstractions.
- Abstractions should not depend on details. Details should depend on abstractions.
- Decouples modules and promotes flexibility.
- Example: Instead of having a high-level module directly depend on a specific database implementation, use an interface and dependency injection to decouple the module from the database implementation.
