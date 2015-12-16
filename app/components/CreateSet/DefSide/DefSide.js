import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Autocomplete from '../Autocomplete/Autocomplete';
import { getStates,
		 matchStateToTerm,
		 sortStates,
		 styles,
		 fakeRequest } from '../Autocomplete/Utils';

require('../Autocomplete/Autocomplete.scss');

export default class DefSide extends Component {
	static propTypes = {	
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		flipActiveSide: PropTypes.func,		
		placeholder: PropTypes.string,
		activeSide: PropTypes.string,
	}

	constructor(props) {
	  super(props);
	  this.state = {
	    defs: [],
	    loading: false
	  }
	}

	handleClick = () => {

	}

	switchToDef = () => {
		const { activeSide, flipActiveSide } = this.props;
		if (activeSide === 'word') {
			flipActiveSide()
		}
	}

	autoFocus = () => {
		const { index } = this.props;
		this.refs['autocomplete' + index].focusSide()
	}

	render() {
		const { index, 
				def_choices, 
				getDefSuggestions, 
				updateAssociation,
				item, 
				association,
				subjects } = this.props;
		// console.log(item.cue)
		return(
			<div className="DefSide">
				<div className="DefSide-textarea">
					<Autocomplete
				      {...this.props}
				      // debug={true}
				      switchToDef={this.switchToDef}
					  className="AutoExpandTextArea-textarea"
			          ref={`autocomplete${index}`}
	                  // items={def_choices !== undefined ? def_choices : []}
	                  // getItemValue={(_item) => _item.cue}
	                  // onSelect={(value, _item) => {
	                  //    this.setState({ defs: [ _item.cue ]})
	                  //    updateAssociation(association, 
	                  //    				  {name: 'item', prop: _item}, 
	                  //    				  {name: 'item_id', prop: _item.id },
	                  //    				  {name: 'item_adopted', prop: true})
	                  // }}
	                  // onInput={(event, value) => value}
	            //       onFocus={(event, value) => {
	            //          if(subjects !== undefined && subjects.length > 0 && item !== null) {
	         			// 	this.setState({loading: true})
	         			// 	getDefSuggestions(item.id)
	         			// 	setTimeout(() => {
	         			// 		getDefSuggestions(item.id)
	         			// 	}, 250)
	         			// }
	            //        }}
	                  // renderItem={(_item, isHighlighted, index) => (
	                  //    <div
	                  //      className={classnames({ 'first_item': index == 0 })}
	                  //      style={isHighlighted ? styles.highlightedItem : styles.item}
	                  //      key={_item.abbr}
	                  //      id={_item.abbr}>
	                  //      {_item.cue}
	                  //    </div>
	                  //  )}					          
			        />
				</div>
			</div>
		);
	}
}

				