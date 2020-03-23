import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddBoxIcon from '@material-ui/icons/AddBox';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    borderTop: '1px solid #C2C2C2',
  },
});

class Nav extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
			value: '',
		}
	}

 	handleChange = (event, newValue) => {
 		this.setState({value: newValue});
 		this.props.history.push(`/${newValue}`);
 	};

 	render() {
 		const { classes } = this.props;

 		const token = localStorage.getItem('token') || null;

 		const {pathname} = this.props.location;
 		const pathnameWithoutSlash = pathname.substring(1);

 		return (
			<BottomNavigation value={pathnameWithoutSlash} onChange={this.handleChange} className={classes.root} >
				<BottomNavigationAction label="Explore" value="" icon={<SearchIcon />} />
		
				<BottomNavigationAction label="Store" value="store/" icon={<AddBoxIcon />} />

				{token ?
					<BottomNavigationAction label="News" value="news/" icon={<NotificationsIcon />} />
					:
					null
				}

				{token ? 
					<BottomNavigationAction label="Me" value="me/" icon={<PersonIcon />}/>
					:
					<BottomNavigationAction label="Log In" value="auth" icon={<PersonIcon />} />
				}
		
				
			</BottomNavigation>
		);
 	}
}

export default withRouter(withStyles(styles, { withTheme: true })(Nav));
