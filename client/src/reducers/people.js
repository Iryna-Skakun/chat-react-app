import constants from 'constants'

const peopleReducer = (state = [], action) => {
	switch(action.type) {
		case constants.CONNECTED_NEW_USER:
			return state.concat({
				id: action.userID,
				userName: action.userName
			})
		case constants.DISCONNECTED_USER:
			return state.filter(u => {
				return u.id !== action.userID
			})
		default:
			return state
	}
}

export default peopleReducer