import React from 'react';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginScene.css'


class LoginScene extends React.Component{

    constructor(props) {
        super(props);
    }

    state = {
        login: null,
        pass: null
    };

    loginUpdate = (event, newValue) => {
        this.setState({
            login : event.target.value
        })
    };

    passUpdate = (event, newValue) => {
        this.setState({
            pass : event.target.value
        })
    };

    render() {

        document.body.style = 'background-color: #282c34;';

        return (
            <div className="loginContainer" id ="loginContainer">
                <text className="loginText">Login: </text>
                <input type="text" className="loginInput" value={this.state.login} onChange={this.loginUpdate} />
                <text className="passText">Password: </text>
                <input type="text" className="passInput" value={this.state.pass} onChange={this.passUpdate} />
                <Button variant="outline-dark" className ="loginButton" onClick={() => this.props.sendRequest(this.state.login, this.state.pass)}>Login</Button>
                <Button variant="outline-dark" className ="guestButton" onClick={() => this.props.enterGuest()}>Guest</Button>
            </div>
        )
    }
}

export default LoginScene;
