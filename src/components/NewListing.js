import React , { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Slide from '@material-ui/core/Slide';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './NewListing.scss'

const styles = theme => ({
	root: {
		
	},
});

class NewListingP1 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			files: [],
			pictureIds: [],
		}
	}

	uploadMultipleFiles = e => {
		this.setState({
			files: [...this.state.files, e.target.files],
		});

		const { values } = this.props;

		const fd = new FormData();
  		fd.append("image", e.target.files[0], e.target.files[0].name);
  		fd.append("listing", values.id);

  		axios.post("http://bizu-env2.eba-jmm3xad3.us-west-2.elasticbeanstalk.com/listing_pictures/", fd, {
	      onUploadProgress: progressEvent => {
	        console.log("upload progress " + Math.round((progressEvent.loaded / progressEvent.total)*100) + "%");
	      }
	    })
	    .then(res => {
	    	console.log(res.data);
	    	this.setState({pictureIds: [...this.state.pictureIds, res.data.id]})
	    });
    }

    removeImg = (index) => {	
    	const { files, pictureIds } = this.state;
    	const pictureId = pictureIds[index];

    	axios.delete(`http://bizu-env2.eba-jmm3xad3.us-west-2.elasticbeanstalk.com/listing_pictures/${pictureId}/`)
    		.then(res => {
    			console.log(res);
    			// TODO: state stuff

    			files.splice(index, 1);
    			pictureIds.splice(index, 1)
				this.setState({files: files, pictureIds: pictureIds});
    		});

    }

	render() {
		const { values, handleChange } = this.props;

		return (<div className="listingPage">
			<div className="paragraph">Bellow, describe <b>a single item</b> that you're lending. In the next screen, you'll be able to list boxes that you want to store along with this item.</div>
			<div className="paragraph">After you finish, you can create other listings for other items you want to store/lend.</div>

	        <div className="images">
                {(this.state.files || []).map((file, index) => {
                	return (
                		<div className="imgPreviewContainer" key={index}>
	                    	<img className="imgPreview" src={URL.createObjectURL(file[0])} alt="..." />
	                    	<div className="removeImg" onClick={() => this.removeImg(index)}>&#10005;</div>
                    	</div>
	                )
                })}

                <div className="imgPreviewContainer" style={this.state.files.length === 0 ? {minWidth: "100%"} : {}}>
					<label for="image-upload" className="uploadButton">
						Add Photos
					</label>
		            <input
		            	id="image-upload"
		            	type="file"
		            	className="uploadInput"
		            	onChange={this.uploadMultipleFiles}
		            	multiple />
		        </div>
            </div>

            <div className="fieldContainer">
            	<input
            		type="text"
            		placeholder="Title"
            		className="text field"
            		onChange={handleChange('title')}
            		defaultValue={values.title}/>
            </div>

            <div className="fieldContainer">
            	<textarea
            		placeholder="Description"
            		rows="5"
            		className="text field"
            		onChange={this.props.handleChange('description')}
            		defaultValue={values.description}>
        		</textarea>
            </div>

        	{/* TODO: tags */}
        	
		</div>);
	}
}

class NewListingP2 extends Component {
	render() {
		const { values, handleChange } = this.props;

		return (<div className="listingPage">
			<div className="paragraph">Now tell us about how many things you want to store along with the <b>{values.title}</b>.</div>
			<div className="paragraph">Make your best estimate on how many boxes you need to store so that people know approximately how much space you need.</div>

			<div className="fieldContainer">
            	<input
            		type="number"
            		placeholder="0"
            		className="number field"
            		onChange={handleChange('largeBoxes')}
            		defaultValue={values.large}/>
            	<div className="boxHelper">
            		<div className="boxTitle">Large Boxes</div>
        			<div className="boxDimension">18'' x 18'' x 24''</div>
            	</div>
            </div>

            <div className="fieldContainer">
            	<input
            		type="number"
            		placeholder="0"
            		className="number field"
            		onChange={handleChange('mediumBoxes')}
            		defaultValue={values.mediumBoxes}/>
            	<div className="boxHelper">
            		<div className="boxTitle">Medium Boxes</div>
        			<div className="boxDimension">18'' x 18'' x 16''</div>
            	</div>
            </div>

            <div className="fieldContainer">
            	<input
            		type="number"
            		placeholder="0"
            		className="number field"
            		onChange={handleChange('smallBoxes')}
            		defaultValue={values.smallBoxes}/>
            	<div className="boxHelper">
            		<div className="boxTitle">Small Boxes</div>
        			<div className="boxDimension">16'' x 16'' x 12''</div>
            	</div>
            </div>

            <div className="paragraph">
            If you have any irregular shaped items that can't really fit in a box, feel free to describe them bellow.
            </div>

            <div className="fieldContainer">
            	<textarea
            		placeholder="Other"
            		rows="5"
            		className="text field"
            		onChange={this.props.handleChange('other')}
            		defaultValue={values.other}>
        		</textarea>
            </div>
		</div>);
	}
}

class NewListingP3 extends Component {
	render() {
		return (<div>P3</div>);
	}
}

class NewListing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			step: 1,
			id: null,
			title: '',
			description: '',
			tags: [],
			pictures: [],
			smallBoxes: 0,
			mediumBoxes: 0,
			largeBoxes: 0,
			other: '',
		}
	}

	componentDidMount() {
		// TODO: check if success
		axios.post("http://bizu-env2.eba-jmm3xad3.us-west-2.elasticbeanstalk.com/listings/", { })
		    .then(res => {
				 console.log(res);
				 console.log(res.data.id);
				 this.setState({id: res.data.id});
		    });
	}

	handleOpen = () => {
		this.setState({open: true});
		console.log('called');
	};

	handleClose = () => {
		const { id, step} = this.state;

		if (step < 3) {
			if (id !== null) {
				axios.delete(`http://bizu-env2.eba-jmm3xad3.us-west-2.elasticbeanstalk.com/listings/${id}/`);
			}
		}

		this.setState({open: false});
		this.props.history.push(`/`);
	};

	handleChange = input => e => {
		console.log(input);
		this.setState({ [input]: e.target.value });
	}

	handleSubmit = () => {
		const { id, title, description, smallBoxes, mediumBoxes, largeBoxes, other } = this.state;

		axios.put(`http://bizu-env2.eba-jmm3xad3.us-west-2.elasticbeanstalk.com/listings/${id}/`, {
			title: title,
			description: description,
			small_boxes: smallBoxes,
			medium_boxes: mediumBoxes,
			large_boxes: largeBoxes,
			other: other
		})
		.then(res => {
			console.log(res.data);

			// TODO: is this the best place to put?
			// TODO: should have a loading screen somewhere.
			this.nextStep();
		});
	}

	nextStep = () => {
		this.setState({step: this.state.step + 1});
	}

	prevStep = () => {
		this.setState({step: this.state.step - 1});
	}

	renderPage = () => {
		const { id, title, description, tags, pictures, smallBoxes, mediumBoxes, largeBoxes, other } = this.state;
		const values = { id, title, description, tags, pictures, smallBoxes, mediumBoxes, largeBoxes, other };

		switch(this.state.step) {
			case 1:
				return <NewListingP1 values={values} handleChange={this.handleChange} />;
			case 2:
				return <NewListingP2 values={values} handleChange={this.handleChange} />;
			default:
				return <NewListingP3 values={values} />;
		}
	}

	render() {
		const { classes } = this.props;

		return (
		<div>
			<Modal
		        aria-labelledby="transition-modal-title"
		        aria-describedby="transition-modal-description"
		        className={classes.modal}
		        open={this.state.open}
		        onClose={this.handleClose}
		        closeAfterTransition
		        BackdropComponent={Backdrop}
		        BackdropProps={{
		          timeout: 500,
		        }}
		      >
		        <Slide direction="up" in={this.state.open}>
		          <div className="newListing">
		          	{this.state.step < 3 ? 
			          	<div className="navbar">
			          		{this.state.step === 1 ? 
			          			<button className="left" onClick={this.handleClose}>Cancel</button>
			          			:
			          			<button className="left" onClick={this.prevStep}>Back</button>
			          		}

			          		<div className="center">Lend Item</div>

			          		{this.state.step < 2 ?
			          			<button className="right" onClick={this.nextStep}>Next</button>
			          			:
			          			null
			          		}
			          	</div>
			          	:
			          	null
			        }
		            
		          	{this.renderPage()}

		          	{this.state.step >= 2 ?
			            <div className="bottomContainer">
			            	{this.state.step === 2 ?
			            		<button
			            			className="bottomButton primaryButton"
			            			onClick={this.handleSubmit}>
			            			Submit
		            			</button>
			            		:
			            		<button
			            			className="bottomButton secondaryButton"
			            			onClick={this.handleClose}>
			            			Done
		            			</button>
		            		}
			            </div>
			            :
			            null
		          	}

		          </div>
		        </Slide>
		    </Modal>
		</div>
		);
	}
}

export default withRouter(withStyles(styles, { withTheme: true })(NewListing));
