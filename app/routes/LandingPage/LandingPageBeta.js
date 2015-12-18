import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
require('./LandingPage.scss')
import SignUpForm from './SignUpForm';
import Modal from '../../components/Modal/modal';


export default class LandingPage extends Component {
	constructor(props, context) {
		super(props, context)
	}

	static propTypes = {
		
	}

	state = {
		modal_type: 'thank_you',
		email: null,
		on_waitlist: false, 
		modal_is_open: false,
		show_notification: false
	}

	setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";
	}

	componentDidMount() {
		let ck_value = this.getCookie('email')
		if(ck_value.length > 0) this.setState({email: ck_value, on_waitlist: true})
	}

	handleNotify(email) {
		::this.setCookie('email', email, 365)
		this.setState({
			show_notification: true,
			on_waitlist: true,
			email: email
		})
		setTimeout(() => {
			this.setState({
				show_notification: false
			})
		}, 6500)
	}


	render() {
		const drag_drop = require('../../assets/drag_drop_comp.png'),
			  practice_perfect = require('../../assets/practice_perfect.png'),
			  hero_image_bg = require('../../assets/hero_background_img.png'),
			  logo = require('../../assets/brand_logo.png');
		return(		
			<div className="landing_page">
				<div className="landing_page_container landing_beta">
					<div className="page_promo_wrapper">
						<div className="page_header_logo_wrapper">
							<div className="page_header_logo">
								<img style={{ width: '170px' }}  className="logo" src={logo}/>
							</div>
						</div>
						<div className="main_img_wrapper">
							<img className="hero_img" src={hero_image_bg}/>
						</div>
						<div className="page_content_panel">
							<div className="page_intro_txt">
								<h1>A study app that works for you</h1>
								<h2>Be one of the first to try Snapdocs beta, an app that instantly turns your notes, files and links into practice questions.
								</h2>
							</div>
							<div className="page_register_form">
								<SignUpForm 
									notify={(email) => {
										::this.handleNotify(email)
									}}
									beta={true} 
									onWaitlist={this.state.on_waitlist}
									shouldAutoFocus={true }
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="product_slides">
					<ul className="slide_list">
						<li className="slide" id="drag_drop">
							<section>
								<img src={drag_drop}/>
								<h1 className="header">
									Drag, drop and sync
								</h1>
								<p className="product_description">
									Not just your notes, or your problem set, but <b>all your files</b>, videos, PDFs, and documents can be stored, and transformed. <br/> <br/>  If you use services like YouTube or Wikipedia, just paste the link and the content will be <b>instantly transformable</b> too.
								</p>
							</section>
						</li>
						<li className="slide" id="share">
							<section>
								<h1 className="header">
									Snapdocs turns your material into questions
								</h1>
								<p className="product_description"> 
									Sometimes you don't have the time to type it all out. When you're on the go <b>you can instantly turn your documents into any interactive format you need</b>--from outlines, flashcards and tutorials to practice tests. 
								</p>
								<img style={{
									top: '58px',
								    right: '4.39rem',
								    height: '250px',
								    width: '250px'
								}}  src=""/>
							</section>
						</li>
						<li className="slide" id="learn">
							<section>
								<img src={practice_perfect}/>
								<h1 className="header">
									Practice until you're perfect
								</h1>
								<p className="product_description">
									 Bombed the last assignment? Your future is safe. Sign up for Acuit and <b>get grilled on your material with more examples, hints and step-by-step feedback</b>. Your progress will be stored, so you can learn about your mistakes and avoid them next time.
								</p>
							</section>
						</li>
					</ul>
				</div>
				<div className="last_call">
					<SignUpForm 
						notify={(email) => {
							::this.handleNotify(email)
						}}
						beta={true} 
						onWaitlist={this.state.on_waitlist}
						shouldAutoFocus={false} 
						last_call={true} />
				</div>
				<div style={{
					margin: '0 auto',
					textAlign: 'center',
					color: 'rgba(255, 255, 255, .4)',
					fontSize: '13px',
					letterSpacing: '.2px',
					lineHeight: '19px',
					padding: '1.5em'
				}} className="footer">	
					<p>&copy; Acuit 2015. The Apple logo is a trademark of it's respective owner.</p>
				</div>
				<div className="notify_wrapper">
					<span id="notify" className={classnames({'hide': !this.state.show_notification}, "success")}>
						<span className="notify_msg">
							You've been added to the Acuit waitlist using your <b>{this.state.email}</b> email.
						</span>
					</span>
				</div>
			</div>
		);
	}
}
