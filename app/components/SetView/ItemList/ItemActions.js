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
		const star = require('../../../assets/star.png'),
			  gold_star = require('../../../assets/gold_star.png'),
			{ mouseIsOver, starred } = this.props;
		return(
			<div className="actions">
				<div className="icons">
					{
						!mouseIsOver
						&&
						<img className="placeholder" 
							src={
								starred
								? gold_star
								: star
							} />
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
							<img 
								src={
									this.state.mouseIsOverActions || starred
									?
									gold_star
									:
									star
								}/>
						</button>
					}
				</div>
			</div>
		);
	}
}