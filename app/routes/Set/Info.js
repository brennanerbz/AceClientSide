import React, { Component, PropTypes } from 'react';
import SetInfo from '../../components/SetView/SetInfo/SetInfo';

export default class Info extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div>
				<SetInfo 
					assignment={this.props.assignment}
					creator_id={this.props.creator_id}
					creator_username={this.props.creator_username} 
					id={this.props.id}
					doc={this.props.doc}
					item_count={this.props.item_count}
					purpose={this.props.purpose}
					set={this.props.set}
					subjects={this.props.subjects}
					pushState={this.props.pushState}
				/>
			</div>
		);
	}
}