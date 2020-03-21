import React, { Component, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom';

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
		}
	}


	render() {
		return (
			<div className="contactInfo">
				
			</div>
		);
	}
}

export default ContactInfo;
