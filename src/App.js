import React from 'react';
import './App.css';
import RightMenu from './RightMenu.js';
import MainImage from "./MainImage.js";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.changeCurrentRoom = this.changeCurrentRoom.bind(this);
        this.changeCurrentFloor = this.changeCurrentFloor.bind(this);
    }

    state = {
        currentRoom: "floor_room1",
        currentFloor: "1",
    };

    changeCurrentRoom(newRoom) {
        this.setState({
            currentRoom: newRoom
        });
    };

    changeCurrentFloor(newFloor) {
        this.setState({
            currentFloor: newFloor
        });
    };

    render() {

        document.body.style = 'background-color: #282c34;';

        const handleChange = (event, newValue) => {
            var image = document.getElementById(this.state.currentRoom);

            var value = newValue/100;
            image.style.opacity = value.toString();
        };


        return (
            <div className="App">
                <div className="Light-slider">
                    <Typography id="discrete-slider" gutterBottom>
                        Light intensity
                    </Typography>
                    <Slider className="Slider"
                            id = "Slider"
                            step={10}
                            marks
                            min={10}
                            max={100}
                            defaultValue = {100}
                            aria-labelledby="discrete-slider"
                            onChange = {handleChange}
                    />
                </div>
                <div>
                    <MainImage className="ActiveFloor"
                               id = "ActiveFloor"
                               currentRoom={this.state.currentRoom}
                               onChange={this.changeCurrentRoom}/>
                </div>
                <div>
                    <RightMenu className="RightMenu"
                               id = "RightMenu"
                               currentFloor={this.state.currentFloor}
                               onChange={this.changeCurrentFloor}/>/>
                </div>
            </div>
        );
    }
}

export default App;
