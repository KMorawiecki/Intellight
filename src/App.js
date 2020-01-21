import React,  { Component }  from 'react';
import ReactDOM from 'react-dom';
import Loader from './Loader.js'
import LoginScene from "./LoginScene";

class App extends React.Component {
    constructor(props){
        super(props);

        this.brightnessPlan = {};
        //this.fetchBrightnessPlan();
        this.ws = new WebSocket('ws://localhost:8080/ws', 'websocket')
    }

    state = {
        login: 0,
        pass: 0,
        perm: null,
        token: null
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
        this.ws.send(JSON.stringify(request))
    }

    updateBrightness = newPlan =>{
        const user = this.state.login;
        const token = this.state.token;
        const update = newPlan;

        const request = {
            type: "UPDATE",
            user,
            token,
            update
        }
        this.ws.send(JSON.stringify(request))
    }

    enterGuest =() => {
        this.loginRequest("guest", "234")
    };

    loginRequest = (user, pass) => {
        this.ws.send(
            JSON.stringify({
                type: "LOGIN",
                user,
                pass
            })
        );

        this.setState({
            login: user,
            pass: pass})
    };

    renderLoader = () => {
        ReactDOM.render(<Loader updateState={this.updateBrightness}
                                brightnessPlan={this.fetchBrightnessPlan}
                                perm = {this.state.perm}
                                ref={Loader => {this.Loader = Loader;}}/>, document.getElementById('root'))
    };


    render() {
        return (
            <LoginScene id = "login"
                        enterGuest = {this.enterGuest}
                        sendRequest = {this.loginRequest}
                        websocket = {this.ws}/>
        )
    }

    componentDidMount() {

        this.ws.onclose = () => {
            alert("yo, zamknieto")
        };

        this.ws.onmessage = (event) =>{
            const decoded = JSON.parse(event.data);

            if (decoded.type === "LOGIN") {
                this.setState({
                    perm: decoded.permission,
                    token: decoded.token
                })

                if (decoded.permission !== null)
                    this.renderLoader()
            }
            else if(decoded.type === "NOTIFY")
            {
                alert("le notification")
                this.Loader.updateParameters(decoded.brightnessPlan)
            }
        };
    }
}

export default App;
