/* eslint-disable no-self-compare */
class A {}
class B extends A {}
class C extends B {}

console.log(C === C); // true
console.log('typeof C =', typeof C); // function
console.log(C.prototype instanceof C); // true
console.log(C.prototype instanceof B); // true
console.log(C.prototype instanceof A); // true

const Ci = new C();
console.log(Ci === Ci);
console.log('typeof Ci =', typeof Ci); // function
console.log(Ci instanceof C); // true
console.log(Ci instanceof B); // true
console.log(Ci instanceof A); // true