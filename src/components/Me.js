import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import StarRateIcon from '@material-ui/icons/StarRate';

import './Me.scss';

const useStyles = makeStyles({
  root: {

  },
});

class Me extends Component {
	render() {
		const info = {
			firstName: 'Gustavo',
			lastName: 'Torres',
			email: 'gdasilva@stanford.edu',
			profile: {
				facebook: 'facebook.com',
				linkedin: 'linkedin.com'
			}
		}

		return (
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
							<div className="name">{info.firstName} {info.lastName}</div>
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

				<button className="editButton">Edit Profile</button>

				<hr className="verticalDivisor"/>
			</div>
		);
	}
}

export default Me;
