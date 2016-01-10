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
		let { _case } = this.props;
		if(_case !== null && _case !== undefined) {
			this.setState({
				starred: _case.starred,
				case: _case
			})
		} 
	}

	componentWillReceiveProps(nextProps) {
		const { _case, association, isFetchingSupplemental } = nextProps;
		if(!isFetchingSupplemental && _case !== null && _case !== undefined) {
			this.setState({
				case: _case,
				starred: _case.starred
			})
		} else if (_case == undefined || _case == null) {
			this.setState({
				case: null,
				starred: false
			});
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
		const { item } = this.props;
		return(
			<li 
				onMouseOver={() => this.setState({
					mouseIsOver: true
				})}
				onMouseLeave={() => this.setState({
					mouseIsOver: false
				})}>
				{
					this.props.studied !== false
					&&
					<ItemProgress 
						_case={this.state.case}
						studied={this.props.studied}
						item={item}
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

