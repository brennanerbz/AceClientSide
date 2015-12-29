import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { pushState } from 'redux-router';
import DocumentTitle from 'react-document-title';
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react';

require('./CreateView.scss');
/* Import view */
import ImportView from '../Import/Import';

@connect(state => ({
	location: state.router.location,
	user: state.user.user
	}),
	dispatch => ({
		...bindActionCreators({
			pushState
		}, dispatch)
	})
)
export default class CreateView extends Component {
	static propTypes = {
		location: PropTypes.object
	}

	render() {
		let { location } = this.props, pathname = location.pathname, paths = pathname.split('/'), import_view = false,
		importWidth, importHeight, viewPort = $(window)[0]
		if(paths[1] == 'import') import_view = true

		importWidth = viewPort.innerWidth
		importHeight = viewPort.innerHeight

		return(
			<div id="create_page">
				<div 
				style={{
					height: importHeight,
					width: importWidth
				}}
				className={classnames('importView', {'slideDown': import_view})}>
					{
						import_view
						&&
						<VelocityComponent animation={{opacity: import_view ? 1 : 0}} duration={500}>
							<ImportView/>
						</VelocityComponent>
					}
				</div>
				{this.props.children}
			</div>
		);
	}
}