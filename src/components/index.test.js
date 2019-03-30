// import React from 'react';
// import { cleanupInk, renderInk } from '../tests/renderers';
import {
    Control,
    ContainerControl,
    Form,
    Tab,
    TabBar,
    TextField
} from '.';

test(`Control component is available in components/index.js`, () => {
    expect(ContainerControl).toBeDefined();
    expect(typeof Control).toBe('function');
    expect(Control.isControl).toBeDefined();
    expect(Control.isControl(Control)).toBe(true);
    expect(Control.isControl(new Control())).toBe(true);
});

test(`ContainerControl component is available in components/index.js`, () => {
    expect(ContainerControl).toBeDefined();
    expect(typeof ContainerControl).toBe('function');
    expect(ContainerControl.isControl).toBeDefined();
    expect(ContainerControl.isControl(Control)).toBe(true);
    expect(ContainerControl.isControl(ContainerControl)).toBe(true);
    expect(Control.isControl(new ContainerControl())).toBe(true);
    expect(ContainerControl.isContainerControl).toBeDefined();
    expect(ContainerControl.isContainerControl(Control)).toBe(false);
    expect(ContainerControl.isContainerControl(ContainerControl)).toBe(true);
    expect(ContainerControl.isContainerControl(new ContainerControl())).toBe(true);
});

test(`Form component is available in components/index.js`, () => {
    expect(Form).toBeDefined();
    expect(typeof Form).toBe('function');
    expect(Form.isControl).toBeDefined();
    expect(Form.isControl(Control)).toBe(true);
    expect(Form.isControl(ContainerControl)).toBe(true);
    expect(Form.isControl(Form)).toBe(true);
    expect(Form.isContainerControl).toBeDefined();
    expect(Form.isContainerControl(Control)).toBe(false);
    expect(Form.isContainerControl(ContainerControl)).toBe(true);
    expect(Form.isContainerControl(Form)).toBe(true);
    expect(Form.isForm).toBeDefined();
    expect(Form.isForm(Control)).toBe(false);
    expect(Form.isForm(ContainerControl)).toBe(false);
    expect(Form.isForm(Form)).toBe(true);
    expect(ContainerControl.isContainerControl(Form)).toBe(true);
    expect(Control.isControl(Form)).toBe(true);
    expect(Control.isControl(new Form())).toBe(true);
    expect(ContainerControl.isContainerControl(new Form())).toBe(true);
    expect(Form.isForm(new Form())).toBe(true);
});

test(`TabBar component is available in components/index.js`, () => {
    expect(Tab).toBeDefined();
    expect(typeof Tab).toBe('function');
});

test(`TabBar component is available in components/index.js`, () => {
    expect(TabBar).toBeDefined();
    expect(typeof TabBar).toBe('function');
    expect(TabBar.isControl).toBeDefined();
    expect(TabBar.isControl(TabBar)).toBe(true);
    expect(TabBar.isContainerControl).toBeUndefined();
    expect(Control.isControl(TabBar)).toBe(true);
    expect(ContainerControl.isContainerControl(TabBar)).toBe(false);
    expect(Form.isForm(TabBar)).toBe(false);
});

test(`TextField component is available in components/index.js`, () => {
    expect(TextField).toBeDefined();
    expect(typeof TextField).toBe('function');
    expect(TextField.isControl).toBeDefined();
    expect(TextField.isControl(TextField)).toBe(true);
    expect(TextField.isContainerControl).toBeUndefined();
    expect(Control.isControl(TextField)).toBe(true);
    expect(ContainerControl.isContainerControl(TextField)).toBe(false);
    expect(Form.isForm(TextField)).toBe(false);
});
