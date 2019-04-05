/**
 * 
 *  ██▓ ███▄    █  ██ ▄█▀     ██████  ██▓███   ██▓    ▄▄▄     ▄▄▄█████▓
 *  ▓██▒ ██ ▀█   █  ██▄█▒    ▒██    ▒ ▓██░  ██▒▓██▒   ▒████▄   ▓  ██▒ ▓▒
 *  ▒██▒▓██  ▀█ ██▒▓███▄░    ░ ▓██▄   ▓██░ ██▓▒▒██░   ▒██  ▀█▄ ▒ ▓██░ ▒░
 *  ░██░▓██▒  ▐▌██▒▓██ █▄      ▒   ██▒▒██▄█▓▒ ▒▒██░   ░██▄▄▄▄██░ ▓██▓ ░
 *  ░██░▒██░   ▓██░▒██▒ █▄   ▒██████▒▒▒██▒ ░  ░░██████▒▓█   ▓██▒ ▒██▒ ░
 *  ░▓  ░ ▒░   ▒ ▒ ▒ ▒▒ ▓▒   ▒ ▒▓▒ ▒ ░▒▓▒░ ░  ░░ ▒░▓  ░▒▒   ▓▒█░ ▒ ░░
 *  ▒ ░░ ░░   ░ ▒░░ ░▒ ▒░   ░ ░▒  ░ ░░▒ ░     ░ ░ ▒  ░ ▒   ▒▒ ░   ░
 *  ▒ ░   ░   ░ ░ ░ ░░ ░    ░  ░  ░  ░░         ░ ░    ░   ▒    ░
 *  ░           ░ ░  ░            ░               ░  ░     ░  ░
 * 
 * LICENSE: MIT
 */
import React from 'react';
import {
    isExactClass,
    isClassOrComponent
 } from './isClassOrComponent';

// eslint-disable-next-line react/prefer-stateless-function
class A extends React.Component { }

// eslint-disable-next-line no-unused-vars
class B extends A { }

// eslint-disable-next-line no-unused-vars
class C extends B { }

// eslint-disable-next-line react/prefer-stateless-function, react/no-multi-comp
class BlankComponent extends React.Component {}
// eslint-disable-next-line react/prefer-stateless-function, react/no-multi-comp
class BlankPureComponent extends React.PureComponent {}
const BlankStatelessComponent = (props) => (
  <div>
    Nothing to see here, except
    {props}
    .
  </div>
);

test('test isExactClass when used as intended', () => {
    expect(isExactClass(A, A)).toBe(true);
    expect(isExactClass(B, B)).toBe(true);
    expect(isExactClass(C, C)).toBe(true);
    expect(isExactClass(A, B)).toBe(false); 
    expect(isExactClass(A, C)).toBe(false); 
    expect(isExactClass(B, A)).toBe(false); 
    expect(isExactClass(B, C)).toBe(false); 
    expect(isExactClass(C, A)).toBe(false); 
    expect(isExactClass(C, B)).toBe(false); 
});

test('test isExactClass when used in unintended ways', () => {
    const fA = () => { return 'A'; };
    const fB = () => { return 'B'; };
    const s1 = '1';
    const s2 = '2';
    const bT = true;
    const bF = false;
    const n1 = 1;
    const n2 = 2;
    
    expect(isExactClass(fA, fA)).toBe(true);
    expect(isExactClass(fB, fB)).toBe(true);
    expect(isExactClass(fA, fB)).toBe(false);
    expect(isExactClass(fB, fA)).toBe(false);
    
    expect(isExactClass(s1, s1)).toBe(false);
    expect(isExactClass(s2, s2)).toBe(false);
    expect(isExactClass(s1, s2)).toBe(false);
    expect(isExactClass(s2, s1)).toBe(false);
    
    expect(isExactClass(bT, bT)).toBe(false);
    expect(isExactClass(bF, bF)).toBe(false);
    expect(isExactClass(bT, bF)).toBe(false);
    expect(isExactClass(bF, bT)).toBe(false);
    
    expect(isExactClass(n1, n1)).toBe(false);
    expect(isExactClass(n2, n2)).toBe(false);
    expect(isExactClass(n1, n2)).toBe(false);
    expect(isExactClass(n2, n1)).toBe(false);
});

test(`test isClassOrComponent on all types of React components`, () => {
    expect(isClassOrComponent(React.Component, A)).toBe(true);
    expect(isClassOrComponent(React.Component, B)).toBe(true);
    expect(isClassOrComponent(React.Component, C)).toBe(true);
    expect(isClassOrComponent(React.Component, BlankComponent)).toBe(true);
    expect(isClassOrComponent(React.Component, BlankPureComponent)).toBe(true);
    expect(isClassOrComponent(React.Component, BlankStatelessComponent)).toBe(false);
    expect(React.isValidElement(BlankStatelessComponent)).toBe(false);
    expect(React.isValidElement(BlankStatelessComponent())).toBe(true);
    expect(React.isValidElement(<BlankStatelessComponent />)).toBe(true);
});