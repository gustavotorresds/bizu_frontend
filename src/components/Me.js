import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import StarRateIcon from '@material-ui/icons/StarRate';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Listings from './Listings'
import { UserContext } from './Constants'
import './Me.scss';

const useStyles = makeStyles({
  root: {

  },
});

class Me extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'borrowed',
		}
	}

	handleChange = (event, newValue) => {
		this.setState({activeTab: newValue});
	};

	render() {
		// const info = {
		// 	firstName: 'Gustavo',
		// 	lastName: 'Torres',
		// 	email: 'gdasilva@stanford.edu',
		// 	profile: {
		// 		facebook: 'facebook.com',
		// 		linkedin: 'linkedin.com'
		// 	}
		// }

		return (
			<UserContext.Consumer>
			{info => (
				<div className="me">
					<div className="header">
						<div className="leftCol">
							<div className="iconContainer">
								<PersonIcon className="icon"/> 
							</div>
						</div>

						<div className="rightCol">
							<div className="name"></div>
							<div className="contact">
								<div className="name">User Name</div> {/* TODO: replace with actual name */}
								<div className="rating field">5.0 <StarRateIcon className="star"/></div>
								<div className="field">{info.email}</div>
								<div>
									<a className="field socialLink" href={info.profile.facebook} target="_blank">Facebook</a>
									<span className="field divisor">|</span>
									<a className="field socialLink" href={info.profile.linkedin} target="_blank">Linkedin</a>
								</div>
							</div>
						</div>
					</div>

					<button className="subtleButton">Edit Profile</button>

					<hr className="verticalDivisor"/>

					<Tabs
						value={this.state.activeTab}
						indicatorColor="primary"
						textColor="primary"
						onChange={this.handleChange}
						aria-label="tabs example"
						variant="fullWidth"
						className="tabs"
					>
						<Tab label="Borrowed" value="borrowed" />
						<Tab label="Lent" value="lent" />
					</Tabs>

					{this.state.activeTab === 'lent' ?
						<Listings filters={{owner: info.id}} />
						:
						<Listings filters={{borrower: info.id}} />
					}
					
				</div>
			)}
			</UserContext.Consumer>
		);
	}
}

export default Me;
