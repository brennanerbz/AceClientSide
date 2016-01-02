import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

String.prototype._textWidth = function(font) {
	var f = font || '18px Lato',
		o = $('<div>' + this + '</div>')
			.css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': f})
			.appendTo($('body')),
		w = o.width();

	o.remove();

	return w;
}

export default class MessageBody extends Component {
	static propTypes = {

	}

	buildCueMessage(msg) {
		return msg.text
	}

	buildUserMessage(msg) {
		return msg.text
	}

	buildFeedbackMessage(msg) {
		return msg.text
	}

	buildFormatMessage(msg) {
		if(msg.subtype == 'mc') {
			var mcList = msg.text.split("|"),
				preElements = []
			mcList.forEach(m => {
				preElements.push(
				<pre 
					style={{
						width: m._textWidth() + 15.5,
						cursor: 'pointer'
					}} 
					className="special_formatting">
					{m}
				</pre>
			)})
			return preElements
		} else {
			return msg.text
		}
	}

	render() {
		const { message } = this.props;
		return (
			<span className="message_body">
				{
					message.type == 'cue'
					&& ::this.buildCueMessage(message)
				}
				{
					message.type == 'answer'
					&& ::this.buildUserMessage(message)
				}
				{
					message.type == 'reply'
					&& ::this.buildFeedbackMessage(message)
				}
				{
					message.type == 'hint'
					&& ::this.buildFormatMessage(message)
				}
			</span>
		);
	}
}


