import React, { Component } from 'react'
import PeopleList from 'containers/PeopleList'
import MessagesList from 'containers/MessagesList'
import authHOC from 'containers/authHOC'


class ChatWrap extends Component {
	render() {
		return (
			<div>
				<PeopleList />
				<MessagesList />
			</div>
		)
	}
}

export default authHOC(ChatWrap)