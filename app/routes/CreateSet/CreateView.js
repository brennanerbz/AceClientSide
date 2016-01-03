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
		importWidth, importHeight, viewPort = $(window)[0], createChildrenWithProps;
		if(paths[2] == 'import' || paths[1] == 'import') import_view = true

		importWidth = viewPort.innerWidth
		importHeight = viewPort.innerHeight

		createChildrenWithProps = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				importVisible: import_view
			})
		})

		return(
			<div id="create_page">
				<VelocityComponent>
					<div 
					style={{
						height: importHeight,
						width: importWidth
					}}
					className={classnames('importView', 
						{'isShowing': import_view},
						{'isHidden': !import_view}
						)}>

						<ImportView
							importVisible={import_view}
						/>
							
					</div>
				</VelocityComponent>
				<VelocityComponent runOnMount={true} animation={{ opacity: true ? 1 : 0 }} duration={500}>
					<div>
						<div className={classnames("fs_modal_bg", {'active': !import_view})}></div>
						<div className={classnames({'active': !import_view}, 'fs_modal')}>
						{createChildrenWithProps}
						</div>
					</div>
				</VelocityComponent>
			</div>
		);
	}
}