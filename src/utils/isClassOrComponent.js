import React from 'react';
// import Window from 'window';
// import renderJSDOM from '../tests/renderers/jsdomRenderer';

// const window = new Window();

/**
 * Returns a boolean which indicates that the provided `classA` matches
 * the provided `refClass` and is `true` only when the following conditions
 * are met:
 * 
 * (1) `refClass` is a type (function), and
 * (2) `classA` is that exact same type (function).
 * 
 * It is an equality test that returns true for any
 * `refClass === classA` if and only if `refClass` and `classA` are
 * functions, as `class A {}` transpiles to a function declaration.
 * 
 * @param {*} refClass The reference class (function).
 * @param {*} classA The actual class (function).
 * @returns `true` when `refClass === classA` and both are functions,
 * `false` otherwise.
 */
const isExactClass = (refClass, classA) =>
    (
        typeof refClass === 'function'
        &&
        typeof classA === 'function'
    )
    &&
    (
        refClass === classA
    );

/**
 * Returns a boolean which indicates if the provided `derivedClassB` matches
 * the following true when the following two conditions are met:
 * `refClass` is a type and `derivedClassB` is a type extended from `refClass`.
 * 
 * @param {*} refClass The reference class (function).
 * @param {*} derivedClassB The actual derived class (function).
 * @returns `true` when `derivedClassB.prototype instanceof refBaseClass` and both are functions,
 * `false` otherwise.
 */
const isDerivedClass = (refBaseClass, derivedClassB) =>
    (
        typeof refBaseClass === 'function'
        &&
        typeof derivedClassB === 'function'
    )
    &&
    (
        derivedClassB.prototype instanceof refBaseClass
    );

/**
 * Returns a boolean which indicates that the provided `inst` matches
 * is an instance of the provided `refClass` class and is `true` only
 * when the following conditions are met:
 * 
 * (1) `refClass` is a type (function), and
 * (2) `inst` is an object which an instance of `refClass`
 * 
 * It is an equality test that returns true for any
 * `refClass === classA` if and only if `refClass` and `classA` are
 * functions, as `class A {}` transpiles to a function declaration.
 * 
 * @param {*} refClass The reference class (function).
 * @param {*} classA The actual class (function).
 * @returns `true` when `refClass === classA` and both are functions,
 * `false` otherwise.
 */
const isInstanceOf = (refClass, inst) =>
(
    typeof refClass === 'function'
    &&
    typeof inst === 'object'
)
&&
(
    inst instanceof refClass
);

/**
 * Returns a boolean which indicates that the provided `componentA` component
 * is a React Component as created by `React.createElement()` instantiated using
 * the  `refClass` type and is `true` only when the following conditions
 * are met:
 * 
 * (1) `refClass` is a type (function), and
 * (2) `componentA` is created using `React.createElement(refClass)`
 * 
 * @param {*} refClass The reference class (function).
 * @param {*} componentA The actual component (object).
 * @returns `true` when `refClass === classA` and both are functions,
 * `false` otherwise.
 */
const isExactComponent = (refClass, componentA) =>
(
    typeof refClass === 'function'
    &&
    typeof componentA === 'object'
)
&&
(
    React.isValidElement(componentA)
)
&&
(
    isExactClass(refClass, componentA.type)
);

/**
 * Returns a boolean which indicates that the provided `derivedComponentB` component
 * is a React Component as created by `React.createElement()` instantiated using
 * the `refBaseClass` base type and is `true` only when the following conditions
 * are met:
 * 
 * (1) `refBaseClass` is a type (function), and
 * (2) `refBaseClass` has been extended to a secondary class, such as `class B extends A {}`
 * (3) `derivedComponentB` is created using `React.createElement(B)`
 * (4) You are interested in seeing if this Component element is of type derived from `A`
 * 
 * @param {*} refBaseClass The reference base class (function).
 * @param {*} componentA The actual component (object).
 * @returns `true` when `refClass === classA` and both are functions,
 * `false` otherwise.
 */
const isDerivedComponent = (refBaseClass, derivedComponentB) =>
(
    typeof refBaseClass === 'function'
    &&
    typeof derivedComponentB === 'object'
)
&&
(
    React.isValidElement(derivedComponentB)
)
&&
(
    isDerivedClass(refBaseClass, derivedComponentB.type)
);

/**
 * Returns a boolean which indicates if the provided anyInst matches any
 * of the following conditions (given class A extends React.Component {...}
 * and class B extends class A {...}):
 * 
 * (1) a reference to refClass (A === A),
 * 
 * (2) an instance of refClass (new A()),
 * 
 * (3) a React Element provided refClass as the type (React.createElement(A))
 * 
 * TODO: (4) a DOM Node which has been rendered with a React Element, type refClass
 * 
 * (5) a reference to a derived class (B === A whereas class B extends A {...})
 * 
 * (6) an instance of a derived class (new B() given class B extends A {...})
 * 
 * (7) a React Element with a derived class as the type (React.createElement(B))
 * 
 * TODO: (8) a DOM Node which has been rendered with a React Element, type derived refClass
 * 
 * @param {*} refClass The reference type as defined in a class declaration.
 * @param {*} inst Anything really, but mostly instances of things.
 * @returns A boolean indicating whether inst is a reference to refClass, a reference to
 * a class derived from refClass, an instance of refClass, an instance of a derived class,
 * or a React Element of type refClass, or a React Element of a derived refClass,
 * or a mounted DOM Node.
 */
const isClassOrComponent = (refClass, anyInst) =>
    // condition 1
    isExactClass(refClass, anyInst) ||
    // condition 5
    isDerivedClass(refClass, anyInst) ||
    // condition 2 and condition 6
    isInstanceOf(refClass, anyInst) ||
    // condition 3
    isExactComponent(refClass, anyInst) ||
    // condition 7
    isDerivedComponent(refClass, anyInst);
    // condition 4
    // TODO: isClassOrComponent condition 4 detection
    // condition 8
    // TODO: isClassOrComponent condition 8 detection

/**
 * Returns a function in the format `(anyInst) => boolean` which returns a boolean
 * which indicates if the provided `anyInst` matches any of the following conditions
 * (given `class A extends React.Component {...}` and `class B extends class A {...}`),
 * where A refers to the type provided in `refClass`:
 * 
 * (1) a reference to `refClass` (`A === A`),
 * 
 * (2) an instance of `refClass` (`new A()`),
 * 
 * (3) a React Element provided `refClass` as the type (`React.createElement(A)`)
 * 
 * TODO: (4) a DOM Node which has been rendered with a React Element, type `refClass`
 * 
 * (5) a reference to a derived class (`B === A` whereas `class B extends A {...}`)
 * 
 * (6) an instance of a derived class (`new B()` given `class B extends A {...}`)
 * 
 * (7) a React Element with a derived class as the type (`React.createElement(B)`)
 * 
 * TODO: (8) a DOM Node which has been rendered with a React Element, type derived from `refClass`
 * 
 * @param {*} refClass The reference type as defined in a class declaration.
 * @returns A function of the type `(anyInst) => boolean` which returns a boolean
 * indicating whether `inst` is a reference to `refClass`, a reference to a class derived
 * from `refClass`, an instance of `refClass`, an instance of a derived class,
 * or a React Element of type `refClass`, or a React Element of a derived `refClass`,
 * or a mounted DOM Node of `refClass` or a derived `refClass`.
 */
const isClassOrComponentFactory = (refClass) =>
    (inst) => isClassOrComponent(refClass, inst);

export {
    isExactClass,
    isDerivedClass,
    isInstanceOf,
    isExactComponent,
    isDerivedComponent,
    isClassOrComponent,
    isClassOrComponentFactory
};