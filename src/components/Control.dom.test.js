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
import { cleanupInk, renderInk } from '../tests/renderers';
import Control from './Control';

test(`render a default Control containing text as a child`, () => {
    const tree = (
      <Control>
        Hello, ink-splat Control!
      </Control>
    );
    const inked = renderInk(tree);
    const { lastFrame } = inked;
    const textOutput = lastFrame();
    const textExpected = 'Hello, ink-splat Control!';
    expect(textOutput).toBe(textExpected);
    // console.log('inked=',inked);
    cleanupInk();
});

// test('test onFocus prop for a rendered Control by simulating the focus() call from a parent', async () => {
//     const onFocus = () => {
//     };
//     const tree = (
//       <Control
//         onFocus={onFocus}
//       >
//         Hello, ink-splat Control!
//       </Control>
//     );
//     const inked = renderInk(tree);
//     console.log(tree);
//     const { lastFrame } = inked;
//     const textOutput = lastFrame();
//     const textExpected = 'Hello, ink-splat Control!';
//     expect(textOutput).toBe(textExpected);
//     // console.log('inked=',inked);
//     cleanupInk();
// });