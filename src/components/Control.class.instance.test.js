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
 import Control from './Control';

test(`initial state of a default (non-focusable) Control instance with no props`, () => {
    const ctl = new Control();
    const { props } = ctl;
    expect(ctl).toBeDefined();
    expect(Control.isControl(ctl)).toBe(true);
    expect(props).toBeUndefined();
    expect(ctl.isFocused()).toBe(false);
    expect(ctl.isBlurred()).toBe(true);
    expect(ctl.containsFocus()).toBe(false);
    expect(ctl.canFocus()).toBe(false);
    expect(ctl.canBlur()).toBe(false);
    expect(ctl.isEnabled()).toBe(true);
    expect(ctl.isDisabled()).toBe(false);
    expect(ctl.hasChildren()).toBe(false);
});

test(`initial state of a focusable Control instance given property: focused = 'focused'`, () => {
    const ctl = new Control({focused: 'focused'})
    ctl.focusable = true;
    const { props } = ctl;
    expect(ctl).toBeDefined();
    expect(Control.isControl(ctl)).toBe(true);
    expect(props).toBeDefined();
    expect(typeof props).toBe('object');
    expect(props.focused).toBeDefined();
    expect(props.focused).toBe('focused');
    expect(props.disabled).toBeUndefined();
    expect(props.children).toBeUndefined();
    expect(ctl.isFocused()).toBe(true);
    expect(ctl.isBlurred()).toBe(false);
    expect(ctl.containsFocus()).toBe(true);
    expect(ctl.canFocus()).toBe(false); // despite having 'focus' it isn't a focusable component
    expect(ctl.canBlur()).toBe(true);
    expect(ctl.isEnabled()).toBe(true);
    expect(ctl.isDisabled()).toBe(false);
    expect(ctl.hasChildren()).toBe(false);
});

test(`initial state of a focusable Control instance given property: disabled = 'disabled'`, () => {
    const ctl = new Control({disabled: 'disabled'});
    ctl.focusable = true;
    const { props } = ctl;
    expect(ctl).toBeDefined();
    expect(Control.isControl(ctl)).toBe(true);
    expect(props).toBeDefined();
    expect(typeof props).toBe('object');
    expect(props.disabled).toBeDefined();
    expect(props.disabled).toBe('disabled');
    expect(props.focused).toBeUndefined();
    expect(props.children).toBeUndefined();
    expect(ctl.isFocused()).toBe(false);
    expect(ctl.isBlurred()).toBe(true);
    expect(ctl.containsFocus()).toBe(false);
    expect(ctl.canFocus()).toBe(false);
    expect(ctl.canBlur()).toBe(false);
    expect(ctl.isEnabled()).toBe(false);
    expect(ctl.isDisabled()).toBe(true);
    expect(ctl.hasChildren()).toBe(false);
});

// this is, in theory, an improbable circumstance, but could occur in a stateful control
test(`initial state of a default Control instance with 3 focusable child Control instances: (1) default, (2) focused, (3) disabled`, () => {
    const child1 = new Control();
    const child2 = new Control({focused: 'focused'});
    const child3 = new Control({disabled: 'disabled'});
    child1.focusable = true;
    child2.focusable = true;
    child3.focusable = true;
    const children = [child1, child2, child3];
    const ctl = new Control({children});
    const { props } = ctl;
    // parent expected to be:
    expect(props).toBeDefined();
    expect(typeof props).toBe('object');
    expect(props.focused).toBeUndefined();
    expect(props.disabled).toBeUndefined();
    expect(props.children).toBeDefined();
    expect(typeof props.children).toBe('object');
    expect(props.children.length).toBeDefined();
    expect(props.children.length).toBe(3);
    expect(ctl.isFocusable()).toBe(false);
    expect(ctl.isFocused()).toBe(false);
    expect(ctl.isBlurred()).toBe(true);
    expect(ctl.containsFocus()).toBe(true);
    expect(ctl.canFocus()).toBe(true);
    expect(ctl.canBlur()).toBe(false);
    expect(ctl.isEnabled()).toBe(true);
    expect(ctl.isDisabled()).toBe(false);
    expect(ctl.hasChildren()).toBe(true);
    // child 0 expected to be:
    expect(props.children[0]).toBeDefined();
    expect(props.children[0].props).toBeUndefined();
    expect(Control.isControl(props.children[0])).toBe(true);
    expect(props.children[0].props).toBeUndefined();
    expect(props.children[0].isFocused()).toBe(false);
    expect(props.children[0].isBlurred()).toBe(true);
    expect(props.children[0].containsFocus()).toBe(false);
    expect(props.children[0].canFocus()).toBe(true);
    expect(props.children[0].canBlur()).toBe(false);
    expect(props.children[0].isEnabled()).toBe(true);
    expect(props.children[0].isDisabled()).toBe(false);
    expect(props.children[0].hasChildren()).toBe(false);
    // child 1 expected to be:
    expect(props.children[1]).toBeDefined();
    expect(Control.isControl(props.children[1])).toBe(true);
    expect(props.children[1].props).toBeDefined();
    expect(typeof props.children[1].props).toBe('object');
    expect(props.children[1].props.focused).toBeDefined();
    expect(props.children[1].props.focused).toBe('focused');
    expect(props.children[1].props.disabled).toBeUndefined();
    expect(props.children[1].props.children).toBeUndefined();
    expect(props.children[1].isFocused()).toBe(true);
    expect(props.children[1].isBlurred()).toBe(false);
    expect(props.children[1].containsFocus()).toBe(true);
    expect(props.children[1].canFocus()).toBe(false);
    expect(props.children[1].canBlur()).toBe(true);
    expect(props.children[1].isEnabled()).toBe(true);
    expect(props.children[1].isDisabled()).toBe(false);
    expect(props.children[1].hasChildren()).toBe(false);
    // child 2 expected to be:
    expect(props.children[2]).toBeDefined();
    expect(props.children[2].props).toBeDefined();
    expect(Control.isControl(props.children[2])).toBe(true);
    expect(typeof props.children[2].props).toBe('object');
    expect(props.children[2].props.focused).toBeUndefined();
    expect(props.children[2].props.disabled).toBeDefined();
    expect(props.children[2].props.disabled).toBe('disabled');
    expect(props.children[2].props.children).toBeUndefined();
    expect(props.children[2].isFocused()).toBe(false);
    expect(props.children[2].isBlurred()).toBe(true);
    expect(props.children[2].containsFocus()).toBe(false);
    expect(props.children[2].canFocus()).toBe(false);
    expect(props.children[2].canBlur()).toBe(false);
    expect(props.children[2].isEnabled()).toBe(false);
    expect(props.children[2].isDisabled()).toBe(true);
    expect(props.children[2].hasChildren()).toBe(false);
});

// this is, in theory, the way it ought to operate, with focus being passed down to
// it's child component from the parent
test(`initial state of a focused Control instance with 3 child Control instances: (1) default, (2) focused, (3) disabled`, () => {
    const child1 = new Control();
    const child2 = new Control({focused: 'focused'});
    const child3 = new Control({disabled: 'disabled'});
    const children = [child1, child2, child3];
    const ctl = new Control({focused: 'focused', children});
    child1.focusable = true;
    child2.focusable = true;
    child3.focusable = true;
    ctl.focusable = true;
    const { props } = ctl;
    // parent expected to be:
    expect(props).toBeDefined();
    expect(typeof props).toBe('object');
    expect(props.focused).toBeDefined();
    expect(props.focused).toBe('focused');
    expect(props.disabled).toBeUndefined();
    expect(props.children).toBeDefined();
    expect(typeof props.children).toBe('object');
    expect(props.children.length).toBeDefined();
    expect(props.children.length).toBe(3);
    expect(ctl.isFocusable()).toBe(true);
    expect(ctl.isFocused()).toBe(true);
    expect(ctl.isBlurred()).toBe(false);
    expect(ctl.containsFocus()).toBe(true);
    expect(ctl.canFocus()).toBe(false); // is already focused, so no
    expect(ctl.canBlur()).toBe(true);
    expect(ctl.isEnabled()).toBe(true);
    expect(ctl.isDisabled()).toBe(false);
    expect(ctl.hasChildren()).toBe(true);
    // child 0 expected to be:
    expect(props.children[0]).toBeDefined();
    expect(props.children[0].props).toBeUndefined();
    expect(Control.isControl(props.children[0])).toBe(true);
    expect(props.children[0].props).toBeUndefined();
    expect(props.children[0].isFocused()).toBe(false);
    expect(props.children[0].isBlurred()).toBe(true);
    expect(props.children[0].containsFocus()).toBe(false);
    expect(props.children[0].canFocus()).toBe(true);
    expect(props.children[0].canBlur()).toBe(false);
    expect(props.children[0].isEnabled()).toBe(true);
    expect(props.children[0].isDisabled()).toBe(false);
    expect(props.children[0].hasChildren()).toBe(false);
    // child 1 expected to be:
    expect(props.children[1]).toBeDefined();
    expect(Control.isControl(props.children[1])).toBe(true);
    expect(props.children[1].props).toBeDefined();
    expect(typeof props.children[1].props).toBe('object');
    expect(props.children[1].props.focused).toBeDefined();
    expect(props.children[1].props.focused).toBe('focused');
    expect(props.children[1].props.disabled).toBeUndefined();
    expect(props.children[1].props.children).toBeUndefined();
    expect(props.children[1].isFocused()).toBe(true);
    expect(props.children[1].isBlurred()).toBe(false);
    expect(props.children[1].containsFocus()).toBe(true);
    expect(props.children[1].canFocus()).toBe(false);
    expect(props.children[1].canBlur()).toBe(true);
    expect(props.children[1].isEnabled()).toBe(true);
    expect(props.children[1].isDisabled()).toBe(false);
    expect(props.children[1].hasChildren()).toBe(false);
    // child 2 expected to be:
    expect(props.children[2]).toBeDefined();
    expect(props.children[2].props).toBeDefined();
    expect(typeof props.children[2].props).toBe('object');
    expect(Control.isControl(props.children[2])).toBe(true);
    expect(props.children[2].props.focused).toBeUndefined();
    expect(props.children[2].props.disabled).toBeDefined();
    expect(props.children[2].props.disabled).toBe('disabled');
    expect(props.children[2].props.children).toBeUndefined();
    expect(props.children[2].isFocused()).toBe(false);
    expect(props.children[2].isBlurred()).toBe(true);
    expect(props.children[2].containsFocus()).toBe(false);
    expect(props.children[2].canFocus()).toBe(false);
    expect(props.children[2].canBlur()).toBe(false);
    expect(props.children[2].isEnabled()).toBe(false);
    expect(props.children[2].isDisabled()).toBe(true);
    expect(props.children[2].hasChildren()).toBe(false);
});
