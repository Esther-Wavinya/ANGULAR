//TypeScript
/**
 *Superset of JavaSript (it has all the features of Js + more)
 *We write TS during development but the browser still runa JS
 *Provides zero speed or performance benefits
 *The goal of Typescript is to help you catch errors in your code editor instead of while your app is running
 */











//Basic types
/*
any
number
string
boolean
null
undefined
 */





//TYPE INFERENCE
/**
 * Typescript is smart, it can figure out things for us
 * If we initialize and assign a variable on a single line, Typescript will try to figure out the type of variable for us
 * We rely on this behaviour extremely frequently except in a couple of corner cases
 */





//WHY TYPES
/**
 * Typescript knows about the different properties and methods that every type has
 * If we refer to properties or methods that don't exist on a value, it will display an error
 */











//INTERFACES
/**
 * 
 */








//CLASSES AND PROPERTIES
/**
 * creating a class and creating an instance of it
 * assigning methods to a class and calling them
 * Use a  constructor function to assign an instance of class
 * 
 */






//PUBLIC AND PRIVATE KEYWORDS
/**
 * 
 */






//DECORATORS
/**
 * A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, *property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that *will be called at runtime with information about the decorated declaration.
 * Called when the file first gets executed, not when an instance of the class is created
 * Can be applied to a class, a property, a method, an ancestor ot an argument of a method
 * Receives different arguments depending on where it gets used
 * Can be a plain decorator or a decorator factory
 * Used to mess around with the internals of the class in clever ways
 * Super, super complicated, not really worth our time to go further at the moment
 * 
 * 
 * 
 * 
 * For example, given the decorator @sealed we might write the sealed function as follows:

function sealed(target) {
  // do something with 'target' ...
}





Decorator Factories
If we want to customize how a decorator is applied to a declaration, we can write a decorator factory. A Decorator Factory is simply a function that returns the expression that will be called by the decorator at runtime.

We can write a decorator factory in the following fashion:

function color(value: string) {
  // this is the decorator factory, it sets up
  // the returned decorator function
  return function (target) {
    // this is the decorator
    // do something with 'target' and 'value'...
  };
}





Generic Classes
Classes, much like interfaces, can be generic. When a generic class is instantiated with new, its type parameters are inferred the same way as in a function call:

class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}
 
const b = new Box("hello!");
     
const b: Box<string>




ublic
The default visibility of class members is public. A public member can be accessed anywhere:

class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();






private
private is like protected, but doesn’t allow access to the member even from subclasses:

class Base {
  private x = 0;
}
const b = new Base();
// Can't access from outside the class
console.log(b.x);
Property 'x' is private and only accessible within class 'Base'.










Constructors
Background Reading:
Constructor (MDN)
Class constructors are very similar to functions. You can add parameters with type annotations, default values, and overloads:

class Point {
  x: number;
  y: number;
 
  // Normal signature with defaults
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
class Point {
  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}
There are just a few differences between class constructor signatures and function signatures:

Constructors can’t have type parameters - these belong on the outer class declaration, which we’ll learn about later
Constructors can’t have return type annotations - the class instance type is always what’s returned







Methods
Background Reading:
Method definitions
A function property on a class is called a method. Methods can use all the same type annotations as functions and constructors:

class Point {
  x = 10;
  y = 10;
 
  scale(n: number): void {
    this.x *= n;
    this.y *= n;
  }
}
Other than the standard type annotations, TypeScript doesn’t add anything else new to methods.

Note that inside a method body, it is still mandatory to access fields and other methods via this.. An unqualified name in a method body will always refer to something in the enclosing scope:

let x: number = 0;
 
class C {
  x: string = "hello";
 
  m() {
    // This is trying to modify 'x' from line 1, not the class property
    x = "world";
Type 'string' is not assignable to type 'number'.
  }
}

 */
