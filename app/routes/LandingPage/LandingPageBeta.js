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
		show_notification: false,
		features: [
			{
				heading: 'Drag, drop and sync',
				body: 'Not just your notes, but all your docs, YouTube videos, Wikipedia articles and PDFs can be kept in Acuit.',
				img: require('../../assets/drag_drop_comp.png')
			},
			{
				heading: 'Instantly turn your material into questions',
				body: 'Acuit reads the material you upload, and automatically creates practice questions. That way, studying is faster than ever before.',
				img: require('../../assets/turn_into_questions.png')
			},
			{
				heading: 'Practice until you\'re perfect',
				body: 'Test yourself on your material with more automated examples, hints and step-by-step feedback. As you progress, you\'ll learn how and why you made your mistakes so you can avoid them next time.',
				img: require('../../assets/practice_perfect.png')
			},
		]
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

	renderFeatures() {
		return this.state.features.map((feature, i) => {
			const { heading, body, img } = feature,
					tag = heading.split(' ').join('').slice(0, 5),
					normal_height = Math.round($(window).height() / 3.9),
					big_height = Math.round($(window).height() / 2.65),
					text = (
						<div className="text">
							<h2 className="header">
								{heading}
							</h2>
							<p className="body">
								{body}
							</p>
						</div>
					),
					media = (
						<div className="media">
							<h2 className="header header_responsive">{heading}</h2>
							<img 
								style={{
									height: i & 1 ? big_height : normal_height
								}}
								className={classnames("image_responsive" , {'big': i & 1})} 
								src={img}/>
							<div className="image_wrapper">
								<img 
									style={
										{
											marginTop: i == 0 ? '10px' : '0'
										}
									}
									className={classnames("image" , {'big': i & 1})}
									src={img}/>
							</div>
						</div>
					)
			return(
				<article key={tag} className="content_row">
					<article className={classnames("media_text", {'alt_order': !(i & 1) })}>
						<div>
							<div className="media_text_wrapper">
								{
									(i & 1)
									? media
									: text
								}
							</div>
							<div className="media_text_wrapper">
								{
									(i & 1)
									? text
									: media
								}
							</div>
						</div>										
					</article>
					<section className="expanding_section">
					</section>
				</article>
			)
		})	
	}


	render() {
		const logo = require('../../assets/brand_logo.png'),
			  hero_image_bg = require('../../assets/hero_background_img.png'),
			  slackLogo = require('../../assets/slackLogo.png')
		return(		
			<div className="landing_page">
				<div className="landing_page_container landing_beta">
					<div className="page_promo_wrapper">
						<div className="main_img_wrapper">
							<img className="hero_img" src={hero_image_bg}/>
						</div>
						<div className="page_content_panel">
							<div className="page_intro_txt">
								<h1>A study app that works for you</h1>
								<h2>Be the first to try Acuit beta, an app that instantly turns your notes into practice questions.
								</h2>
							</div>
							<div className="page_register_form">
								<SignUpForm 
									notify={(email) => {
										::this.handleNotify(email)
									}}
									beta={false} 
									last_call={false}
									onWaitlist={this.state.on_waitlist}
									shouldAutoFocus={true }
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="separator">
					<hr/>
				</div>
				<section className="features_container twelve_col">
						{::this.renderFeatures()}
				</section>
				<div className="separator">
					<hr/>
				</div>
				<div className="last_call">
					<SignUpForm 
						notify={(email) => {
							::this.handleNotify(email)
						}}
						beta={false} 
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
