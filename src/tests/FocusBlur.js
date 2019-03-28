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

  handleTabChange(name, activeTab) {
    this.setState({
      activeTabName: name,
    });
  }
  
  blurOn(keyName) {
  }
    
  focusOn(keyName) {
      
  }

    render() {
        let app = this;
        return (
          <AppContext.Consumer>
            {({ exit }) => (
              <Box flexDirection="column">
                    <Text>Tab Selected: {this.state.activeTabName}</Text>
                    <Text>Focused: {this.state.focusedComponent}</Text>
                    {
                      this.state.focusedComponent !=='tabBar' &&
                        <Text>Current Value: {this.state.focusedComponent==='txtName'&&this.state.name}{this.state.focusedComponent==='txtBio'&&this.state.bio}</Text>
                    }
                    {
                      this.state.focusedComponent !=='tabBar' &&
                        <Text>New Value: {this.state.focusedComponent==='txtName'&&this.state.newName}{this.state.focusedComponent==='txtBio'&&this.state.newBio}</Text>
                    }
                    <TabBar
                      onChange={this.handleTabChange}
                      focused={this.state.focusedComponent==='tabBar'}
                      onBlur={() => (
                        (this.state.activeTabName === 'bio' && app.setState({focusedComponent: 'txtName'}))
                        || (this.state.activeTabName === 'exit' && exit())
                      )}
                      >
                      <Tab name="readme">Readme</Tab>
                      <Tab name="bio">Bio</Tab>
                      <Tab name="report">Report</Tab>
                      <Tab name="exit">Exit</Tab>
                    </TabBar>
                    {this.state.activeTabName === 'readme' &&
                      <Box flexDirection="column" paddingBottom={1}>
                        <Text>So this app demonstates focusing and blurring controlled components.</Text>
                        <Text>Just check out these tabs.</Text>
                      </Box>
                    }
                    {this.state.activeTabName === 'report' &&
                      <Box flexDirection="column" paddingBottom={1}>
                        <Text>You are a pretty cool cat, {this.state.name}!</Text>
                        <Text>Just look at all this bio.</Text>
                        <Text>{this.state.bio}</Text>
                      </Box>
                    }
                    {this.state.activeTabName === 'bio' &&
                      <Box flexDirection="column">
                        <Box>
                          <TextField
                            value={app.state.name}
                            focused={this.state.focusedComponent==='txtName'}
                            caption={<Text bold><Color bgMagenta whiteBright>Your Name:</Color></Text>}
                            onChange={(newName) => app.setState({newName})}
                            onSubmit={(name) => app.setState({name})}
                            onBlur={() => app.setState({focusedComponent: 'txtBio'})}
                          />
                        </Box>
                        <Box>
                          <TextField
                          value={app.state.bio}
                          focused={this.state.focusedComponent==='txtBio'}
                          caption={<Text italic><Color bgBlue whiteBright>Your Bio:</Color></Text>}
                          onChange={(newBio) => app.setState({newBio})}
                          onSubmit={(bio) => app.setState({bio})}
                          onBlur={() => app.setState({focusedComponent: 'tabBar'})}
                          />
                        </Box>
                      </Box>
                    }
                </Box>
            )}
          </AppContext.Consumer>
        );
    }
}

render(<FocusBlurApp />);