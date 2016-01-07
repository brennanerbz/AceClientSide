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
		isImporting: state.importView.isImporting
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
		rendered: false
	}

	componentDidMount() {
		if(this.props.importVisible) {
			this.setState({rendered: true})
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.importVisible) {
			this.setState({rendered: true})
		} else if(!nextProps.importVisible) {
			this.setState({rendered: false})
		}
	}

	render() {
		const { loggedIn, pushState, importVisible, isImporting, importText } = this.props,
			{ rendered } = this.state;
			close = require('../../assets/close.png');
		return(
			<DocumentTitle title='Import | Ace'>
				<div id="import_page_container" className={classnames({'rendered': rendered})}>
					<a id="escape_link"
						onClick={() => pushState(null, '/createset')}>
						<img 
						style={{
							height: '19.5px'
						}}
						src={close}/>
						<span>esc</span>
					</a>
					<ImportTextContainer
						importVisible={importVisible}
						importText={importText}
						isImporting={isImporting}
						pushState={pushState}
					/>
					<ImportInstructionsContainer/>
				</div>
			</DocumentTitle>
		);
	}
}
