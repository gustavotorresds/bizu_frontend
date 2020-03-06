import React, { Component } from 'react';

import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

import Explore from './Explore';
import Me from './Me';
import Nav from './Nav';
import NewListing from './NewListing';
import Notifications from './Notifications';

const theme = createMuiTheme({
  palette: {
    // primary: { main: yellow[500], dark: yellow[700] }, // #ffb300 (not sure this is the best. Specially for others)
    primary: { main: yellow[700] },
  },
});

class Main extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
			active: 'explore',
		}
	}

	setActive(newActive) {
		this.setState({active: newActive});
	}

	render() {

		return (
			<Router>
				<ThemeProvider theme={theme}>
					<Switch>
						<Route exact={true} path="/"><Explore/></Route>
						<Route path="/me"><Me/></Route>
						<Route path="/news"><Notifications/></Route>
					</Switch>
					<Nav setActive={this.setActive}/>
				</ThemeProvider>
			</Router>
		);
	}
}

export default Main;
