import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ScrollBar extends Component {
	static propTypes = {
	}

	componentDidMount() {
		
	}

	render() {
		const { scrollMarginLeft, viewHeight, scrollBarHeight, top } = this.props;
		return(
			<div style={{
					marginLeft: scrollMarginLeft + 5,
					height: viewHeight
				}} 
				className="scroll_bar">
				<div style={{
						left: '-3px',
						height: scrollBarHeight,
						top: top
					}} 
					onMouseDown={(e) => {
						
					}}
					onMouseMove={(e) => {
						// console.log(e.pageX)
						// console.log(e.pageY)
					}}
					className="scroll_handler">
					<div className="scroll_inner">
					</div>
				</div>
			</div>
		);
	}
}