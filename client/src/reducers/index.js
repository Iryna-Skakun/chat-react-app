import { combineReducers } from 'redux'
import messagesReducer from 'reducers/messages'
import peopleReducer from 'reducers/people'

const chatReducer = combineReducers({
	peopleReducer,
	messagesReducer
})

export default chatReducer