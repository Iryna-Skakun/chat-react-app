import React, { Component } from 'react'

export default class PeopleSearch extends Component {
    render() {
        return (
	        <div className="search">
		        <input type="text" placeholder="search" />
		        <i className="fa fa-search" />
	        </div>
        )
    }
}