import {Component} from 'react'
class Welcome extends Component {
    constructor(props){
        super(props);
        this.bank = 1;
        this.town_hall = 1;
        this.sport = 1;
        this.radio_tv = 1;
        this.max_lvl = 5;
        this.promenliva = this.upgrade.bind(this);
    }

    upgrade(buildingtwo){
        //let buildingtwo = parseInt(building, 10);
        //window.print("s");
       // document.write(buildingtwo);

        if(buildingtwo == 1){
            if(this.bank < this.max_lvl){this.bank++; console.log(this.bank); return this.bank;}
            else{return "You have reached the optimus maximus levelus bossus."};
            
        }
        else if(buildingtwo == 2){
            if(this.town_hall < this.max_lvl){this.town_hall++; console.log(this.town_hall); return this.town_hall;}
            else{return "You have reached the optimus maximus levelus bossus."};

        }
        else if(buildingtwo == 3){
            if(this.sport < this.max_lvl){this.sport++; console.log(this.sport); return this.sport;} 
            else{return "You have reached the optimus maximus levelus bossus."};

        }
        else if(buildingtwo == 4){
            if(this.radio_tv < this.max_lvl){this.radio_tv++; console.log(this.radio_tv); return this.radio_tv;} 
            else{return "You have reached the optimus maximus levelus bossus."};

        } 
        else return "sex";

    }

    check_if_W(){
        let curr_level = this.bank + this.thown_hall + this.sport + this.radio_tv;
        if(curr_level < 20){
            return "You are still not the maximus, optimus";
        }
        else{return "Unlimited powaaa";}
    }

    render() {
        return <div>Hello, {this.props.name}
            <h1>Golemata banka, {this.props.bank}</h1>
            <button onClick={() => this.upgrade(1)}>Upgradimus!</button>
            <h1>Golemoto kmetstvo, {this.props.town_hall}</h1>
            <button onClick={() => this.upgrade(2)}>Upgradimus!</button>
            <h1>Golemiq fitnes batka, {this.props.sport}</h1>
            <button onClick={() => this.upgrade(3)}>Upgradimus!</button>
            <h1>Golemoto radio, {this.props.radio_tv}</h1>
            <button onClick={() => this.upgrade(4)}>Upgradimus!</button>
        </div>;
    }
  }
  export default Welcome;