import React , { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import requester from './Requester.js';

import CustomModal from './CustomModal.js';

import { DOMAIN } from './Constants.js';

import './NewListing.scss';


class EditListingP1 extends Component {

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

  		requester.post('listing_pictures/', fd, {
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

    	requester.delete(`${pictureId}/`)
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
	        	{(values.pictures || []).map((picture, index) => {
                	return (
                		<div className="imgPreviewContainer" key={index}>
	                    	<img className="imgPreview" src={picture.image} alt="..." />
	                    	<div className="removeImg" onClick={() => this.props.removePic(index)}>&#10005;</div>
                    	</div>
	                )
                })}

                {(this.state.files || []).map((file, index) => {
                	return (
                		<div className="imgPreviewContainer" key={index}>
	                    	<img className="imgPreview" src={URL.createObjectURL(file[0])} alt="..." />
	                    	<div className="removeImg" onClick={() => this.removeImg(index)}>&#10005;</div>
                    	</div>
	                )
                })}

                <div className="imgPreviewContainer" style={this.state.files.length + values.pictures.length === 0 ? {minWidth: "100%"} : {}}>
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

class EditListingP2 extends Component {
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
            		value={values.largeBoxes}
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
            		value={values.mediumBoxes}
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
            		value={values.smallBoxes}
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

class EditListing extends Component {
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
		const listingId = this.props.match.params.id;

		requester
			.get(`listings/${listingId}/`)
			.then(res => {
				const {id, title, description, pictures, small_boxes, medium_boxes, large_boxes, other} = res.data;
				this.setState({
					id: id,
					title: title,
					description: description,
					pictures: pictures,
					smallBoxes: small_boxes,
					mediumBoxes: medium_boxes,
					largeBoxes: large_boxes,
					other: other,
					ready: true})
			});
			// TODO: what if error
	}

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
		this.props.history.push(`/`);
	};

	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
	}

	removePic = (index) => {
		const pics = this.state.pictures;
		const picId = pics[index].id;

    	requester.delete(`${picId}/`)
    		.then(res => {
    			console.log(res);
    			// TODO: state stuff

    			pics.splice(index, 1);
				this.setState({pictures: pics});
    		});
    }

	handleSubmit = () => {
		const { id, title, description, smallBoxes, mediumBoxes, largeBoxes, other } = this.state;

		requester.put(`listings/${id}/`, {
			title: title,
			description: description,
			small_boxes: smallBoxes,
			medium_boxes: mediumBoxes,
			large_boxes: largeBoxes,
			other: other
		})
		.then(res => {
			console.log(res.data);
			this.setState({open: false});
			this.props.history.push(`/`);
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
				return <EditListingP1 values={values} handleChange={this.handleChange} removePic={this.removePic} />;
			default:
				return <EditListingP2 values={values} handleChange={this.handleChange} />;
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
			          	<div className="topNavbar">
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

		          	{this.state.step === 2 ?
			            <div className="bottomContainer">
		            		<button
		            			className="bottomButton primaryButton"
		            			onClick={this.handleSubmit}>
		            			Update
	            			</button>		
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

export default withRouter(withStyles({ }, { withTheme: true })(EditListing));
