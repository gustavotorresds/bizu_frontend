import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { withRouter, Route, Link } from 'react-router-dom';
import requester from './Requester.js';
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import CustomModal from './CustomModal';
import ContactInfo from './ContactInfo';

import { LISTING_STATUS, UserContext } from './Constants';

import './Listing.scss';

class ListingP1 extends Component {
	render() {
		const { info, userInfo } = this.props;

		return (
			<div className={'completeListing' + (userInfo.id !== info.owner && ' bottomContainerPadding')}>
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

class ActionableListing extends Component {
	contactInfo = () => {
		const { info, userInfo } = this.props;
		
		if (userInfo.id === info.owner) {
			if (info.status === LISTING_STATUS['RESERVED'] || info.status === LISTING_STATUS['IN_USE']) {
				return (<ContactInfo userId={info.borrower} />);	
			}
		} else {
			return (<ContactInfo userId={info.owner} />);
		}

		return null;
	};

	displayInstructions = () => {
		const { info, userInfo } = this.props;
		
		if (userInfo.id === info.owner && info.status === LISTING_STATUS['RESERVED']) {
			return (<div>
				<div>If you haven't coordinated the pick-up yet, here's a message that you can copy-paste to send them:</div>
				{/* TODO: replace User Name with actual name*/}
				<div>"Hi User Name! I just saw on Bizu that you want to borrow my Item Title. I'd love to lend it to you. When would it be a good time for you to pick them up?"</div>
			</div>); 
		} else if (info.borrower === userInfo.id) {
			return (<div>
				<div>If you haven't coordinated the pick-up yet, here's a message that you can copy-paste to send them:</div>
				<div>"Hi User Name! I just saw the Item Title you posted on Bizu. I'd love to store it along with your boxes. When would it be a good time to pick them up?"</div>
			</div>);
		}       	
	};

	markInUse = () => {
		const { info, userInfo } = this.props;

		requester
			.put(`listings/${info.id}/`, {
				status: LISTING_STATUS['IN_USE']
			})
			.then(res => {
				console.log(res.data);
			});
			// TODO: probably want to show something that indicates it went through. Maybe tooltip at bottom?
	}

	returnToOwner = () => {
		const { info, userInfo } = this.props;

		requester
			.put(`listings/${info.id}/`, {
				borrower: null,
				status: LISTING_STATUS['HIDDEN'], // TODO: what's the ideal status or flow? Available?
			})
			.then(res => {
				console.log(res.data);
			});
	}

	nullifyBorrower = () => {
		const { info, userInfo } = this.props;

		requester
			.put(`listings/${info.id}/`, {
				borrower: null,
				status: LISTING_STATUS['AVAILABLE'],
			})
			.then(res => {
				console.log(res.data);
			});
	}

	markAvailable = () => {
		const { info, userInfo } = this.props;

		requester
			.put(`listings/${info.id}/`, {
				status: LISTING_STATUS['AVAILABLE'],
			})
			.then(res => {
				console.log(res.data);
			});
	}

	hide = () => {
		const { info, userInfo } = this.props;

		requester
			.put(`listings/${info.id}/`, {
				status: LISTING_STATUS['HIDDEN'],
			})
			.then(res => {
				console.log(res.data);
			});	
	}

	delete = () => {
		const { info, userInfo } = this.props;

		requester
			.delete(`listings/${info.id}/`)
			.then(res => {
				console.log(res.data);
				// TODO: redirect to another page.
			});	
	}

	displayActions = () => {
		const { info, userInfo } = this.props;

		if (userInfo.id === info.owner) { // TODO: logic gets weird when you consider IN_USE.
			return (<div>
				<div>What's the status?</div>
				{info.status === LISTING_STATUS['RESERVED'] ?
				<div>
					<button className="subtleButton" onClick={this.markInUse}>Already Picked Up</button>
					<button className="subtleButton" onClick={this.returnToOwner}>Returned to Me</button>
					<button className="subtleButton" onClick={this.nullifyBorrower}>Never Picked Up</button>
					<Link to={`/problem/${info.id}`}><button className="subtleButton">I'm having problems</button></Link>
				</div>
				:
				<div>
					<Link to="edit/"><button className="subtleButton">Update Listing</button></Link>
					{info.status === LISTING_STATUS['HIDDEN'] ?
						<button className="subtleButton" onClick={this.markAvailable}>Make Listing Available</button>
						:
						<button className="subtleButton" onClick={this.hide}>Hide Listing</button>}
					}
					<button className="subtleButton" onClick={this.delete}>Remove Listing</button>
				</div>
				}
			</div>);
		} else if (userInfo.id === info.borrower) {
			return (<div>
				<div>What's the status?</div>
				{info.status === LISTING_STATUS['RESERVED'] ?
				<div>
					<button className="subtleButton" onClick={this.markInUse}>Already Picked Up</button>
					<button className="subtleButton" onClick={this.returnToOwner}>Returned to Owner</button>
					<button className="subtleButton" onClick={this.nullifyBorrower}>Never Picked Up</button>
					<button className="subtleButton" onClick={this.markAvailable}>I need someone else to store</button>
					<Link to={`/problem/${info.id}`}><button className="subtleButton">I'm having problems</button></Link>
				</div>
				:
				<div>
					<button className="subtleButton" onClick={this.returnToOwner}>Returned to Owner</button>
					<button className="subtleButton" onClick={this.markAvailable}>I need someone else to store</button>
					<Link to={`/problem/${info.id}`}><button className="subtleButton">I'm having problems</button></Link>
				</div>
				}
			</div>);
		}

		return null;
	}

	render() {
		const { info, userInfo } = this.props;

		return (
			<div className={'completeListing' + (userInfo.id !== info.owner && ' bottomContainerPadding')}>
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

			        {this.contactInfo()}

			        {this.displayInstructions()}

			        {this.displayActions()}
			        
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


	reserveListing = (userInfo) => {
		const listingId = this.props.match.params.id;

		requester
			.put(`listings/${listingId}/`, {
				status: LISTING_STATUS['RESERVED'],
				borrower: userInfo.id
			})
			.then(res => {
				console.log(res.data);
				this.nextStep();
			});
	}

	renderStep(userInfo, info) {
		if (this.state.step === 1) {
			return <ListingP1 userInfo={userInfo} info={info} />
		} else {
			return <ListingP2 userInfo={userInfo} info={info} />
		}
	}

	renderBottomContainer(userInfo, info) {
		return (<div className="bottomContainer">
			{this.state.step === 1 ?
			<button
        		className="bottomButton primaryButton"
        		onClick={() => this.reserveListing(userInfo)}
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
        </div>);
	}

	render() {
		const { info } = this.state;

		return (
			<UserContext.Consumer>
			{userInfo => (
				<CustomModal
					open={this.state.open}
					onClose={this.state.handleClose}
				>
					{this.state.ready ?
					<div className="completeListing">
						{info.status !== LISTING_STATUS['AVAILABLE'] || userInfo.id === info.owner ?
							<ActionableListing userInfo={userInfo} info={info} />
							:
							<div>
								{this.renderStep(userInfo, info)}
								{this.renderBottomContainer(userInfo, info)}
							</div>
						}
			        </div>
			        :
			        <div>Loading</div>
			  	  }
				</CustomModal>

			)}
			</UserContext.Consumer>
		);
	}
}

export default Listing;
