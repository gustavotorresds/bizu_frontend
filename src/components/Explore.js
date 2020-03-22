import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import requester from './Requester.js';
import { Route, Link } from 'react-router-dom';

import Listing from './Listing.js';

import './Explore.scss';

const useStyles = makeStyles({
  root: {

  },
});

class Explore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: [],
			open: false,
			activeListing: null, // should we remove this?
		}
	}

	componentDidMount() {
		const { filters } = this.props;

		let query = '';
		// TODO: see if there's no clearner way to do this.
		if (filters) {
			query += '?'
			for (let key in filters) {
				query += (`${key}=${filters[key]}&`);
			}
			query = query.substring(0, query.length - 1); // remove last &.
			console.log(query);
		}

		requester.get(`listings/${query}`)
			.then(res => {
				this.setState({listings: res.data})
			});
	}

	render () {
		const { listings } = this.state;

		return (
			<div className="explore">
				<div className="searchContainer">
					<input
						className="searchBar"
						type="text"
						placeholder="Find things you want"
					/>
				</div>

				<div className="listings">
					<Grid container spacing={3}>

						{listings.map((listing, index) => {
							return (
								<Grid item xs={12} key={index}>
									<Link to={`/listings/${listing.id}`}>
										<div
											className="listing"
											onClick={ () => {
												this.setState({activeListing: listing})
											}}
										>
											<img className="thumbnail" src={listing.pictures[0].image} />
											<div className="title">{listing.title}</div>
											<div className="boxes">+ {listing.small_boxes} small boxes, {listing.medium_boxes} medium boxes, {listing.large_boxes} large boxes</div>
										</div>
									</Link>
								</Grid>
							)
						})}
					</Grid>
				</div>

				<Route path={'/listings/:id/'} component={Listing} />
			
			</div>
		);
	}
}

export default Explore;
