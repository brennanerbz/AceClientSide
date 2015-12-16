import React, { Component, PropTypes } from 'react';

export default class Controls extends Component {
	static propTypes = {

	}

	render() {
		const left = require('../../../assets/arrow_left.png'),
			  right = require('../../../assets/arrow_right.png');
		return (
			<div>
				<i 
					style={{cursor: 'pointer'}} 
					className="arrow arrow_left" 
					// onClick={() => this.props.skip('prev')}					
					><img src={left}/>
				</i>
					
				<i 
					style={{cursor: 'pointer'}}
					className="arrow arrow_right"
					// onClick={() => this.props.skip('next')}
					><img src={right}/>
				</i>
			</div>
		);
	}
}
