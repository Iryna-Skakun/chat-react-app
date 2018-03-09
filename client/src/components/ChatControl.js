import React, { Component } from 'react'
import ws from 'util/ws'

export default class ChatControl extends Component {
    sendMessage() {
        ws.emit(this.textarea.value);
        this.textarea.value='';
    }

	render() {
		return (
			<div className="chat-message clearfix">
				<textarea placeholder="Type your message" rows="4" ref={(textarea) => this.textarea = textarea}/>
				<button onClick={this.sendMessage.bind(this)}>Send</button>
			</div>
		)
	}
}