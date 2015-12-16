import React, { Component, PropTypes } from 'react';
import moment from 'moment';

export default class SavingLabel extends Component {
	static propTypes = {
	}

	state = {
		message: ''
	}

	componentWillMount() {
		if(this.props.set == null) this.setState({message: 'Draft'})
		if(this.props.set !== null) { 
			this.setState({message: `Created ${moment.utc(this.props.set.creation).fromNow()}`});
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.isCreatingSet 
			|| nextProps.isUpdatingSet 
			|| nextProps.isCreatingItem) {
			this.setState({
				message: 'Saving...'
			});
			setTimeout(() => {
				this.setState({
					message: this.props.set == null ? 'Draft' : 'Saved'
				});
			}, 500)
			return;
		}	
	}

	render() {
		return(
			<div className="saving_label">
				<div className="saving_message">
					{ this.state.message }
				</div>
			</div>
		);
	}
}