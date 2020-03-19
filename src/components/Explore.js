import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Route, Link } from 'react-router-dom';

import CustomModal from './CustomModal.js';

import { DOMAIN } from './Constants.js';

import './Explore.scss';

const useStyles = makeStyles({
  root: {

  },
});

const LISTING_STATUS = {
	AVAILABLE: 0,
	RESERVED: 1,
	IN_USE: 2,
	HIDDEN: 3,
}



class Listing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			info: null,
			fetched: false,
		}
	}

	componentDidMount() {
		const listingId = this.props.match.params.id;

		axios
			.get(`${DOMAIN}listings/${listingId}/`)
			.then(res => {
				this.setState({info: res.data, fetched: true})
			});
	}

	handleClose = () => {
		this.setState({open: false});
	};


	reserveListing = () => {
		const listingId = this.props.match.params.id;

		axios
			.put(`${DOMAIN}listings/${listingId}/`, {
				status: LISTING_STATUS['RESERVED'],
			})
			.then(res => {
				console.log(res.data);
			});
	}

	render() {
		const { info } = this.state;
		console.log(info);

		return (
			<CustomModal
				open={this.state.open}
				onClose={this.state.handleClose}
			>
				{this.state.fetched ? 
				<div className="completeListing">
					<Carousel showArrows={false} showStatus={false} showThumbs={false}>
					    {info.pictures.map((pic, index) => (
				            <div
				                key={index}
				                className="thumbnail"
				            >
				            	<img src={pic.image} />
				            </div>
				        ))}
			        </Carousel>

			        <div className="closeListing" ><Link to="/">&#10005;</Link></div>

			        <div className="info">
				        <div className="title">
				        	{info.title}
				        </div>

				        <div className="boxes">
				        	<div className="box">{info.small_boxes} Small Boxes</div>
				        	<div className="box">{info.medium_boxes} Medium Boxes</div>
				        	<div className="box">{info.large_boxes} Large Boxes</div>
				        </div>

				        <div className="description displayLinebreak">
				        	{info.description}
				        </div>
			        </div>

			        <div className="bottomContainer">
			        	<button
			        		className="bottomButton primaryButton"
			        		onClick={() => this.reserveListing()}
		        		>
			        		Borrow
			        	</button>
			        </div>
				</div>
				:
				<div>Loading</div>
				}
			</CustomModal>
		);
	}
}

class Explore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listings: [],
			open: false,
			activeListing: null,
		}
	}

	componentDidMount() {
		axios.get(`${DOMAIN}listings/`)
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
