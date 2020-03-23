import React, { Component } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';

import CustomModal from './CustomModal';
import requester from './Requester';
import './UpdateProfile.scss';

const useStyles = makeStyles({
  root: {

  },
});

class UpdateProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			name: 'User Name', // TODO: replace
			email: '',
			facebook: '',
			linkedin: '',
		}
	}

	componentDidMount() {
		requester
			.get('users/me/')
			.then(res => {
				const data = res.data;
				this.setState({
					id: data.id,
					email: data.email,
					facebook: data.profile.facebook,
					linkedin: data.profile.linkedin,
				});
			});
	}

	handleClose = () => {
		this.setState({open: false});
		this.props.history.push(`/`);
	};

	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
	}

	handleUpdate = () => {
		requester
			.patch(`users/${this.state.id}/`, { // TODO: ideally, users/me
				email: this.state.email,
				profile: {
					facebook: this.state.facebook,
					linkedin: this.state.linkedin,
				}
			})
			.then(res => {
				console.log(res.data);
				this.props.history.push('/me/');
			});
	}

	render() {
		return (
			<CustomModal
				open={this.state.open}
		        onClose={this.handleClose}
			>	
				<div className="updateProfile">
					<div className="topNavbar">
	          			<button className="left" onClick={this.handleClose}>Cancel</button>

		          		<div className="center">Update Profile</div>

	          			<button className="right" onClick={this.handleUpdate}>Update</button>
		          	</div>

		          	<div className="iconContainer">
						<PersonIcon className="icon"/> 
					</div>

		          	<div className="fieldContainer">
		          		<div className="label">Name</div>
		          		<input
		          			className="textField"
		          			type="text"
		          			value={this.state.name}
		          			onChange={this.handleChange('name')}
	          			/>
		          	</div>

		          	<div className="fieldContainer">
		          		<div className="label">Email</div>
		          		<input
		          			className="textField"
		          			type="text"
		          			value={this.state.email}
		          			onChange={this.handleChange('email')}
	          			/>
		          	</div>

		          	<div className="fieldContainer">
		          		<div className="label">Facebook</div>
		          		<input
		          			className="textField"
		          			type="text"
		          			value={this.state.facebook}
		          			onChange={this.handleChange('facebook')}
	          			/>
		          	</div>

		          	<div className="fieldContainer">
		          		<div className="label">Linkedin</div>
		          		<input
		          			className="textField"
		          			type="text"
		          			value={this.state.linkedin}
		          			onChange={this.handleChange('linkedin')}
	          			/>
		          	</div>

		          	<div className="note">
		          	<b>Note:</b> your contact information is only shared with other verified Stanford students. The goal is to make it easier for Bizu members to trust and reach out each other.
		          	</div>
	          	</div>
			</CustomModal>
		);
	}
}

export default withRouter(UpdateProfile);
