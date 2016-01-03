import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./ViewerAvatar.scss');

export default class ViewerAvatar extends Component {
	static propTypes = {
	}

	render() {
		return(
			<Faceholder
				{...this.props}
			/>
		);
	}
}

class Faceholder extends Component {
	static propTypes = {

	}
	render() {
		return(
			<span style={{
					width: this.props.dimension + "px",
					height: this.props.dimension + 'px',
					fontSize: '13px',
					fontWeight: '600',
					borderRadius: '50%'
				}} 
				className="avatar_component">
				<Image 
					src={this.props.photoUrl.length > 0
						? this.props.photoUrl 
						: this.props.defaultAvatar} 
					dimension={this.props.dimension}
				/>
			</span>
		)
	}
}

class Image extends Component {
	static propTypes = {

	}
	render() {
		return(
			<img 
				style={{
					width: this.props.dimension + "px",
					height: this.props.dimension + 'px',
					borderRadius: '0.4em'
				}} 
				src={this.props.src}
			/>
		)
	}
}