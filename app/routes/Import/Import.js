import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import DocumentTitle from 'react-document-title';

/* Actions */
import * as importActions from '../../actions/import';
/* Components */
import ImportTextContainer from '../../components/Import/Containers/ImportTextContainer';
import ImportInstructionsContainer from '../../components/Import/Containers/ImportInstructionsContainer';

require('./Import.scss');

@connect(state => ({
		loggedIn: state.user.logged_in,
		import: state.import
	}), 
	dispatch => ({
		...bindActionCreators({
			...importActions,
			pushState
		}, dispatch)
	})
)
export default class ImportView extends Component {
	static propTypes = {
	}

	state = {
		
	}

	componentDidMount() {
		
	}

	render() {
		const { loggedIn, pushState } = this.props;
		return(
			<DocumentTitle title='Import | Ace'>
				<div id="import_page_container">
					<a id="escape_link"
						onClick={() => pushState(null, '/createset')}>
						Escape
					</a>
					<ImportTextContainer/>
					<ImportInstructionsContainer/>
				</div>
			</DocumentTitle>
		);
	}
}
