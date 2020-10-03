import { Component } from 'react'
import Router from 'next/router'
import {useRouter} from 'next/router'


class Game extends Component{
	constructor(props){
		super(props);
		console.log(this.props)
	}
	
	componentDidMount(){
  		console.log(Router.query);
	}
	
	render(){
		return (
			<h1>Hello</h1>
		);
		
	}
}
export default Game;
