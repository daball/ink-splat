/* eslint-disable react/jsx-one-expression-per-line */
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
import React, { Component } from 'react';
import { render, AppContext, Box, Color, Text } from 'ink';
import { TabBar, Tab, TextField } from '../components';

class FocusBlurApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
        focusedComponent: 'tabBar',
        name: '',
        newName: '',
        bio: '',
        newBio: ''
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(name) {
    // expanded: handleTabChange(name, activeTab) {
      this.setState({
      activeTabName: name
    });
  }
  
  render() {
    const app = this;
    const { state } = this;
    return (
      <AppContext.Consumer>
        {({ exit }) => (
          <Box flexDirection="column">
            <Text>Tab Selected: {state.activeTabName}</Text>
            <Text>Focused: {state.focusedComponent}</Text>
            {
              state.focusedComponent !=='tabBar'
              &&
              (<Text>Current Value: {state.focusedComponent==='txtName'&&state.name}{state.focusedComponent==='txtBio'&&state.bio}</Text>)
            }
            {
              state.focusedComponent !=='tabBar'
              &&
              (<Text>New Value: {state.focusedComponent==='txtName'&&state.newName}{state.focusedComponent==='txtBio'&&state.newBio}</Text>)
            }
            <TabBar
              onChange={this.handleTabChange}
              focused={state.focusedComponent==='tabBar'}
              onBlur={() => (
                (state.activeTabName === 'bio' && app.setState({focusedComponent: 'txtName'}))
                || (state.activeTabName === 'exit' && exit())
              )}
            >
              <Tab name="readme">Readme</Tab>
              <Tab name="bio">Bio</Tab>
              <Tab name="report">Report</Tab>
              <Tab name="exit">Exit</Tab>
            </TabBar>
            {
              state.activeTabName === 'readme'
              &&
              (
                <Box flexDirection="column" paddingBottom={1}>
                  <Text>So this app demonstates focusing and blurring controlled components.</Text>
                  <Text>Just check out these tabs.</Text>
                </Box>
              )
            }
            {
              state.activeTabName === 'report'
              &&
              (
                <Box flexDirection="column" paddingBottom={1}>
                  <Text>You are a pretty cool cat, {state.name}!</Text>
                  <Text>Just look at all this bio.</Text>
                  <Text>{state.bio}</Text>
                </Box>
              )
            }
            {
              state.activeTabName === 'bio'
              &&
              (
                <Box flexDirection="column">
                  <Box>
                    <TextField
                      value={app.state.name}
                      focused={state.focusedComponent==='txtName'}
                      caption={<Text bold><Color bgMagenta whiteBright>Your Name:</Color></Text>}
                      onChange={(newName) => app.setState({newName})}
                      onSubmit={(name) => app.setState({name})}
                      onBlur={() => app.setState({focusedComponent: 'txtBio'})}
                    />
                  </Box>
                  <Box>
                    <TextField
                      value={app.state.bio}
                      focused={state.focusedComponent==='txtBio'}
                      caption={<Text italic><Color bgBlue whiteBright>Your Bio:</Color></Text>}
                      onChange={(newBio) => app.setState({newBio})}
                      onSubmit={(bio) => app.setState({bio})}
                      onBlur={() => app.setState({focusedComponent: 'tabBar'})}
                    />
                  </Box>
                </Box>
              )
            }
          </Box>
        )}
      </AppContext.Consumer>
    );
  }
}

render(<FocusBlurApp />);