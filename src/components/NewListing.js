import React , { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import CustomModal from './CustomModal.js';

import { DOMAIN } from './Constants.js';

import './NewListing.scss';


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

  		axios.post(`${DOMAIN}listing_pictures/`, fd, {
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

    	axios.delete(`${DOMAIN}${pictureId}/`)
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
            		onChange={handleChange('largeBoxes')}/>
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
            		onChange={handleChange('mediumBoxes')}/>
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
            		onChange={handleChange('smallBoxes')}/>
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
		const { values } = this.props;

		let msgArray = [];

		if (values.smallBoxes > 0) {
			msgArray.push(`${values.smallBoxes} Small Boxes`);
		}

		if (values.mediumBoxes > 0) {
			msgArray.push(`${values.mediumBoxes} Medium Boxes`);
		}

		if (values.largeBoxes > 0) {
			msgArray.push(`${values.largeBoxes} Large Boxes`);
		}

		let msg;
		if (msgArray.length === 0) {
			msg = 'no boxes';
		} else {
			msg = `${msgArray[msgArray.length - 1]}`;
			
			if (msgArray.length - 1 > 0) {
				msg = `${msgArray[msgArray.length - 2]} and ${msg}`;
			}

			if (msgArray.length - 2 > 0) {
				msg = `${msgArray[msgArray.length - 3]}, ${msg}`;
			}
		}

		return (<div className="listingPage">
			<div className="h1">
				Sweet, you've just listed <b>{values.title}</b> along with {msg}.
			</div>

			<div className="h2">
				<b>Next steps:</b><br/>
				When someone is ready to store your things, they will reach out to you in one of the channels bellow. Make sure these are updated by going to the <b>Me</b> tab.
			</div>

		</div>);
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
		axios.post(`${DOMAIN}listings/`, { })
		    .then(res => {
				 console.log(res);
				 console.log(res.data.id);
				 this.setState({id: res.data.id});
		    });
	}

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		const { id, step} = this.state;

		if (step < 3) {
			if (id !== null) {
				axios.delete(`${DOMAIN}listings/${id}/`);
			}
		}

		this.setState({open: false});
		this.props.history.push(`/`);
	};

	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
	}

	handleSubmit = () => {
		const { id, title, description, smallBoxes, mediumBoxes, largeBoxes, other } = this.state;

		axios.put(`${DOMAIN}listings/${id}/`, {
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
		return (
		<div>
			<CustomModal
		        open={this.state.open}
		        onClose={this.handleClose}
		      >
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
		    </CustomModal>
		</div>
		);
	}
}

export default withRouter(withStyles({ }, { withTheme: true })(NewListing));
