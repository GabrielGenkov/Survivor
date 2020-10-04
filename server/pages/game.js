import { Component } from 'react'
import Router from 'next/router'
import ReactDOM from 'react-dom'
import queryString from "query-string";

import Player from './classes/Classman'
import Town from './classes/Classtown'
import Pong from './pong'

class Game extends Component{
	constructor(props){
		super(props);
		this.jsonParams = {}
		this.player = new Player();
		this.wins = {pong:0, tictactoe:0, dodger:0}
		this.loses = {pong:0, tictactoe:0, dodger:0}
		this.pong = this.pong.bind(this);
	}
	
	componentDidMount(){
		this.jsonParams = queryString.parse(Router.asPath.split(/\?/)[1]);		
		this.player.enter_name(this.jsonParams.name);
		this.player.town.setTown(this.jsonParams.city);
		if(this.jsonParams.player !== undefined){
			Object.assign(this, this.jsonParams.player);
		}
		if(this.jsonParams.winner !== undefined){
			if(this.jsonParams.winner)this.wins.pong++;
			else this.loses.pong++
		}
	}
	
	pong(){
		Router.push({pathname: '/pong', query: {name: this.player.username, city: this.player.town.townName, player: this}})
	}
	
	render(){
		return (
			<div id="game">
				<style jsx global>{`
      				body {
						background: #FAAAAA;
						color: black;
						text-align: center;
					  }
					  
					  button{
						background-color: black;
						border: none;
						color: white;
						padding: 15px 32px;
						text-align: center;
						text-decoration: none;
						display: inline-block;
						font-size: 16px;
						margin: 4px 2px;
						cursor: pointer;
						border-radius: 35%;
					  }
					  button:hover {background-color: #e77722;}

    			`}</style>
				<h2 id="hello">Hello {this.jsonParams.name}. Wellcome to {this.jsonParams.city}!</h2>
				{this.player.render()}
				{this.player.town.render()}
				<button onClick={this.pong}>Pong!</button>
			</div>
		);
		
	}
}
export default Game;
