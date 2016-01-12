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
		const { _case, association, isFetchingInstances } = nextProps;
		if(!isFetchingInstances && _case !== null && _case !== undefined) {
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
		const { item,  isFetchingInstances, _case } = this.props;
		return(
			<li 
				onMouseOver={() => this.setState({
					mouseIsOver: true
				})}
				onMouseLeave={() => this.setState({
					mouseIsOver: false
				})}>
				{
					this.props.studied
					&& 
					!isFetchingInstances
					&&
					this.props._case !== undefined
					&&
					<ItemProgress 
						_case={_case}
						studied={this.props.studied}
						item={item}
						filteredStarredItems={this.props.filteredStarredItems}
					/>
				}
				{
					this.props.studied
					&&
					isFetchingInstances
					&&
					<div 
					style={{
						margin: '1px 0px',
						marginLeft: '10px',
						width: '35px',
						height: '35px',
						position: 'absolute',
					}} 
					className="sk-fading-circle">
					  <div className="sk-circle1 sk-circle"></div>
					  <div className="sk-circle2 sk-circle"></div>
					  <div className="sk-circle3 sk-circle"></div>
					  <div className="sk-circle4 sk-circle"></div>
					  <div className="sk-circle5 sk-circle"></div>
					  <div className="sk-circle6 sk-circle"></div>
					  <div className="sk-circle7 sk-circle"></div>
					  <div className="sk-circle8 sk-circle"></div>
					  <div className="sk-circle9 sk-circle"></div>
					  <div className="sk-circle10 sk-circle"></div>
					  <div className="sk-circle11 sk-circle"></div>
					  <div className="sk-circle12 sk-circle"></div>
					</div>
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

