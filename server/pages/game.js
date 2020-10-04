import { Component } from 'react'
import Router from 'next/router'
import queryString from "query-string";

import Player from './classes/Classman'
import Town from './classes/Classtown'

class Game extends Component{
	constructor(props){
		super(props);
		this.jsonParams = {}
		this.player = new Player();
	}
	
	componentDidMount(){
		this.jsonParams = queryString.parse(Router.asPath.split(/\?/)[1]);
		this.player.enter_name(this.jsonParams.name);
		this.player.town.setTown(this.jsonParams.city);
	}
	
	render(){
		return (
			<div>
				<h1>Hello {this.player.username}. Wellcome to {this.player.town.townName}</h1>
				{this.player.render()}
				{this.player.town.render()}
			</div>
		);
		
	}
}
export default Game;
