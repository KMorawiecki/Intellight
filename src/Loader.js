import React,  { Component }  from 'react';
import './Loader.css';
import RightMenu from './RightMenu.js';
import MainImage from "./MainImage.js";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Stroke from './Assets/stroke.svg';
import Switch from '@material-ui/core/Switch';
import back1 from './Assets/1back.jpg'
import back2 from './Assets/2back.jpg'
import back3 from './Assets/3back.jpg'
import cool_font from './Assets/Lobster_1.3.otf'

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
        sliderDis: true,

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

        floor_room11_check : true,
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

        switch_position :true
    };

    parseState() {
        const update = {};
        let roomNum;
        let floorNum;

        for(floorNum = 1; floorNum < 4; floorNum++)
            for(roomNum = 1; roomNum < 5 + Math.max(0, floorNum - 2); roomNum++)
            {
                let member = "item" + (4*(floorNum - 1) + roomNum - 1)
                let pow = eval("this.state.floor_room" + floorNum.toString() + roomNum.toString() + "_check")
                let bright = eval("this.state.floor_room" + floorNum.toString() + roomNum.toString() + "_bright")

                update[member] = {
                    floor: floorNum.toString(),
                    room: roomNum.toString(),
                    settings: {
                        power: pow,
                        brightness: bright
                    }}
            }

        return update
    }

    updateParameters(newPlan) {
        let roomNum;
        let floorNum;

        for(floorNum = 1; floorNum < 4; floorNum++)
            for(roomNum = 1; roomNum < 5 + Math.max(0, floorNum - 2); roomNum++)
            {
                const item = "item" + ((floorNum - 1)*4 + (roomNum - 1));
                let image = document.getElementById("floor_room" + floorNum + roomNum);

                if(newPlan[item]["settings"]["power"] === true)
                    image.style.filter = "brightness(" + newPlan[item]["settings"]["brightness"].toString() + "%)";
                else
                    image.style.filter = "brightness(0%)";

                this.setState({
                    ["floor_room" + floorNum + roomNum + "_bright"] : newPlan[item]["settings"]["brightness"],
                    ["floor_room" + floorNum + roomNum + "_check"] : newPlan[item]["settings"]["power"]
                });
            }

        this.setState({
            switch_position: eval("this.state." + this.state.currentRoom + "_check")
        });
    }

    changeCurrentRoom(newRoom) {
        this.setState({
            currentRoom: newRoom,
            switch_position: eval("this.state." + newRoom + "_check")
        });
    };

    changeCurrentFloor = () => {

        try {
            let menu = document.getElementsByClassName("menu")[0]
            if (menu.id != this.state.currentFloor)
                this.setState({
                    currentFloor: parseInt(menu.id)
                });
        }
        catch (TypeError) {
            return
        }
    };

    componentDidUpdate() {
        this.mainImage.changeToCurrent()

    }

    handleChange = (event, newValue) => {
        let image = document.getElementById(this.state.currentRoom);

        if(eval("this.state." + this.state.currentRoom + "_check") === true)
            image.style.filter = "brightness(" + newValue.toString() + "%)";

        this.setState({
            sliderVal : newValue,
            [this.state.currentRoom + "_bright"] : newValue
        },  () => {
            this.props.updateState(this.parseState());
        });
    };

    updateSlider = () => {
        let image = document.getElementById(this.state.currentRoom);
        let value = eval("this.state." + this.state.currentRoom + "_bright");//image.style.filter.match(/(\d+)/);
        if(value == null)
            value = 100;

        this.setState({
            sliderVal : value,
        })
    };

    handleSwitch = (event, newValue) => {
        let image = document.getElementById(this.state.currentRoom);

        let value = event.target.checked*eval("this.state." + this.state.currentRoom + "_bright");
        image.style.filter = "brightness(" + value + "%)";

        this.setState({
            [this.state.currentRoom + "_check"] : newValue,
            switch_position : newValue,
        },  () => {
            this.props.updateState(this.parseState());
        });
    };

    render() {

        //document.body.style = 'background-color: #282c34;';

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
                    className="Switch"
                    id="light_switch"
                    checked={this.state.switch_position}
                    onChange={this.handleSwitch}
                    value="checkedB"
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Slider disabled={this.state.sliderDis}
                        className="Slider"
                        id = "Slider"
                        value={this.state.sliderVal}
                        step={10}
                        marks
                        min={10}
                        max={100}
                        aria-labelledby="discrete-slider"
                        onChange = {this.handleChange}
                />
                <div className="Background">
                    <img src={Stroke}
                         className = "Stroke"
                         alt="stroke"
                         dropzone="move"
                    />
                </div>
                <div className="FloorContainer">
                    <MainImage className="ActiveFloor"
                               id="ActiveFloor"
                               currentRoom={this.state.currentRoom}
                               currentFloor={this.state.currentFloor}
                               onChange={this.changeCurrentRoom}
                               updateSlider={this.updateSlider}
                               ref={MainImage => {
                                   this.mainImage = MainImage;}}/>
                </div>
                <div className="RightMenuContainer">
                        <RightMenu className="RightMenu"
                                   id = "RightMenu"
                                   currentFloor={this.state.currentFloor}
                                   onChange={this.changeCurrentFloor}
                                   changeCurrentFloor={this.changeCurrentFloor}/>
                </div>
            </div>
        );
    }

    componentDidMount() {

        switch(this.props.perm)
        {
            case "admin":
                this.setState({
                    sliderDis: false
                });
                break;
            case "guest":
                this.setState({
                    sliderDis: true
                });
                break;
            default:
                alert("Unexpected permission level");
                break;
        }
    }
}

export default Loader;
