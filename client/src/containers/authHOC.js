import React, { Component } from 'react'
import ws from 'util/ws'


export default (ChildComponent) => {
	return class authHOC extends Component {
		auth() {
			if( localStorage.getItem('auth') ) return true

			let name = prompt('Enter your name: ')

			if( !name || !name.trim().length ) {
				return false
			}

			localStorage.setItem('auth', name)
			ws.emit(name)
			return true
		}

		noName() {
			return <div className="noname-wrap">
				You didn't enter name :C
				<br/>
				<button onClick={() => { location.reload() }}>try again?</button>
			</div>
		}

		render() {
			return (
				this.auth() ? <ChildComponent /> : this.noName()
			)
		}
	}
}