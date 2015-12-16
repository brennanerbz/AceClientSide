import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import AutoexpandTextarea from '../AutoexpandTextarea/AutoexpandTextarea';
import Autocomplete from '../Autocomplete/Autocomplete';

import { getStates, 
		 matchStateToTerm,
		 sortStates,
		 styles,
		 fakeRequest } from '../Autocomplete/Utils';

require('../Autocomplete/Autocomplete.scss');		 

export default class WordSide extends Component {
	static propTypes = {	
		onBlur: PropTypes.func,
		onChange: PropTypes.func,
		onFocus: PropTypes.func,
		flipActiveSide: PropTypes.func,		
		placeholder: PropTypes.string,
		activeSide: PropTypes.string,
	}

	constructor(props) {
		super(props)
		this.state = {
			terms: [],
			loading: false
		}
	}

	switchToWord = () => {
		const { activeSide, flipActiveSide } = this.props;
		if (activeSide === 'def') {
			flipActiveSide()
		}
	}
	autoFocus = () => {
		const { index } = this.props;
		this.refs['autocomplete' + index].focusSide()
	}
	
	render() {
		const { index, 
				asc_id,
				item,
				term_choices, 
				subjects, 
				getTermSuggestions } = this.props;
		return(
				<div className="WordSide">
					<div className="WordSide-textarea">				
						<div className="AutoExpandTextArea">
							<div className="AutoExpandTextArea-wrapper">
										<Autocomplete
									      {...this.props}
									      switchToWord={this.switchToWord}
										  className="AutoExpandTextArea-textarea"
								          ref={`autocomplete${index}`}
								          items={term_choices !== undefined ? term_choices : []}
								          getItemValue={(item) => item}
								          onSelect={(value, item) => {
								            this.setState({ terms: [ item ] })							           
								          }}
								          onInput={(event, value) => {
								            if(subjects !== undefined && subjects.length > 0) {
												this.setState({loading: true})
												getTermSuggestions(value, (items) => {
												  this.setState({ terms: items, loading: false })
												})
											}
								          }}
								          renderItem={(term, isHighlighted, index) => (
								            <div
								              className={classnames({ 'first_item': index == 0 } )}
								              style={isHighlighted ? styles.highlightedItem : styles.item}
								              key={term.abbr}
								              id={term.abbr}
								            >{term}</div>
								          )}
								        />
								</div>
							</div>
						</div>
					</div>
			
		);
	}
}


		