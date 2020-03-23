import React, {Component} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';

import { Link } from 'react-router-dom';
import requester from './Requester';
import './Notifications.scss';

const useStyles = makeStyles({
  root: {

  },
});

class Notifications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
		}
	}

	componentDidMount() {
		requester
			.get(`my-notifications/`)
			.then(res => {
				console.log(res.data);
				this.setState({notifications: res.data});
			})
	}

	render() {
		return (
			<div className="notifications">
				<div className="h1"><b>Notifications</b></div>

				<div className="notificationsContainer">
					{this.state.notifications.map((notification, index) => {
						return (
						<Link to={notification.path}>
						<div className="notification" key={index}>
							<div className="content">
								<PersonIcon className="icon" />
								<div className="notificationMessage">{notification.message}</div>
							</div>
							<hr className="verticalDivisor" />
						</div>
						</Link>);
					})}
				</div>
			</div>
		);
	}
}

export default Notifications;