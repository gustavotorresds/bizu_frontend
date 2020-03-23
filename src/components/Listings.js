import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import requester from './Requester.js';
import { Route, Link } from 'react-router-dom';


import EditListing from './EditListing';
import Listing from './Listing.js';

import './Listings.scss';

const useStyles = makeStyles({
  root: {

  },
});

class Listings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: [],
			activeListing: null, // should we remove this?
		}
	}


	// TODO: there's a prob a better way to make this work without having to repeat
	// the same code here and in componentWillReceiveProps().
	componentDidMount() {
		const { filters } = this.props;

		let query = '';
		// TODO: see if there's a cleaner way to do this.
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

	componentWillReceiveProps(nextProps) {
		const { filters } = nextProps;

		let query = '';
		// TODO: see if there's a cleaner way to do this.
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

	render() {
		const { listings } = this.state;

		return (
			<div>				
				<div className="listings">
					<Grid container spacing={3}>

						{listings.map((listing, index) => {
							return (
								<Grid item xs={12} key={index}>
									<Link to={`/listings/${listing.id}/`}>
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

				<Route path={'/listings/:id/'} component={Listing}/>

				<Route path={'/listings/:id/edit/'} component={EditListing}/>
			</div>
		);
	}
}

export default Listings;
