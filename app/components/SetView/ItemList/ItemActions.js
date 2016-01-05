import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';


export default class ItemActions extends Component {
	static propTypes = {
	}

	state = {
		mouseIsOverActions: false
	}

	componentDidMount = () => {
		$("[data-toggle='tooltip']").tooltip({
			delay: { show: 400, hide: 50}
		})
	}

	render() {
		let star = require('../../../assets/star.png'),
		    gold_star = require('../../../assets/gold_star.png'),
		    gold_star_fill = require('../../../assets/goldStarFill.png'),
		    icon,
			{ mouseIsOver, starred } = this.props;
		icon = star;
		if(this.state.mouseIsOverActions) {
			icon = gold_star
		}
		if(starred) {
			icon = gold_star_fill
		} 
		return(
			<div className="actions">
				<div className="icons">
					{
						!mouseIsOver
						&&
						<img className="placeholder" src={icon}/>
					}
					{
						mouseIsOver
						&&
						<button className="toggle_btn star"
								data-toggle="tooltip"
								data-placement="bottom"
								title="Select"
								onClick={this.props.handleStar}
								onMouseOver={() => {
									this.setState({
										mouseIsOverActions: true
									})
								}}
								onMouseLeave={() => {
									this.setState({
										mouseIsOverActions: false
									})
								}}>
							<img src={icon}/>
						</button>
					}
				</div>
			</div>
		);
	}
}