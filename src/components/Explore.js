import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import requester from './Requester.js';
import { Route, Link } from 'react-router-dom';

import Listings from './Listings.js';
import { LISTING_STATUS } from './Constants.js';

import './Explore.scss';

const useStyles = makeStyles({
  root: {

  },
});

class Explore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: '',
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
						onChange={(event) => {
							this.setState({searchQuery: event.target.value}); // TODO: this can/should be a lot better.
						}}
					/>
				</div>

				<Listings filters={{status: LISTING_STATUS['AVAILABLE'], search: this.state.searchQuery}}/>
			</div>
		);
	}
}

export default Explore;
