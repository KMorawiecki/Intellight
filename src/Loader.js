import React,  { Component }  from 'react';
import './Loader.css';
import RightMenu from './RightMenu.js';
import MainImage from "./MainImage.js";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Stroke from './Assets/stroke.svg';
import Switch from '@material-ui/core/Switch';

class Loader extends React.Component {

    constructor(props) {
        super(props);

        this.changeCurrentRoom = this.changeCurrentRoom.bind(this);
        this.changeCurrentFloor = this.changeCurrentFloor.bind(this);
    }

    state = {
        currentRoom: "floor_room11",
        currentFloor: 1,
        sliderVal: 100,

        floor_room11_bright : 100,
        floor_room12_bright : 100,
        floor_room13_bright : 100,
        floor_room14_bright : 100,
        floor_room21_bright : 100,
        floor_room22_bright : 100,
        floor_room23_bright : 100,
        floor_room24_bright : 100,
        floor_room31_bright : 100,
        floor_room32_bright : 100,
        floor_room33_bright : 100,
        floor_room34_bright : 100,
        floor_room35_bright : 100,

        floor_room11check : true,
        floor_room12_check : true,
        floor_room13_check : true,
        floor_room14_check : true,
        floor_room21_check : true,
        floor_room22_check : true,
        floor_room23_check : true,
        floor_room24_check : true,
        floor_room31_check : true,
        floor_room32_check : true,
        floor_room33_check : true,
        floor_room34_check : true,
        floor_room35_check : true,
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

    handleChange = (event, newValue) => {
        let image = document.getElementById(this.state.currentRoom);

        image.style.filter = "brightness(" + newValue.toString() + "%)";

        this.setState({
            sliderVal : newValue,
            [eval("this.state." + this.state.currentRoom + "_bright")] : newValue
        })
    };

    updateSlider = () => {
        let image = document.getElementById(this.state.currentRoom);
        let value = image.style.filter.match(/(\d+)/);
        if(value == null)
            value = [100];

        this.setState({
            sliderVal : value[0],
        })
    };

    handleSwitch = (event, newValue) => {
        let image = document.getElementById(this.state.currentRoom);

        let value = event.target.checked*eval("this.state." + this.state.currentRoom + "_bright");
        image.style.filter = "brightness(" + value + "%)";

        this.setState({
            [eval("this.state." + this.state.currentRoom + "_check")] : newValue
        })
    };

    render() {

        document.body.style = 'background-color: #282c34;';


        const currentBrightnessPlan = this.props.brightnessPlan;


        return (
            <div className="App">
                <Typography className="Caption"
                            variant="h3"
                            color="primary"
                            id="discrete-slider"
                            gutterBottom>
                    Light intensity
                </Typography>
                <Switch
                    className={"Switch"}
                    checked={this.state.floor_room11check}
                    onChange={this.handleSwitch}
                    value="checkedB"
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Slider className="Slider"
                        id = "Slider"
                        value={this.state.sliderVal}
                        step={10}
                        marks
                        min={10}
                        max={100}
                        defaultValue = {100}
                        aria-labelledby="discrete-slider"
                        onChange = {this.handleChange}
                />
                <div className="Background">
                    <img src={Stroke}
                         alt="stroke"/>
                </div>
                <div className="FloorContainer">
                    <MainImage className="ActiveFloor"
                               id="ActiveFloor"
                               currentRoom={this.state.currentRoom}
                               currentFloor={this.state.currentFloor}
                               onChange={this.changeCurrentRoom}
                               updateSlider={this.updateSlider}
                               ref={MainImage => {
                                   this.mainImage = MainImage;
                               }}
                />
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

export default Loader;
