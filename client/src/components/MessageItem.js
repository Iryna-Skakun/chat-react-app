import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MessageItem extends Component {
	render() {
        const props = this.props;
        const time = new Date(props.time);
		return (
			<li className="clearfix">
				<div className="message-data align-right">
					<span className="message-data-time">{`${time.getHours()}:${time.getMinutes()}`} </span> &nbsp; &nbsp;
					<span className="message-data-name">{props.author}</span> <i className="fa fa-circle me"></i>
				</div>
				<div className="message other-message float-right">
                    {props.text}
				</div>
			</li>
		)
	}
}

MessageItem.propTypes = {
    time: PropTypes.string,
    author: PropTypes.string,
    text: PropTypes.string
};