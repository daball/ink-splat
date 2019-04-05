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
import { Text } from 'ink';
import { renderInk, renderState, renderJSDOM } from './renderers';
import Control from '../components/Control';

const props = [ { focused: 'focused' } ];
const controlInstance = new Control(props);
const controlFactory = React.createFactory(Control);
const controlComponent = controlFactory(props, [React.createElement(Text, [], 'test fixture')]);
const controlComponentJSX = <Control {...props}><Text>test fixture for JSX</Text></Control>;
// const controlJSDOM = new ReactJSDOM(controlComponent);
// const controlJSDOMJSX = new ReactJSDOM(controlComponent);
const controlRenderer = renderJSDOM(controlComponent);
const controlRendererJSX = renderJSDOM(controlComponentJSX);
const controlElement = renderInk(controlComponent);
const controlElementJSX = renderInk(controlComponentJSX);
const controlState = renderState(controlComponent);
const controlStateJSX = renderState(controlComponentJSX);
// const controlRenderStream = renderToStream(controlComponent);
// const controlRenderStreamJSX = renderToStream(controlComponent);

// test('mount a Control component into ink', () => {})

// test('mount a Control component into ink', () => {
    // is(true, React.isValidElement(ctl));
    console.log('controlInstance (using new Control(...props)) =', controlInstance);
    console.log('controlFactory (using React.createFactory(Control)) = ', controlFactory);
    console.log('controlComponentJSX (base for comparison, using <Control />) = ', controlComponentJSX);
    console.log('controlComponent (ideal use, using controlFactory(instance)) = ', controlComponent);
    // console.log('controlJSDOM (base for comparison, using ReactJSDOM.render(controlComponentJSX)) = ',controlJSDOM);
    // console.log('controlJSDOMJSX (base for comparison, using ReactJSDOM.render(controlComponentJSX)) = ',controlJSDOMJSX);
    console.log('controlRendererJSX (base for comparison, using ReactJSDOM.renderer(controlComponentJSX)) = ',controlRendererJSX);
    console.log('controlRenderer (ideal use, using ReactJSDOM.renderer(controlComponent)) = ',controlRenderer);
    console.log('controlElementJSX (base for comparison, using ReactJSDOM.render(controlComponentJSX)) = ',controlElementJSX);
    console.log('controlElement (ideal use, using ReactJSDOM.render(controlComponent)) = ',controlElement);
    console.log('controlState (base for comparison, using ReactJSDOM.render(controlComponentJSX)) = ',controlState);
    console.log('controlStateJSX (ideal use, using ReactJSDOM.render(controlComponent)) = ',controlStateJSX);
    // ReactDOM.;
// })