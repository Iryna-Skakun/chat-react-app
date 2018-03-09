import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class UserItem extends Component {
	render() {
		return (
			<li className="clearfix">
				<img src={`https://robohash.org/${this.props.userName}.png?size=45x45`} alt="avatar"/>
				<div className="about">
					<div className="name">{this.props.userName}</div>
					<div className="status">
						<i className="fa fa-circle online"/> online
					</div>
				</div>
			</li>
		)
	}
}

UserItem.propTypes = {
    userName: PropTypes.string
};