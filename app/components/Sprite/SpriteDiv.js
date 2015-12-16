import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
require('./SpriteDiv.scss');

export default class SpriteDiv extends Component {
	static propTypes = {
	}

	render() {
		let { text, name } = this.props,
		learn = require('../../assets/pencil.png'),
		open, 
		edit = require('../../assets/scissors.png'),
		delete_icon = require('../../assets/delete.png'),
		icon;
		if(name == 'learn') icon = learn
		else if(name == 'open') icon = open
		else if(name == 'edit') icon = edit
		else if(name == 'delete') icon = delete_icon
		return(
			<div className="sprite_div">
				{
					false // wait until better icons
					&&
					<div className={classnames("sprite_frame", 
						{"small": true}, 
						{"icon_left": true})}>
						<img className="sprite" 
							 src={icon}/>
					</div>
				}
				<div className={classnames("sprite_text", 
					{'danger': this.props.name == 'delete'})}>
					{text}
				</div>
			</div>
		);
	}
}