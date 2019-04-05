/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
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
// import { Component } from 'react';
// import { isClassOrComponentFactory } from '../utils/isClassOrComponent';

/**
 * // TODO: Integrate this concept into Control, using `wrapComponent`
 * // as the property.
 * 
 * ComponentWrapper is a control component which is proposed to wrap an existing
 * React Component in order to make it compatible with the Control class. Pass
 * the wrapped component as `props.component`. ComponentWrapper controls
 * won't be able to be focused but will allow its children to be focused if they
 * are focusable Controls.
 * 
 * It isn't something you'll have to use outright, as the Control's renderChild()
 * method will actually wrap up a Component for you. In this way, you will be
 * able to nest non-control components and control components and expect that
 * top-most control components will work correctly when searching the control
 * component heirarchy.
 */
export default class ComponentWrapper extends Control {
    // TODO: Consider making Sequence into a ContainerControl if there is any purpose for
    // ContainerControl after completing all the Control requirements.    
    // constructor(props) {
    //     super(props);
    // }
    
    render() {
        const { props, hasChildren } = this;
        const outputs = [];
        if (props && props.component && Control.isReactComponent(props.component)) {
            outputs.push(props.component);
        }
        if (hasChildren()) {
            outputs.concat(props.children);
        }
        if (outputs.length === 0) return null;
        if (outputs.length === 1) return outputs[0];
        return (
          <Control>{outputs}</Control>
        );
    }
}