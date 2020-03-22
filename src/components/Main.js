import React, { Component } from 'react';

import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { yellow } from '@material-ui/core/colors';

import Auth from './Auth'
import Explore from './Explore';
import Me from './Me';
import Nav from './Nav';
import NewListing from './NewListing';
import Notifications from './Notifications';

import './Main.scss';

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
	    	
		}
	}

	render() {

		return (
			<Router>
				<ThemeProvider theme={theme}>
					<Switch>
						<Route exact path={["/", "/listings/", "/listings/:id/"]} ><Explore filters={{owner: 1}}/></Route>
						<Route path="/store"><NewListing/></Route>
						<Route path="/me"><Me/></Route>
						<Route path="/news"><Notifications/></Route>
						<Route path="/auth"><Auth/></Route>
					</Switch>
					<Nav />
				</ThemeProvider>
			</Router>
		);
	}
}

export default Main;
