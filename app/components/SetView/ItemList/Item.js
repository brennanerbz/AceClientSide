import React, { Component, PropTypes } from 'react';

import ItemProgress from './ItemProgress';
import ItemContent from './ItemContent';
import ItemActions from './ItemActions';


export default class Item extends Component {
	static propTypes = {
	}

	state = {
		mouseIsOver: false,
		starred: false,
		case: null
	}

	componentDidMount() {
		const { _case } = this.props;
		if(_case !== null && _case !== undefined) {
			this.setState({
				starred: _case.starred,
				case: _case
			})
		}
	}

	componentWillReceiveProps(nextProps) {
		const { _case, association, isFetchingSupplemental } = nextProps;
		if(!isFetchingSupplemental && _case !== null) {
			this.setState({
				case: _case,
				starred: _case.starred
			})
		}
	}

	starItem() {
		const { updateCase } = this.props;
		this.setState({
			starred: !this.state.starred
		})
		updateCase(this.state.case, {starred: !this.state.starred})
	}

	render() {
		return(
			<li 
				onMouseOver={() => this.setState({
					mouseIsOver: true
				})}
				onMouseLeave={() => this.setState({
					mouseIsOver: false
				})}>
				{
					this.state.case !== null 
					&& this.props.studied !== null
					&&
					<ItemProgress 
						_case={this.state.case}
					/>
				}
				<ItemContent {...this.props}/>
				<ItemActions
					starred={this.state.starred}
					handleStar={::this.starItem}
					mouseIsOver={this.state.mouseIsOver}
				/>
			</li>
		);
	}
}

