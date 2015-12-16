import React, { Component, PropTypes } from 'react';
import classnames from 'classnames'
require('./Menu.scss');

class MenuItem extends Component {
	renderMenuItem(choice) {
		return(
			<li onClick={() => this.props.onSelect(choice)} 
				className={classnames("menu_item", 
			              {'danger': choice.indexOf('Delete') !== -1})}>
				<a className="">
					<i className="_icon"></i>
					{choice}
				</a>
			</li>
		);
	}

	renderDivider() {
		return(
			<li className="divider">
			</li>
		);
	}

	render() {
		const { choice } = this.props;
		return (
			choice == '|'
			? ::this.renderDivider()
			: ::this.renderMenuItem(choice)
		)
	}
}

export default class Menu extends Component {
	static propTypes = {
		// rect: PropTypes.function,
		choices: PropTypes.array
	}

	state = {
		menuTop: '',
		menuRight: '',
		menuLeft: ''
	}

	componentDidMount() {
		this.setMenuPositions()
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.isOpen && nextProps.rect() !== this.props.rect()) { this.setMenuPositions() }
	}

	setMenuPositions() {
	  const { rect, bounding, set, learn } = this.props;
	  var r = rect(); // measurements
	  if (bounding) {
	  	this.setState({
	  		menuTop: r.top + r.height + 10,
	  		menuRight: r.right,
	  		menuLeft: r.left - 115,
	  		menuWidth: r.width
	  	});
	  	return;
	  }
	  let height = r.height.replace('px', '')
	  if(learn) {
	  	height = Number(height) + 12 + 'px'
	  } else {
	  	 height = Number(height) + 5 + 'px'
	  }	 
	  let left;
	  if (set) {
	  	left = '55px'
	  } else {
	  	left = '25px'
	  }
	  this.setState({
	    menuTop: height,
	    menuRight: '0px',
	    menuLeft: left
	  })
	}

	renderMenu() {
		const { choices, side, bounding } = this.props;
		var mid_styles = {
			top: this.state.menuTop,
			// left: this.state.menuLeft
		}
		var right_styles = {
			top: this.state.menuTop,
			right: this.state.menuRight
		}
		var left_styles = {
			top: this.state.menuTop,
			left: this.state.menuLeft
		}
		var _menustyle;
		if(side == 'mid') {
			_menustyle = mid_styles
		}
		if(side == 'right') {
			_menustyle = right_styles
		}
		if(side == 'left') {
			_menustyle = left_styles
		}
		if(bounding) {
			_menustyle['width'] = this.state.menuWidth
		}
		return (
			<div style={_menustyle} className="menu flex_menu">
				<div className="menu_items_scroller">
					<ul className="menu_items">
						{
							choices !== undefined 
							? choices.map((choice, i) => {
								return (
									<MenuItem {...this.props} choice={choice} key={i}/>
								)
							})
							: null
							
						}
					</ul>
				</div>
			</div>
		)
	}

	render() {
		const { isOpen } = this.props;
		return(
			<div>
				{
					isOpen
					? ::this.renderMenu()
					: null
				}
			</div>
		);
	}
}