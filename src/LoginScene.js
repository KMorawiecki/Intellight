import React from 'react';
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
        return (
            <div className="loginContainer">
                <text className="loginText">Login: </text>
                <input type="text" className="loginInput" value={this.state.login} onChange={this.loginUpdate} />
                <text className="passText">Password: </text>
                <input type="text" className="passInput" value={this.state.pass} onChange={this.passUpdate} />
                <button className ="loginButton" onClick={() => this.props.sendRequest(this.state.login)}>Login</button>
                <button className ="guestButton" noClick={() => this.props.enterGuest(this.state.pass)}>Guest</button>
            </div>
        )
    }
}

export default LoginScene;
