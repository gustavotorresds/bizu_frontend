import React , { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';

class CustomModal extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Modal
		        aria-labelledby="transition-modal-title"
		        aria-describedby="transition-modal-description"
		        className={classes.modal}
		        open={this.props.open}
		        onClose={this.props.onClose}
		        closeAfterTransition
		        BackdropComponent={Backdrop}
		        BackdropProps={{
		          timeout: 500,
		        }}
		      >
		        <Slide direction="up" in={this.props.open}>
		          {this.props.children}
		        </Slide>
		    </Modal>
		);
	}
}

export default withStyles({ }, { withTheme: true })(CustomModal);
