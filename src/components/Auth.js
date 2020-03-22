import React, { Component, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from 'react-router-dom';

import requester, { resetToken } from './Requester.js';
import './Auth.scss';

const useStyles = makeStyles({
  root: {

  },
});

class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		}
	}

	authenticate() {
		requester
			.post('api-token-auth/', {
				username: this.state.username,
				password: this.state.password,
			})
			.then(res => {
				console.log(res.data);
				resetToken(res.data.token);
				this.props.history.push('/');
			});
	}

	render() {
		return (
			<div className="login">
				<div className="fieldContainer">
					<input
						className="field topField"
						type="text"
						placeholder="Username"
						onChange={(e) => this.setState({username: e.target.value})}
					/>
				</div>

				<div className="fieldContainer">
					<input
						className="field bottomField"
						type="password"
						placeholder="Password"
						onChange={(e) => this.setState({password: e.target.value})}
					/>
				</div>

				<button
					className="submitButton primaryButton mt15"
					onClick={() => this.authenticate()}
				>
					<b>Log in</b>
				</button>
			</div>
		);
	}
}

LogIn = withRouter(LogIn);

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			username: '', // TODO: should remove this and only use email instead.
			password: '',
			email: '',
			facebook: '',
			linkedin: '',
			agreed: false,
		}
	}

	register() {
		const data = {
			email: this.state.email,
			password: this.state.password,
			profile: {
				facebook: this.state.facebook,
				linkedin: this.state.linkedin
			}
		}

		console.log(data);

		requester
			.post('register/', data)
			.then(res => {
				console.log(res.data);
				resetToken(res.data.token);
				this.props.history.push('/');
			});
	}

	render() {
		return (
			<div className="signup">
				<div>
				Hello! Happy to see you here :)<br/>
				Quick note: Bizu is a platform for Stanford students and alumni. We'll need to verify that you have a Stanford affiliation in order to have you join.
				</div>

				<div className="fieldContainer">
					<input
						className="field"
						type="text"
						placeholder="Stanford email"
						onChange={(e) => this.setState({email: e.target.value})}
					/>
				</div>

				<div>
				We'll send you a verification email shortly.
				</div>

				<div className="fieldContainer">
					<input
						className="field"
						type="password"
						placeholder="Password"
						onChange={(e) => this.setState({password: e.target.value})}
					/>
				</div>

				<div>
				Provide at least one of the social networks bellow so other  users can check that you're a real person.
				</div>

				<div className="fieldContainer">
					<input
						className="field"
						type="text"
						placeholder="Facebook"
						onChange={(e) => this.setState({facebook: e.target.value})}
					/>
				</div>

				<div className="fieldContainer">
					<input
						className="field mt15"
						type="text"
						placeholder="Linkedin"
						onChange={(e) => this.setState({linkedin: e.target.value})}
					/>
				</div>

				<div className="fieldContainer">
					<input
						type="checkbox"
						value="agree"
						id="agree"
					/>
					<label for="agree">
						I agree to Bizu's Terms of Service and Privacy Plicy.
					</label>
				</div>

				<button
					className="submitButton primaryButton mt15"
					onClick={() => this.register()}
				>
					<b>Create your Bizu account</b>
				</button>
			</div>
		);
	}
}

SignUp = withRouter(SignUp);

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 'login',
		}
	}

	handleChange = (event, newValue) => {
		this.setState({page: newValue})
	};

	render() {
		return (
			<div className="auth">
				<div className="h1 mt30"><b>Welcome</b></div>

			
				<Tabs
					value={this.state.page}
					indicatorColor="primary"
					textColor="primary"
					onChange={this.handleChange}
					aria-label="tabs example"
					variant="fullWidth"
					className="tabs"
				>
					<Tab label="Log in" value="login" />
					<Tab label="Sign up" value="signup" />
				</Tabs>

				{this.state.page === 'login' ?

				<LogIn />

				:

				<SignUp />

				}
				
			</div>
		);
	}
}

export default Auth;
