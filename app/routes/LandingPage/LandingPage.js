import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
require('./LandingPage.scss')
import SignUpForm from './SignUpForm';

export default class LandingPage extends Component {
	constructor(props, context) {
		super(props, context)
	}

	static propTypes = {
		
	}

	render() {
		const compose = require('../../assets/compose.png'),
			  upload = require('../../assets/upload.png'),
			  // chat = require('../../assets/chat.png'),
			  desk = require('../../assets/desk_drawing.png'),
			  file_formats = require('../../assets/file_formats.png'),
			  sample_share = require('../../assets/sample_share.png'),
			  sample_learn = require('../../assets/sample_learn.png'),
			  school_logos = require('../../assets/sample_schools.png'),
			  chat = require('../../assets/chat_icon.png'),
			  doc = require('../../assets/set_icon_lines.png'),
			  cards = require('../../assets/flashcards.png'),
			  quiz = require('../../assets/quiz_program.png');
		return(		
			<div className="landing_page">
				<div className="landing_page_container">
					<div className="marketing_copy">
						<h1>Join the Flunkt beta</h1>
						<p className="product_description">A new, automated <span className="underline">learning tool</span> that helps you<br/> transform your documents into <br/> interactive questions.</p>
					</div>
					<div className="sign_up">
						<SignUpForm shouldAutoFocus={true} />
					</div>
				</div>
				<div className="sample_transform">
					<p className="call_to_action">
					Transform a YouTube video or Wikipedia article
					</p>
					<input placeholder="Link goes here"/>
					<button className="button outline">Try it</button>
				</div>
				<div className="product_slides">
					<ul className="slide_list">
						<li className="slide" id="drag_drop">
							<section>
								<img src={file_formats}/>
								<h1 className="header">
									Drag, drop and transform.
								</h1>
								<p className="product_description">
									Not just a link or your class notes, but <b>all your files,</b> images, videos, PDFs, and documents can be dropped into Ace and <b>transformed into practicable questions. </b> 
								</p>
							</section>
						</li>
						<li className="slide" id="share">
							<section>
								<h1 className="header">
									Collaborate without pressure.
								</h1>
								<p className="product_description"> 
									Now you can share material <b>without having to worry</b> if what you made is good enough. Flunkt uses the source material you put in to create the new documents. Of course, you can still make all the changes you want.
								</p>
								<img src={sample_share}/>
							</section>
						</li>
						<li className="slide" id="learn">
							<section>
								<img src={sample_learn}/>
								<h1 className="header">
									Learn your stuff, with enhancements.
								</h1>
								<p className="product_description">
									 Bombing a test or losing an argument means embarrasment. Flunkt adapts to the material you put in with <b>more examples, facts and step-by-step feedback</b> so you never feel overwhelmed when the challenge arises.
								</p>
							</section>
						</li>
					</ul>
				</div>
				<section className="happy_users">
					<div className="section_content">
						<h3>Thousands of happy beta testers, from:</h3>
						<img src={school_logos} />
					</div>
				</section>
				<div className="last_call">
					<SignUpForm shouldAutoFocus={false} last_call={true} />
				</div>
				<div className="footer">	
					<ul className="footer_links">
						<div className="left">
							<a className="">Students</a>
							<a className="">Teachers</a>
						</div>
						<div className="right">
							<a className="">Terms</a>
							<a className="">Privacy</a>
						</div>
					</ul>
				</div>
			</div>
		);
	}
}

/*
<ul>
	<li>
		<img src={chat}/>
		<p>Interactive questions</p>
	</li>
	<li>
		<img src={doc}/>
		<p>Outlines</p>
	</li>
	<li>
		<img src={cards}/>
		<p>Flashcards</p>
	</li>
	<li>
		<img src={quiz}/>
		<p>Tests</p>
	</li>
</ul>
*/

// <button className="google_button button">
// 	<img className="icon" 
// 		 src={g_icon}/>
// 	Sign up with Google
// </button>
// <button className="facebook_button button">
// 	<img className="icon"
// 		 src={f_icon}/>
// 	Sign up with Facebook
// </button>