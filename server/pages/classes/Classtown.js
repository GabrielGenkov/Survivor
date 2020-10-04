import {Component} from 'react'

class Town extends Component {
    constructor(props){
        super(props);
        this.townName = '';
        this.bank = 1;
        this.town_hall = 1;
        this.sport = 1;
        this.radio_tv = 1;
        this.max_lvl = 5;
        this.promenliva = this.upgrade.bind(this);
    }
	
	setTown(town){
		this.townName = town;
	}
	
    upgrade(buildingtwo){
        //let buildingtwo = parseInt(building, 10);
        //window.print("s");
       // document.write(buildingtwo);

        if(buildingtwo == 1){
            if(this.bank < this.max_lvl){this.bank++; document.getElementById('bank').innerHTML = 'Golemata banka, ' + this.bank;this.check_if_W();;return this.bank;}
            else{return "You have reached the optimus maximus levelus bossus."};
            
        }
        else if(buildingtwo == 2){
            if(this.town_hall < this.max_lvl){this.town_hall++;document.getElementById('hall').innerHTML = 'Golemoto kmetstvo, ' + this.town_hall;this.check_if_W();;return this.town_hall;}
            else{return "You have reached the optimus maximus levelus bossus."};

        }
        else if(buildingtwo == 3){
            if(this.sport < this.max_lvl){this.sport++;document.getElementById('fitness').innerHTML = 'Golemiq fitnes batka, ' + this.sport;this.check_if_W();return this.sport;} 
            else{return "You have reached the optimus maximus levelus bossus."};

        }
        else if(buildingtwo == 4){
            if(this.radio_tv < this.max_lvl){this.radio_tv++;document.getElementById('radio').innerHTML = 'Golemoto radio, ' + this.radio_tv;this.check_if_W();;return this.radio_tv;} 
            else{return "You have reached the optimus maximus levelus bossus."};

        }
        return "sex";

    }

    check_if_W(){
        let curr_level = this.bank + this.town_hall + this.sport + this.radio_tv;
        if(curr_level < this.max_lvl * 4){
            return false;
        }
        return true;
    }

    render() {
        return( 
		    <div>
		        <h1 id="bank">Golemata banka, {this.bank}</h1>
		        <button onClick={() => this.upgrade(1)}>Upgradimus!</button>
		        <h1 id="hall">Golemoto kmetstvo, {this.town_hall}</h1>
		        <button onClick={() => this.upgrade(2)}>Upgradimus!</button>
		        <h1 id="fitness">Golemiq fitnes batka, {this.sport}</h1>
		        <button onClick={() => this.upgrade(3)}>Upgradimus!</button>
		        <h1 id="radio">Golemoto radio, {this.radio_tv}</h1>
		        <button onClick={() => this.upgrade(4)}>Upgradimus!</button>
		    </div>
        );
    }
}
export default Town;
