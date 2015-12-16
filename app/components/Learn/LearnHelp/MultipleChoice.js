import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class MultiChoiceItem extends Component {
	render() {
		const { choice } = this.props;
		return(
			<li className="mc_item"><span className={classnames({'last_child': this.props.index === 4})}>{choice}</span></li>
		);
	}
}

export default class MultipleChoice extends Component {
	static propTypes = {
		choices: PropTypes.array
	}

	render() {
		const { choices } = this.props;
		console.log(choices)
		return (
			<div>				
				<ul className="mc_choices">
					{
						choices !== null
						? choices.map((choice, i) => <MultiChoiceItem index={i} key={i} choice={choice}/>)
						: null
					}
				</ul>
			</div>
		);
	}
}
