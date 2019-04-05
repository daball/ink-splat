/* eslint-disable react/no-multi-comp */
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
import Control from './Control';

test(`Control.isReactComponent() identifies itself`, () => {
    const ctl = new Control();
    expect(Control.isReactComponent(Control)).toBeDefined();
    expect(Control.isReactComponent(Control)).toBe(true);
    expect(ctl).toBeDefined();
    expect(Control.isReactComponent(ctl)).toBe(true);
});

// eslint-disable-next-line react/prefer-stateless-function
class BlankComponent extends React.Component {}
// eslint-disable-next-line react/prefer-stateless-function
class BlankPureComponent extends React.PureComponent {}
const BlankStatelessComponent = (props) => (
  <div>
    Nothing to see here, except
    {props}
    .
  </div>
);

test(`Control.isReactComponent() identifies other types of React components`, () => {
    const ctl1 = new BlankComponent();
    const el1 = <BlankComponent />;
    expect(Control.isReactComponent(BlankComponent)).toBeDefined();
    expect(Control.isReactComponent(BlankComponent)).toBe(true);
    expect(ctl1).toBeDefined();
    expect(Control.isReactComponent(ctl1)).toBe(true);
    expect(el1).toBeDefined();
    expect(Control.isReactComponent(el1)).toBe(true);
    const ctl2 = new BlankPureComponent();
    const el2 = <BlankPureComponent />;
    expect(Control.isReactComponent(BlankPureComponent)).toBeDefined();
    expect(Control.isReactComponent(BlankPureComponent)).toBe(true);
    expect(ctl2).toBeDefined();
    expect(Control.isReactComponent(ctl2)).toBe(true);
    expect(el2).toBeDefined();
    expect(Control.isReactComponent(el2)).toBe(true);
    const el3 = <BlankStatelessComponent />;
    expect(Control.isReactComponent(BlankStatelessComponent)).toBeDefined();
    expect(Control.isReactComponent(BlankStatelessComponent)).toBe(true);
    expect(el3).toBeDefined();
    expect(Control.isReactComponent(el3)).toBe(true);
});

test(`Control.isControl() identifies it's own type`, () => {
    const ctl = new Control();
    expect(Control.isControl(Control)).toBeDefined();
    expect(Control.isControl(Control)).toBe(true);
    expect(ctl).toBeDefined();
    expect(Control.isControl(ctl)).toBe(true);
});

test(`Control.componentHasChildren() identifies it's own children`, () => {
    const child1 = new Control();
    const child2 = new Control();
    const child3 = new Control(); 
    const child4 = new Control(); 
    const child5 = new Control();
    const children = [child1, child2, child3, child4, child5];
    const ctl = new Control({children});
    expect(Control.isControl(Control)).toBeDefined();
    expect(Control.isControl(Control)).toBe(true);
    expect(ctl).toBeDefined();
    expect(Control.isControl(ctl)).toBe(true);

    expect(ctl.props).toBeDefined();
    expect(ctl.props.children).toBeDefined();
    expect(ctl.props.children.length).toBeDefined();
    expect(ctl.props.children.length).toBe(5);

    expect(Control.isReactComponent(ctl.props.children[0])).toBe(true);
    expect(Control.isReactComponent(ctl.props.children[1])).toBe(true);
    expect(Control.isReactComponent(ctl.props.children[2])).toBe(true);
    expect(Control.isReactComponent(ctl.props.children[3])).toBe(true);
    expect(Control.isReactComponent(ctl.props.children[4])).toBe(true);

    expect(Control.isControl(ctl.props.children[0])).toBe(true);
    expect(Control.isControl(ctl.props.children[1])).toBe(true);
    expect(Control.isControl(ctl.props.children[2])).toBe(true);
    expect(Control.isControl(ctl.props.children[3])).toBe(true);
    expect(Control.isControl(ctl.props.children[4])).toBe(true);

    expect(Control.componentHasChildren(ctl)).toBe(true);
});

test(`Control.firstFocusableControlOf() locates the first focusable Control in props.children`, () => {
   const child1 = new Control({ myId: 111});
   const child2 = new Control({ myId: 222});
   const child3 = new Control({ myId: 333}); 
   const child4 = new Control({ myId: 444}); 
   const child5 = new Control({ myId: 555});
   const children = [child1, child2, child3, child4, child5];
   const ctl = new Control({children});
   // try to get null
   let result = Control.firstFocusableControlOf(ctl);
   expect(result).toBe(null);
   // try to get left extent
   ctl.props.children[0].focusable = true;
   ctl.props.children[4].focusable = true;
   result = Control.firstFocusableControlOf(ctl);
   expect(Control.isControl(result)).toBe(true);
   expect(result.props.myId).toBe(111);
   // try to get right extent
   ctl.props.children[0].focusable = false;
   ctl.props.children[4].focusable = true;
   result = Control.firstFocusableControlOf(ctl);
   expect(Control.isControl(result)).toBe(true);
   expect(result.props.myId).toBe(555);
   // try to get one in the middle extent
   ctl.props.children[0].focusable = false;
   ctl.props.children[2].focusable = true;
   ctl.props.children[4].focusable = false;
   result = Control.firstFocusableControlOf(ctl);
   expect(Control.isControl(result)).toBe(true);
   expect(result.props.myId).toBe(333);
});

class TestComponent extends React.Component {
  render() {
    const { props } = this;
    return props.children;
  }
}

test(`Control.firstFocusableControlOf() locates the first focusable Control, where tree Control -> Component -> Control`, () => {
  const child1 = new Control({ myId: 111});
  const child2 = new Control({ myId: 222});
  const child3 = new Control({ myId: 333}); 
  const child4 = new Control({ myId: 444}); 
  const child5 = new Control({ myId: 555});

  const component1 = new TestComponent({ children: [child1], myId: 11});
  const component2 = new TestComponent({ children: [child2], myId: 22});
  const component3 = new TestComponent({ children: [child3], myId: 33}); 
  const component4 = new TestComponent({ children: [child4], myId: 44}); 
  const component5 = new TestComponent({ children: [child5], myId: 55});
  
  const children = [component1, component2, component3, component4, component5];
  const ctl = new Control({children});
  // try to get null
  let result = Control.firstFocusableControlOf(ctl);
  expect(result).toBe(null);
  // try to get left extent
  console.log(ctl.props.children[0]);
  ctl.props.children[0].props.children[0].focusable = true;
  ctl.props.children[4].props.children[0].focusable = true;
  result = Control.firstFocusableControlOf(ctl);
  expect(Control.isControl(result)).toBe(true);
  expect(result.props.myId).toBe(111);
  // try to get right extent
  ctl.props.children[0].props.children[0].focusable = false;
  ctl.props.children[4].props.children[0].focusable = true;
  result = Control.firstFocusableControlOf(ctl);
  expect(Control.isControl(result)).toBe(true);
  expect(result.props.myId).toBe(555);
  // try to get one in the middle extent
  ctl.props.children[0].props.children[0].focusable = false;
  ctl.props.children[2].props.children[0].focusable = true;
  ctl.props.children[4].props.children[0].focusable = false;
  result = Control.firstFocusableControlOf(ctl);
  expect(Control.isControl(result)).toBe(true);
  expect(result.props.myId).toBe(333);
});