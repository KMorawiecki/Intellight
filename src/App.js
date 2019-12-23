import React,  { Component }  from 'react';
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
        currentFloor: 1,
        sliderVal: 100
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

    componentDidUpdate() {
        this.mainImage.changeToCurrent()
    }

    // updateSlider(){
    //     let image = document.getElementById(this.state.currentRoom);
    //     let value = parseInt(image.style.opacity);
    //
    //     this.setState({
    //         sliderVal : value
    //     })
    // }

    render() {

        document.body.style = 'background-color: #282c34;';

        const handleChange = (event, newValue) => {
            let image = document.getElementById(this.state.currentRoom);

            image.style.filter = "brightness(" + newValue.toString() + "%)";

            this.setState({
                sliderVal : newValue
            })
        };

        const updateSlider = () => {
            let image = document.getElementById(this.state.currentRoom);
            let value = image.style.filter.match(/(\d+)/);
            if(value == null)
                value = [100];

            this.setState({
                sliderVal : value[0]
            })

        };

        return (
            <div className="App">
                <div className="Light-slider">
                    <Typography id="discrete-slider" gutterBottom>
                        Light intensity
                    </Typography>
                    <Slider className="Slider"
                            id = "Slider"
                            value={this.state.sliderVal}
                            step={10}
                            marks
                            min={10}
                            max={100}
                            defaultValue = {100}
                            aria-labelledby="discrete-slider"
                            onChange = {handleChange}
                    />
                </div>
                <div className="FloorContainer">
                    <MainImage className="ActiveFloor"
                               id="ActiveFloor"
                               currentRoom={this.state.currentRoom}
                               currentFloor={this.state.currentFloor}
                               onChange={this.changeCurrentRoom}
                               updateSlider={updateSlider}
                               ref={MainImage => {
                                   this.mainImage = MainImage;
                               }}/>
                </div>
                <div className="RightMenuContainer">
                    <RightMenu className="RightMenu"
                               id = "RightMenu"
                               currentFloor={this.state.currentFloor}
                               onChange={this.changeCurrentFloor}/>
                </div>
            </div>
        );
    }
}

export default App;
