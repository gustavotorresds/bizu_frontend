import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';
import requester from './Requester.js';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Route, Link } from 'react-router-dom';

import CustomModal from './CustomModal.js';
import ContactInfo from './ContactInfo.js';

import { LISTING_STATUS } from './Constants.js';

import './Listing.scss';

class ListingP1 extends Component {
	render() {
		const { info } = this.props;

		return (
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

		        <div className="closeListing"><Link to="/">&#10005;</Link></div>

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

			        <ContactInfo userId={info.owner} />
		        </div>

		        <div className="bottomContainer">
		        	<button
		        		className="bottomButton primaryButton"
		        		onClick={() => this.reserveListing()}
	        		>
		        		Reserve
		        	</button>
		        </div>
			</div>
		);
	}
}

class ListingP2 extends Component {
	render() {
		const { info } = this.props;

		return (
			<div>
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

		        <div className="info">
			        <div className="h1">Sweet, you've just reserved <b>{info.title}</b>.</div>.

			        <div className="h2 mt30">
			        <b>Next steps:</b><br/>
			        To coordinate the pick-up, reach out to the owner bellow.
			        </div>

			        <ContactInfo userId={info.owner} />

			        <div className="paragraph mt30">
			        Here's an example message that you can copy-paste to send them:
			        </div>

			        <div className="paragraphS mt15">
			        "Hi User Name! I just saw the Item Title you posted on Bizu. I'd love to store it along with your boxes. When would it be a good time to pick them up?”
			        </div>
		        </div>
			</div>
		);
	}
}

class Listing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			info: null,
			ready: false,
			step: 1,
		}
	}

	componentDidMount() {
		const listingId = this.props.match.params.id;

		requester
			.get(`listings/${listingId}/`)
			.then(res => {
				this.setState({info: res.data, ready: true})
			});
	}

	handleClose = () => {
		this.setState({open: false});
		this.props.history.push(`/`);
	};

	nextStep = () => {
		this.setState({step: this.state.step + 1});
	}


	reserveListing = () => {
		const listingId = this.props.match.params.id;

		requester
			.put(`listings/${listingId}/`, {
				status: LISTING_STATUS['RESERVED'],
			})
			.then(res => {
				console.log(res.data);
				this.nextStep();
			});
	}

	renderStep(info) {
		if (!this.state.ready) {
			return <div>Loading</div>;
		}

		if (this.state.step === 1) {
			return <ListingP1 info={info} />
		} else {
			return <ListingP2 info={info} />
		}
	}

	render() {
		const { info } = this.state;
		console.log(info);

		return (
			<CustomModal
				open={this.state.open}
				onClose={this.state.handleClose}
			>
				<div className="completeListing">
					{this.renderStep(info)}

					<div className="bottomContainer">
						{this.state.step === 1 ?
						<button
			        		className="bottomButton primaryButton"
			        		onClick={() => this.reserveListing()}
		        		>
			        		Reserve
			        	</button>
			        	:
			        	<button
			        		className="bottomButton secondaryButton"
			        		onClick={() => this.handleClose()}
		        		>
			        		Done
			        	</button>
						}
			        </div>
		        </div>
			</CustomModal>
		);
	}
}

export default Listing;
