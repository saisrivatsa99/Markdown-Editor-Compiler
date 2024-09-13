# Design Patterns in Java

## Creational Patterns

### 1. Singleton
- **Intent**: Ensure a class has only one instance and provide a global point of access to it.
- **Applicability**: Use when there must be exactly one instance of a class, and it must be accessible from a well-known access point.
- **Consequences**: Controls access to the sole instance, reduces namespace clutter, permits refinement of operations and representation, and allows a variable number of instances.

```java
public class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

### 2. Factory Method
- **Intent**: Define an interface for creating an object, but let subclasses alter the type of objects that will be created.
- **Applicability**: Use when a class cannot anticipate the class of objects it must create or a class wants its subclasses to specify the objects it creates.
- **Consequences**: Provides hooks for subclasses, connects parallel class hierarchies, and can result in a proliferation of classes.

```java
interface Product {
    void use();
}

class ConcreteProduct implements Product {
    public void use() {
        System.out.println("Using ConcreteProduct");
    }
}

abstract class Creator {
    public abstract Product factoryMethod();
}

class ConcreteCreator extends Creator {
    public Product factoryMethod() {
        return new ConcreteProduct();
    }
}
```

### 3. Abstract Factory
- **Intent**: Provide an interface for creating families of related or dependent objects without specifying their concrete classes.
- **Applicability**: Use when a system should be independent of how its products are created or configured.
- **Consequences**: Isolates concrete classes, makes exchanging product families easy, promotes consistency among products, but makes it difficult to support new kinds of products.


```java
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

class WinFactory implements GUIFactory {
    public Button createButton() {
        return new WinButton();
    }
    public Checkbox createCheckbox() {
        return new WinCheckbox();
    }
}

class MacFactory implements GUIFactory {
    public Button createButton() {
        return new MacButton();
    }
    public Checkbox createCheckbox() {
        return new MacCheckbox();
    }
}
```

### 4. Builder
- **Intent**: Separate the construction of a complex object from its representation so that the same construction process can create different representations.
- **Applicability**: Use when the algorithm for creating a complex object should be independent of the parts that make up the object and how they are assembled.
- **Consequences**: Allows you to vary a product's internal representation, isolates code for construction and representation, and gives finer control over the construction process.

```java
class Product {
    private String part1;
    private String part2;

    public void setPart1(String part1) { this.part1 = part1; }
    public void setPart2(String part2) { this.part2 = part2; }
}

class Builder {
    private Product product = new Product();

    public Builder buildPart1(String part1) {
        product.setPart1(part1);
        return this;
    }

    public Builder buildPart2(String part2) {
        product.setPart2(part2);
        return this;
    }

    public Product build() {
        return product;
    }
}
```

### 5. Prototype
- **Intent**: Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype.
- **Applicability**: Use when the classes to instantiate are specified at runtime, or to avoid building a class hierarchy of factories.
- **Consequences**: Hides the concrete product classes from the client, allows adding and removing products at runtime, and can reduce subclassing.

```java
abstract class Prototype implements Cloneable {
    public Prototype clone() throws CloneNotSupportedException {
        return (Prototype) super.clone();
    }
}

class ConcretePrototype extends Prototype {
    private String field;

    public ConcretePrototype(String field) {
        this.field = field;
    }

    public String getField() {
        return field;
    }
}
```

## Structural Patterns

### 6. Adapter
- **Intent**: Convert the interface of a class into another interface clients expect. Adapter lets classes work together that couldn’t otherwise because of incompatible interfaces.
- **Applicability**: Use when you want to use an existing class, but its interface does not match the one you need.
- **Consequences**: Allows a single Adapter to work with many Adaptees, makes it easier to adapt Adaptees at runtime, and increases transparency of classes.

```java
interface Target {
    void request();
}

class Adaptee {
    public void specificRequest() {
        System.out.println("Specific request");
    }
}

class Adapter implements Target {
    private Adaptee adaptee;

    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    public void request() {
        adaptee.specificRequest();
    }
}
```

### 7. Bridge
- **Intent**: Decouple an abstraction from its implementation so that the two can vary independently.
- **Applicability**: Use when you want to avoid a permanent binding between an abstraction and its implementation, or when both the abstractions and their implementations should be extensible.
- **Consequences**: Decouples interface and implementation, improves extensibility, and hides implementation details from clients.

```java
interface Implementor {
    void operationImpl();
}

class ConcreteImplementorA implements Implementor {
    public void operationImpl() {
        System.out.println("ConcreteImplementorA operationImpl");
    }
}

class ConcreteImplementorB implements Implementor {
    public void operationImpl() {
        System.out.println("ConcreteImplementorB operationImpl");
    }
}

abstract class Abstraction {
    protected Implementor implementor;

    protected Abstraction(Implementor implementor) {
        this.implementor = implementor;
    }

    public abstract void operation();
}

class RefinedAbstraction extends Abstraction {
    protected RefinedAbstraction(Implementor implementor) {
        super(implementor);
    }

    public void operation() {
        implementor.operationImpl();
    }
}
```

### 8. Composite
- **Intent**: Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly.
- **Applicability**: Use when you want to represent part-whole hierarchies of objects.
- **Consequences**: Simplifies client code, makes it easier to add new kinds of components, and makes it harder to restrict the components of a composite.

```java
interface Component {
    void operation();
}

class Leaf implements Component {
    public void operation() {
        System.out.println("Leaf operation");
    }
}

class Composite implements Component {
    private List<Component> children = new ArrayList<>();

    public void add(Component component) {
        children.add(component);
    }

    public void remove(Component component) {
        children.remove(component);
    }

    public void operation() {
        for (Component component : children) {
            component.operation();
        }
    }
}
```

### 9. Decorator
- **Intent**: Attach additional responsibilities to an object dynamically. Decorators provide a flexible alternative to subclassing for extending functionality.
- **Applicability**: Use to add responsibilities to individual objects dynamically and transparently, and for responsibilities that can be withdrawn.
- **Consequences**: More flexibility than static inheritance, avoids feature-laden classes high up in the hierarchy, and lots of little objects.

```java
interface Component {
    void operation();
}

class ConcreteComponent implements Component {
    public void operation() {
        System.out.println("ConcreteComponent operation");
    }
}

abstract class Decorator implements Component {
    protected Component component;

    public Decorator(Component component) {
        this.component = component;
    }

    public void operation() {
        component.operation();
    }
}

class ConcreteDecorator extends Decorator {
    public ConcreteDecorator(Component component) {
        super(component);
    }

    public void operation() {
        super.operation();
        addedBehavior();
    }

    private void addedBehavior() {
        System.out.println("ConcreteDecorator added behavior");
    }
}
```

### 10. Facade
- **Intent**: Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.
- **Applicability**: Use to provide a simple interface to a complex subsystem.
- **Consequences**: Shields clients from subsystem components, promotes weak coupling between subsystem and its clients, and reduces compilation dependencies.

```java
class SubsystemA {
    public void operationA() {
        System.out.println("SubsystemA operationA");
    }
}

class SubsystemB {
    public void operationB() {
        System.out.println("SubsystemB operationB");
    }
}

class Facade {
    private SubsystemA subsystemA = new SubsystemA();
    private SubsystemB subsystemB = new SubsystemB();

    public void operation() {
        subsystemA.operationA();
        subsystemB.operationB();
    }
}
```

### 11. Flyweight
- **Intent**: Use sharing to support large numbers of fine-grained objects efficiently.
- **Applicability**: Use when a large number of objects must be created that have a significant memory overhead.
- **Consequences**: Reduces the number of objects, reduces memory usage, and can increase complexity.

```java
interface Flyweight {
    void operation(String extrinsicState);
}

class ConcreteFlyweight implements Flyweight {
    private String intrinsicState;

    public ConcreteFlyweight(String intrinsicState) {
        this.intrinsicState = intrinsicState;
    }

    public void operation(String extrinsicState) {
        System.out.println("IntrinsicState: " + intrinsicState + ", ExtrinsicState: " + extrinsicState);
    }
}

class FlyweightFactory {
    private Map<String, Flyweight> flyweights = new HashMap<>();

    public Flyweight getFlyweight(String key) {
        if (!flyweights.containsKey(key)) {
            flyweights.put(key, new ConcreteFlyweight(key));
        }
        return flyweights.get(key);
    }
}
```

### 12. Proxy
- **Intent**: Provide a surrogate or placeholder for another object to control access to it.
- **Applicability**: Use when you need a more versatile or sophisticated reference to an object.
- **Consequences**: Controls access to the real subject, can introduce a level of indirection, and can add functionality.

```java
interface Subject {
    void request();
}

class RealSubject implements Subject {
    public void request() {
        System.out.println("RealSubject request");
    }
}

class Proxy implements Subject {
    private RealSubject realSubject;

    public Proxy(RealSubject realSubject) {
        this.realSubject = realSubject;
    }

    public void request() {
        System.out.println("Proxy request");
        realSubject.request();
    }
}
```

## Behavioral Patterns

### 13. Chain of Responsibility
- **Intent**: Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.
- **Applicability**: Use when more than one object may handle a request, and the handler is not known a priori.
- **Consequences**: Reduces coupling, adds flexibility in assigning responsibilities to objects, and receives a request implicitly.

```java
abstract class Handler {
    protected Handler successor;

    public void setSuccessor(Handler successor) {
        this.successor = successor;
    }

    public abstract void handleRequest(int request);
}

class ConcreteHandler1 extends Handler {
    public void handleRequest(int request) {
        if (request < 10) {
            System.out.println("ConcreteHandler1 handled request " + request);
        } else if (successor != null) {
            successor.handleRequest(request);
        }
    }
}

class ConcreteHandler2 extends Handler {
    public void handleRequest(int request) {
        if (request >= 10 && request < 20) {
            System.out.println("ConcreteHandler2 handled request " + request);
        } else if (successor != null) {
            successor.handleRequest(request);
        }
    }
}
```

### 14. Command
- **Intent**: Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.
- **Applicability**: Use to parameterize objects with operations, delay operations, or queue operations.
- **Consequences**: Decouples the object that invokes the operation from the one that knows how to perform it, and makes it easier to add new commands.

```java
interface Command {
    void execute();
}

class ConcreteCommand implements Command {
    private Receiver receiver;

    public ConcreteCommand(Receiver receiver) {
        this.receiver = receiver;
    }

    public void execute() {
        receiver.action();
    }
}

class Receiver {
    public void action() {
        System.out.println("Receiver action");
    }
}

class Invoker {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void executeCommand() {
        command.execute();
    }
}
```

### 15. Interpreter
- **Intent**: Given a language, define a representation for its grammar along with an interpreter that uses the representation to interpret sentences in the language.
- **Applicability**: Use for languages and applications where you can represent sentences in a language as abstract syntax trees.
- **Consequences**: Makes it easier to change and extend the grammar, can require a large number of classes, and can be less efficient.

```java
interface Expression {
    boolean

 interpret(String context);
}

class TerminalExpression implements Expression {
    private String data;

    public TerminalExpression(String data) {
        this.data = data;
    }

    public boolean interpret(String context) {
        return context.contains(data);
    }
}

class OrExpression implements Expression {
    private Expression expr1;
    private Expression expr2;

    public OrExpression(Expression expr1, Expression expr2) {
        this.expr1 = expr1;
        this.expr2 = expr2;
    }

    public boolean interpret(String context) {
        return expr1.interpret(context) || expr2.interpret(context);
    }
}
```

### 16. Iterator
- **Intent**: Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.
- **Applicability**: Use to access aggregate objects without exposing their internal representation.
- **Consequences**: Supports variations in the traversal of a collection, simplifies the interface of the aggregate, and adds a layer of abstraction.

```java
interface Iterator {
    boolean hasNext();
    Object next();
}

class ConcreteIterator implements Iterator {
    private List<Object> list;
    private int position;

    public ConcreteIterator(List<Object> list) {
        this.list = list;
        this.position = 0;
    }

    public boolean hasNext() {
        return position < list.size();
    }

    public Object next() {
        if (this.hasNext()) {
            return list.get(position++);
        }
        return null;
    }
}

interface Aggregate {
    Iterator createIterator();
}

class ConcreteAggregate implements Aggregate {
    private List<Object> list = new ArrayList<>();

    public void add(Object obj) {
        list.add(obj);
    }

    public Iterator createIterator() {
        return new ConcreteIterator(list);
    }
}
```

### 17. Mediator
- **Intent**: Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.
- **Applicability**: Use to control and coordinate complex interaction between a set of objects.
- **Consequences**: Promotes loose coupling, centralizes control, and can make the Mediator complex.

```java
interface Mediator {
    void send(String message, Colleague colleague);
}

abstract class Colleague {
    protected Mediator mediator;

    public Colleague(Mediator mediator) {
        this.mediator = mediator;
    }

    public abstract void receive(String message);
}

class ConcreteColleague1 extends Colleague {
    public ConcreteColleague1(Mediator mediator) {
        super(mediator);
    }

    public void receive(String message) {
        System.out.println("ConcreteColleague1 received: " + message);
    }
}

class ConcreteColleague2 extends Colleague {
    public ConcreteColleague2(Mediator mediator) {
        super(mediator);
    }

    public void receive(String message) {
        System.out.println("ConcreteColleague2 received: " + message);
    }
}

class ConcreteMediator implements Mediator {
    private ConcreteColleague1 colleague1;
    private ConcreteColleague2 colleague2;

    public void setColleague1(ConcreteColleague1 colleague1) {
        this.colleague1 = colleague1;
    }

    public void setColleague2(ConcreteColleague2 colleague2) {
        this.colleague2 = colleague2;
    }

    public void send(String message, Colleague colleague) {
        if (colleague == colleague1) {
            colleague2.receive(message);
        } else {
            colleague1.receive(message);
        }
    }
}
```

### 18. Memento
- **Intent**: Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.
- **Applicability**: Use to save and restore the state of an object.
- **Consequences**: Preserves encapsulation boundaries, simplifies originator, and may result in high memory usage.

```java
class Memento {
    private String state;

    public Memento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
}

class Originator {
    private String state;

    public void setState(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public Memento saveStateToMemento() {
        return new Memento(state);
    }

    public void getStateFromMemento(Memento memento) {
        state = memento.getState();
    }
}

class Caretaker {
    private List<Memento> mementoList = new ArrayList<>();

    public void add(Memento state) {
        mementoList.add(state);
    }

    public Memento get(int index) {
        return mementoList.get(index);
    }
}
```

### 19. Observer
- **Intent**: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.
- **Applicability**: Use to maintain consistency across related objects without making classes tightly coupled.
- **Consequences**: Abstract coupling between Subject and Observer, support for broadcast communication, and unexpected updates.

```java
interface Observer {
    void update(String state);
}

class ConcreteObserver implements Observer {
    private String name;

    public ConcreteObserver(String name) {
        this.name = name;
    }

    public void update(String state) {
        System.out.println(name + " received update: " + state);
    }
}

interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers();
}

class ConcreteSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String state;

    public void setState(String state) {
        this.state = state;
        notifyObservers();
    }

    public void attach(Observer observer) {
        observers.add(observer);
    }

    public void detach(Observer observer) {
        observers.remove(observer);
    }

    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(state);
        }
    }
}
```

### 20. State
- **Intent**: Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.
- **Applicability**: Use when an object's behavior depends on its state, and it must change its behavior at runtime depending on that state.
- **Consequences**: Localizes state-specific behavior, makes state transitions explicit, and can result in lots of classes.

```java
interface State {
    void handle(Context context);
}

class ConcreteStateA implements State {
    public void handle(Context context) {
        System.out.println("State A handling context");
        context.setState(new ConcreteStateB());
    }
}

class ConcreteStateB implements State {
    public void handle(Context context) {
        System.out.println("State B handling context");
        context.setState(new ConcreteStateA());
    }
}

class Context {
    private State state;

    public Context(State state) {
        this.state = state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public void request() {
        state.handle(this);
    }
}
```

### 21. Strategy
- **Intent**: Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.
- **Applicability**: Use to implement different variations of an algorithm.
- **Consequences**: Families of related algorithms, avoid complex conditional statements, and clients must be aware of different Strategies.

```java
interface Strategy {
    int doOperation(int num1, int num2);
}

class OperationAdd implements Strategy {
    public int doOperation(int num1, int num2) {
        return num1 + num2;
    }
}

class OperationSubtract implements Strategy {
    public int doOperation(int num1, int num2) {
        return num1 - num2;
    }
}

class Context {
    private Strategy strategy;

    public Context(Strategy strategy) {
        this.strategy = strategy;
    }

    public int executeStrategy(int num1, int num2) {
        return strategy.doOperation(num1, num2);
    }
}
```

### 22. Template Method
- **Intent**: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
- **Applicability**: Use to implement the invariant parts of an algorithm once and allow subclasses to implement the behavior that can vary.
- **Consequences**: Code reuse, inversion of control, and potential for a less readable code base.

```java
abstract class Game {
    abstract void initialize();
    abstract void startPlay();
    abstract void endPlay();

    public final void play() {
        initialize();
        startPlay();
        endPlay();
    }
}

class Cricket extends Game {
    void initialize() {
        System.out.println("Cricket Game Initialized!");
    }

    void startPlay() {
        System.out.println("Cricket Game Started!");
    }

    void endPlay() {
        System.out.println("Cricket Game Finished!");
    }
}

class Football extends Game {
    void initialize() {
        System.out.println("Football Game Initialized!");
    }

    void startPlay() {
        System.out.println("Football Game Started!");
    }

    void endPlay() {
        System.out.println("Football Game Finished!");
    }
}
```

### 23. Visitor
- **Intent**: Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.
- **Applicability**: Use when you need to perform an operation on objects of an object structure and you need to define a new operation without changing the classes.
- **Consequences**: Makes adding new operations easy, gathers related operations and separates unrelated ones, and makes adding new ConcreteElement classes hard.

```java
interface ComputerPartVisitor {
    void visit(Keyboard keyboard);
    void visit(Monitor monitor);
}

interface ComputerPart {
    void accept(ComputerPartVisitor visitor);
}

class Keyboard implements ComputerPart {
    public void accept(ComputerPartVisitor visitor) {
        visitor.visit(this);
    }
}

class Monitor implements ComputerPart {
    public void accept(ComputerPartVisitor visitor) {
        visitor.visit(this);
    }
}

class ComputerPartDisplayVisitor implements ComputerPartVisitor {
    public void visit(Keyboard keyboard) {
        System.out.println("Displaying Keyboard.");
    }

    public void visit(Monitor monitor) {
        System.out.println("Displaying Monitor.");
    }
}
```