import React, { Component } from 'react';
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import './App.css';
import {Menu, Icon} from 'antd';

import ParticlesComponent from './components/ParticlesComponent';


const changeTemp = temp => Math.floor((temp * 9/5) + 32)  //method to change temp from celcius to farenhiet
const API_KEY = '0c92cff22a927cb96ac0f3927378c670';
//const url = `http://api.openweathermap.org/data/2.5/weather?q=manchester,uk&appid=${API_KEY}&units=metric`
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined

    };
}


    getWeather = async (e) => {  //method that queries openweathermaps api and gets current weather
        e.preventDefault();

        const city = e.target.elements.city.value;  // gets the city element from Form.js
        const country = e.target.elements.country.value;   // gets the country element from Form.js

        try {
            const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
            if(api_call.ok === true) {
                const data = await api_call.json();
                if (city && country) {
                console.log(data);
                this.setState({  // grabs datapoints from the api and assigns them to the key value pairs
                     temperature: changeTemp(data.main.temp),
                     city: data.name,
                     country: data.sys.country,
                     humidity: data.main.humidity,
                     description: data.weather[0].description,
                     error: ''
                        });
                console.log(this.state.temperature);
                
                } 
        } else{this.setState({ // in case api_call returns 404 error this will promt the user
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error:'there was a error'});
                console.log(this.state.error)}
      } catch(error){
        console.log(error);
        };
        
      }

      
    
    render() {
        return ( 
            <div className = "App"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"}} 
                >
                <ParticlesComponent />
                <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
        >
                <Menu theme='dark'>
                    <Menu.Item >Menu <Icon type="ellipsis" /></Menu.Item>
                    <Menu.Item>SubMenuItem</Menu.Item>
                    
                </Menu>
                <Titles className />
                <div className="container">
                <Form getWeather={this.getWeather}/>
                </div>
                <div className='container mt-4'>
                <Weather className='jumbotron'
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                    /> 
                    
                </div> 
                </div>  
            </div>
        );
    }
}

export default App;