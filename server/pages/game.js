import { Component } from 'react'
import Router from 'next/router'
import {useRouter} from 'next/router'
import queryString from "query-string";


class Game extends Component{
	constructor(props){
		super(props);
		this.jsonParams = queryString.parse(Router.asPath.split(/\?/)[1]);
	}
	
	render(){
		return (
			<h1>Hello {this.jsonParams.name}. Wellcome to {this.jsonParams.city}</h1>
		);
		
	}
}
export default Game;
