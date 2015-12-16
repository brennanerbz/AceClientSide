import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./ViewerAvatar.scss');

export default class ViewerAvatar extends Component {
	static propTypes = {
	}

	render() {
		return(
			<div className={classnames("")}>
				<Faceholder
					{...this.props}
				/>
			</div>
		);
	}
}

class Faceholder extends Component {
	static propTypes = {

	}
	render() {
		return(
			<div style={{
					width: this.props.dimension + "px",
					height: this.props.dimension + 'px',
					fontSize: '13px',
					fontWeight: '600',
					borderRadius: '50%'
				}} 
				className="circle avatar_component">
				<Image 
					src={this.props.photoUrl.length > 0
						? this.props.photoUrl 
						: this.props.defaultAvatar} 
					dimension={this.props.dimension}
				/>
			</div>
		)
	}
}

class Image extends Component {
	static propTypes = {

	}
	render() {
		return(
			<div>
				<img style={{
					width: this.props.dimension + "px",
					height: this.props.dimension + 'px'
				}} src={this.props.src}/>
			</div>
		)
	}
}