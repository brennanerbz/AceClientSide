import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as erroractions from '../../actions/error';
require('./ErrorPage.scss')

@connect(state => ({
	}),
	dispatch => ({
		...bindActionCreators({
			...erroractions
		}, dispatch)
	})
)
export default class ErrorPage extends Component {
	static propTypes = {
	}

	componentDidMount() {
		this.props.showError()
	}

	componentWillUnmount() {
		this.props.hideError()
	}

	render() {
		const sad_face = require('../../assets/sad_face.png'),
		  	  brand_logo = require('../../components/Header/assets/FlunkLogo.png');
		return(
			<div className="">
				<div className="error_page">
					<div className="error_card">
						<div className="error_msg">
							<img src={brand_logo} className="brand_logo"/>
							<p className="error"><b>404. </b>That's an error.</p>
							<p className="error">To learn more about website errors, &nbsp;
							<Link className="link"
							   	  to="/search/concepts/error"> 
							   	   click here.
							</Link>
							<br/>
							Or, just head back &nbsp;  
							<Link className="link"
								  to="/"> 
								  home.
							</Link>
							</p>
						</div>
						<div className="error_logo">
							<img src={sad_face} className="logo"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}