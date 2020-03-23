import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import requester from './Requester.js';
import { Route, Link } from 'react-router-dom';

import Listings from './Listings.js';

import './Explore.scss';

const useStyles = makeStyles({
  root: {

  },
});

class Explore extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	render () {
		return (
			<div className="explore">
				<div className="searchContainer">
					<input
						className="searchBar"
						type="text"
						placeholder="Find things you want"
					/>
				</div>

				<Listings/>
			</div>
		);
	}
}

export default Explore;
