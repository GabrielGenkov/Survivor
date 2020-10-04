import {Component} from 'react'
import Town from './Classtown'

class Player extends Component {
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
        document.getElementById('hop').innerHTML = this.fish_mooney;
    }

    render() {
        return(
        <div>
            <button onClick={() => this.moneyman(50)}>GET THE FISH!</button>
            <p id="hop">{this.fish_mooney}</p>
        </div>
        );
    }
}
export default Player;
