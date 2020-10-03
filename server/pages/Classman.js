import {Component} from 'react'
import Town from './Classtown' 
class Welcome extends Component {
    constructor(props){
        super(props);
        this.username = "";
        this.town = new Town();
        this.fish_mooney = 0;
    }

    enter_name(name){
        this.username = name;
    }
    moneyman(fish){
        this.fish_mooney += fish;
        console.log(this.fish_mooney);
    }

    render() {
        return<div> <h1>Hello, {this.props.name}</h1>
            <button onClick={() => this.moneyman(50)}>GET THE FISH!</button>
        </div>
    }
  }
  export default Welcome;