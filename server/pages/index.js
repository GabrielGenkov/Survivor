import Link from 'next/link'
import Head from 'next/head'
import React from 'react'
import { Component } from 'react'
import Router from 'next/router'
import PropTypes from "prop-types";

class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {name: '', city: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
	Router.push({pathname: './game', query: {name: this.state.name, city:this.state.city}})
    event.preventDefault();
  }

  render() {
    const center = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      //background: "linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)"
    }
    return (
      <div>
        <style jsx global>{`
          body{
            background-image: linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%);
            background-repeat: no-repeat;
            background-size: cover;
            height: 100vh;
          }
          `}</style>
		  <form style = {center} onSubmit={this.handleSubmit}>
        <h2>Survivor</h2>
		    <label htmlFor="name">Name:</label><br />
	  		<input type="text" id="name" name="name" onChange={this.handleInputChange} /><br />
	  		<label htmlFor="city">City:</label><br />
	  		<input type="text" id="city" name="city" onChange={this.handleInputChange} /><br /><br />
	  		<input type="submit" value="Start New Game" />
		  </form>
      </div>
    );
  }
}

export default NameForm;
