import React,  { Component }  from 'react';
import Loader from './Loader.js'
import LoginScene from "./LoginScene";
import WebSocket from "ws";

class App extends React.Component {
    constructor(props){
        super(props);

        this.brightnessPlan = {};
        this.fetchBrightnessPlan();
        this.name = process.argv.slice(2)[0];
        this.ws = new WebSocket("ws://localhost:8080");
    }


    handleMessage(m){
        if(m.type === "UPDATE"){
            this.brightnessPlan = m.payload;
        }
    }

    fetchBrightnessPlan() {
        const request = {
            type: "GET",
            token: "...."
        }
        // ws.send(JSON.stringify(request))
    }

    updateBrightness(newPlan){
        const request = {
            type: "UPDATE",
            payload: newPlan
        }
        // ws.send(JSON.stringify(request))
    }

    enterGuest =() => {

    };

    sendRequest = (login, pass) => {
        this.ws.send(
            JSON.stringify({
                type: "LOGIN",
                user: login,
                pass: pass
            })
        );
        alert(this.state.login)
    };

    render() {

        return (
            //<Loader updateState={this.updateBrightness} brightnessPlan={this.brightnessPlan}/>
            <LoginScene enterGuest = {this.enterGuest} sendRequest = {this.sendRequest}/>
        )
    }

    componentDidMount() {
        this.ws.onopen = function(){
            alert("yo, polaczono")
        };

        this.ws.onclose = function() {
            alert("yo, zamknieto")
        };

        this.ws.on("message", function incoming(data) {
            alert(data);
        });
    }
}

export default App;
