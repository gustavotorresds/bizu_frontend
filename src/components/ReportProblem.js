import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import CustomModal from './CustomModal';
import requester from './Requester';
import './ReportProblem.scss';

const useStyles = makeStyles({
  root: {

  },
});

class ReportProblem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			description: '',
		}
	}

	handleClose = () => {
		this.setState({open: false});
		this.props.history.push(`/`);
	};

	handleChange = (event) => {
		this.setState({
			description: event.target.value,
		})
	}

	handleSubmit = () => {
		const listingId = this.props.match.params.listingId;

		requester
			.post('problems/', {
				listing: listingId,
				description: this.state.description,
			})
			.then(res => {
				console.log(res.data);
				this.props.history.push('/');
			});
	}

	render() {
		return (
			<CustomModal
				open={this.state.open}
		        onClose={this.handleClose}
			>	
				<div className="reportProblem">
					<div className="topNavbar">
	          			<button className="left" onClick={this.handleClose}>Cancel</button>

		          		<div className="center">Report Problem</div>

	          			<button className="right" onClick={this.handleSubmit}>Submit</button>
		          	</div>

		          	<div className="fieldContainer">
		          		<div className="explanation">We're sorry to hear you had a problem. Can you explain what happened so we can fix it?</div>
		          		<textarea
		            		placeholder="Description"
		            		rows="5"
		            		className="textField"
		            		onChange={this.handleChange}
		            		defaultValue={''}>
		        		</textarea>
		          	</div>
	          	</div>
			</CustomModal>
		);
	}
}

export default withRouter(ReportProblem);
