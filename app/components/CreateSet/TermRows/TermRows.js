import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import TermRow from '../TermRow/TermRow';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

export default class TermRows extends Component {
	static propTypes = {
		dispatch: PropTypes.func,
		addRow: PropTypes.func,
		resize: PropTypes.func,
		adjustScroll: PropTypes.func,
	}

	state = {
		isHoveringOverSwitch: false
	}

	componentDidMount = () => {
	  window.addEventListener('resize', this.handleResize); 
	}

	componentWillUnmount = () => {
	  window.removeEventListener('resize', this.handleResize)
	}

	componentWillReceiveProps(nextProps) {
		const { associations_length } = this.props;
		if(nextProps.associations_length > associations_length && nextProps.associations_length > 5) this.scrollToBottom()
	}

	handleResize = () => {
	  this.props.resize()
	}

	scrollToBottom() {
		const node = document.body;
		node.scrollTop = node.scrollHeight 
	} 

	render() {
	  const { associations_order, associations, items } = this.props,
	  {isHoveringOverSwitch} = this.state,
	  flipSwitchIcon = require('../../../assets/flipSwitchIcon.png'),
	  flipSwitchIconActive = require('../../../assets/flipSwitchIconActive.png')
	  return(
				<div className="TermRows"
					 ref="term_rows">
				      <div className="TermRow">
				        <div className="TermRow-content row-labels">
				          <div className="TermContent">
				            <div className="TermContent-wrap">
				              <div className="TermContent-side word-side">
				                <p>Terms</p>
				                <LanguageSelect
				                	termSide={true}
				                />
				                <span className="flip_button_wrapper right">
				                	<button 
				                	style={{
				                		padding: '7px 9.5px 8px'
				                	}}
				                	onMouseOver={() => this.setState({isHoveringOverSwitch: true})}
				                	onMouseLeave={() => this.setState({isHoveringOverSwitch: false})}
				                	className="button outline">
				                		<img src={isHoveringOverSwitch ? flipSwitchIconActive : flipSwitchIcon}/>
				                	</button>
				                </span>
				              </div>
				              <div className="TermContent-side def-side">
				                <p>Definitions</p>
				                <LanguageSelect
				                	termSide={false}
				                />
				              </div>
				            </div>
				          </div>
				        </div>
				      </div>
						{     
						associations_order.map((id, i) => {
							let association, item;

							association = id !== null 
							? associations[id]
							: null,

							item = association !== null && association !== undefined && items !== undefined
							? items[association.item_id]
							: null

							return (
								<TermRow
									asc_id={id}
									ref={`row${i}`}  
									total_count={this.props.associations_length}
									index={i}
									key={`row${i}`}
									id={this.props.id}
									association={association}
									item={item}
									rows={this.props.rows}
									createItem={this.props.createItem}
									updateItem={this.props.updateItem}
									deleteRow={this.props.deleteRow}
									addRow={this.props.addRow}
									resizing={this.props.resizing}
									editing={this.props.editing}
									able_to_spark={this.props.able_to_spark}
									rendered={this.props.rendered}
									finishedRendering={this.props.finishedRendering}
								/>
							)})	          
						}
			        <div className="TermRow add_row"
			        	 ref="add_row"
			        	 onClick={() => this.props.addRow()}
			        	 title="Add a row">
			        	<span className="add_icon">+</span>
			        </div>
			    </div>
		);
	}
}
