import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class EndDisplayHelp extends Component {
	static propTypes = {
	}

	render() {
		const { paddingHeight, setName, setId } = this.props,
		acuBotLogo = require('../../../../assets/slackbot_icon.png');
		return(
			<div style={{}} id="end_help">
				<div id="end_display_help">
					<div style={{height: paddingHeight}} id="end_display_padder">
					</div>
					<div id="end_display_meta">
						<h1 className="small_bottom_margin set_name">
							<a>{setName}</a>
						</h1>
						<p className="small_bottom_margin set_intro">
							<span className="octicon">
								<img style={{height: '40px'}} src={acuBotLogo}/>
							</span>
							This is the very beginning of your practice mode with Acubot. Acubot tries to be helpful, but is only a bot, after all.
						</p>
						<p className="small_bottom_margin set_intro">
							<span className="octicon info"></span>
							<strong>Info:</strong> Acubot will ask you questions on the material you've entered, give you helpful feedback if you make a mistake and offer more examples. Here is the first question...
						</p>
					</div>
				</div>
			</div>
		);
	}
}

/* SETTINGS LINK *

<ul className="end_display_actions">
	<li>
		<img className="settings icon"/>
	</li>
</ul>
<a>Change settings</a>
/* */