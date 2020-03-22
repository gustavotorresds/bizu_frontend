import React, { Component, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';

import requester from './Requester.js';
import './ContactInfo.scss';

const useStyles = makeStyles({
  root: {

  },
});

class ContactInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ready: false,
			userInfo: null,
		}
	}

	componentDidMount() {
		const { userId } = this.props;

		requester
			.get(`users/${userId}/`)
			.then(res => {
				this.setState({ready: true, userInfo: res.data});
			});
	}

	render() {
		const { userInfo, ready } = this.state;

		if (ready) {
			return (
				<div className="contactInfo">
					<div className="leftCol">
						<div className="iconContainer">
							<PersonIcon className="icon"/> 
						</div>
					</div>

					<div className="rightCol">
						<div className="field">{userInfo.email}</div>
						<div className="field">
							<a className="socialLink" href={userInfo.profile.facebook} target="_blank">Facebook</a>
							<span className="divisor">|</span>
							<a className="socialLink" href={userInfo.profile.linkedin} target="_blank">Linkedin</a>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					Loading
				</div>
			);
		}
	}
}

export default ContactInfo;
