import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { pushState } from 'redux-router';
import DocumentTitle from 'react-document-title';
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react';

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
	}

	render() {
		let { location } = this.props, pathname = location.pathname, paths = pathname.split('/'), import_view = false;
		if(paths[1] == 'import') import_view = true
		return(
			<div id="create_page">

				<VelocityTransitionGroup 
					component="div"
					enter={{animation: 'slideDown', duration: 500, style: {height: ''}}}
		            leave={{animation: 'slideUp', duration: 500}}>
					<div id="velocity">
						{
							import_view
							&&
							<ImportView/>
						}
					</div>
				</VelocityTransitionGroup>
				
				{this.props.children}
			</div>
		);
	}
}