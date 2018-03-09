import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserItem from 'components/UserItem'

class PeopleList extends Component {
	render() {
		return (
			<div className="people-list" id="people-list">
				<ul className="list">
					{this.props.people.map(u => {
						return <UserItem key={u.id} userName={u.userName} />
					})}
				</ul>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		people: state.peopleReducer
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		dispatch
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PeopleList)

PeopleList.propTypes = {
    people: PropTypes.array
};
